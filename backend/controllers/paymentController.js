const User = require("../models/User");
const Payment = require("../models/Payment");
const axios = require("axios");

const PAYSTACK_BASE_URL = "https://api.paystack.co";
const DEFAULT_AMOUNT_NAIRA = 3000;

const getAmountNaira = () => {
  const configured = Number(process.env.PAYMENT_AMOUNT_NAIRA || DEFAULT_AMOUNT_NAIRA);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_AMOUNT_NAIRA;
};

const getAmountKobo = () => getAmountNaira() * 100;

const createReference = (userId) => `devnest_test_${userId}_${Date.now()}`;

const callPaystack = async (path, options = {}) => {
  if (!process.env.PAYSTACK_SECRET_KEY) {
    throw new Error("PAYSTACK_SECRET_KEY is missing in backend environment variables");
  }

  try {
    const response = await axios({
      method: options.method || "GET",
      url: `${PAYSTACK_BASE_URL}${path}`,
      data: options.data,
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      timeout: 20000,
    });

    const payload = response.data;

    if (payload?.status !== true) {
      throw new Error(payload?.message || "Paystack request failed");
    }

    return payload;
  } catch (error) {
    const paystackMessage = error?.response?.data?.message;
    throw new Error(paystackMessage || error.message || "Paystack request failed");
  }
};

exports.initializePayment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email subscription");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.subscription?.status === "active") {
      return res.status(400).json({
        message: "You already have an active subscription",
        subscription: user.subscription,
      });
    }

    const reference = createReference(user._id);
    const amountKobo = getAmountKobo();

    const callbackUrl = process.env.PAYMENT_CALLBACK_URL || process.env.FRONTEND_URL;
    const callbackWithReference = callbackUrl
      ? `${callbackUrl.replace(/\/$/, "")}/settings?paymentReference=${reference}`
      : undefined;

    const paystackPayload = {
      email: user.email,
      amount: amountKobo,
      reference,
      metadata: {
        userId: String(user._id),
        userName: user.name,
      },
    };

    if (callbackWithReference) {
      paystackPayload.callback_url = callbackWithReference;
    }

    const initialized = await callPaystack("/transaction/initialize", {
      method: "POST",
      data: paystackPayload,
    });

    await Payment.findOneAndUpdate(
      { reference },
      {
        user: user._id,
        amount: getAmountNaira(),
        reference,
        status: "pending",
        provider: "paystack",
      },
      { upsert: true, new: true }
    );

    user.subscription = {
      ...(user.subscription || {}),
      status: "pending",
      reference,
    };
    await user.save();

    res.status(200).json({
      message: "Payment initialized",
      data: {
        reference,
        amount: getAmountNaira(),
        authorizationUrl: initialized.data.authorization_url,
        accessCode: initialized.data.access_code,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to initialize payment",
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({ message: "Payment reference is required" });
    }

    const paymentRecord = await Payment.findOne({ reference });

    if (!paymentRecord) {
      return res.status(404).json({ message: "Payment reference not found" });
    }

    const user = await User.findById(paymentRecord.user).select("subscription email name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verification = await callPaystack(`/transaction/verify/${encodeURIComponent(reference)}`);
    const tx = verification.data;

    if (!tx || tx.status !== "success") {
      if (paymentRecord) {
        paymentRecord.status = "rejected";
        paymentRecord.gatewayStatus = tx?.status || "failed";
        paymentRecord.gatewayResponse = tx?.gateway_response || verification.message;
        paymentRecord.rawVerification = tx || verification;
        await paymentRecord.save();
      }

      user.subscription = {
        ...(user.subscription || {}),
        status: "free",
      };
      await user.save();

      return res.status(400).json({
        message: "Payment not successful",
        gatewayStatus: tx?.status || "failed",
      });
    }

    if (tx.customer?.email && tx.customer.email.toLowerCase() !== user.email.toLowerCase()) {
      return res.status(403).json({
        message: "Payment reference does not belong to this user",
      });
    }

    const approvedPayment = await Payment.findOneAndUpdate(
      { reference },
      {
        user: user._id,
        amount: Number(tx.amount || getAmountKobo()) / 100,
        reference,
        status: "approved",
        provider: "paystack",
        gatewayStatus: tx.status,
        gatewayResponse: tx.gateway_response || "Payment successful",
        paidAt: tx.paid_at ? new Date(tx.paid_at) : new Date(),
        rawVerification: tx,
      },
      { upsert: true, new: true }
    );

    user.subscription = {
      ...(user.subscription || {}),
      status: "active",
      paidAt: approvedPayment.paidAt,
      reference,
    };
    await user.save();

    res.status(200).json({
      message: "Payment verified successfully. Courses unlocked.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      payment: {
        reference: approvedPayment.reference,
        amount: approvedPayment.amount,
        status: approvedPayment.status,
        paidAt: approvedPayment.paidAt,
      },
      subscription: {
        status: user.subscription.status,
        hasAccess: true,
        paidAt: user.subscription.paidAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to verify payment",
      error: error.message,
    });
  }
};

exports.getMyPaymentStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("subscription");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payments = await Payment.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(10);
    const subscription = {
      status: user.subscription?.status || "free",
      hasAccess: user.subscription?.status === "active",
      paidAt: user.subscription?.paidAt || null,
      reference: user.subscription?.reference || null,
    };

    res.status(200).json({
      subscription,
      payments: payments.map((p) => ({
        id: p._id,
        reference: p.reference,
        amount: p.amount,
        status: p.status,
        provider: p.provider,
        paidAt: p.paidAt,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load payment status",
      error: error.message,
    });
  }
};