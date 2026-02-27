const User = require("../models/User");
const Payment = require("../models/Payment");
const nodemailer = require('nodemailer');

/**
 * Submit payment proof
 * User uploads transaction reference and payment screenshot
 * @route POST /api/payment/submit-proof
 */
exports.submitPaymentProof = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reference } = req.body;

    // Validation
    if (!reference) {
      return res.status(400).json({ 
        message: "Transaction reference is required" 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        message: "Payment proof screenshot is required" 
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user already has active subscription
    if (user.subscription.status === "active") {
      return res.status(400).json({ 
        message: "You already have an active subscription" 
      });
    }

    // Check if there's already a pending payment for this user
    const existingPendingPayment = await Payment.findOne({
      user: userId,
      status: "pending"
    });

    if (existingPendingPayment) {
      return res.status(400).json({ 
        message: "You already have a pending payment awaiting approval",
        payment: {
          reference: existingPendingPayment.reference,
          submittedAt: existingPendingPayment.createdAt,
          status: existingPendingPayment.status
        }
      });
    }

    // Check if payment with this reference already exists
    const duplicatePayment = await Payment.findOne({ reference: reference.trim() });
    if (duplicatePayment) {
      return res.status(400).json({ 
        message: "This transaction reference has already been submitted" 
      });
    }

    // Create payment record
    // Convert Windows backslashes to forward slashes for URL compatibility
    const proofImagePath = req.file.path.replace(/\\/g, '/');
    
    const payment = new Payment({
      user: userId,
      amount: 3000,
      reference: reference.trim(),
      proofImage: proofImagePath,
      status: "pending"
    });

    await payment.save();

    // Update user subscription status to pending
    user.subscription.status = "pending";
    await user.save();

    // Send email notification to admin
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ugonnaaninwodo@gmail.com',
        subject: '🔔 New Payment Submission - DevNest',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #1F6FEB; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="color: white; margin: 0;">💰 New Payment Submission</h2>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
              <h3 style="color: #333; margin-top: 0;">Payment Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Student:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${user.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Amount:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333; font-weight: bold; font-size: 18px;">₦3,000</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Reference:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333; font-family: monospace;">${payment.reference}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Date:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eee; color: #333;">${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}</td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; text-align: center;">
                <p style="color: #666; margin-bottom: 20px;">A student has submitted payment proof and is waiting for approval.</p>
                <a href="http://localhost:5008" style="display: inline-block; background-color: #1F6FEB; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                  View in Admin Dashboard
                </a>
              </div>
              
              <div style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0; color: #856404;">
                  <strong>⚠️ Action Required:</strong> Please verify the payment in your Opay app and approve in the admin dashboard.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
              <p>This is an automated notification from DevNest Payment System</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Payment notification email sent to admin');
    } catch (emailError) {
      // Log email error but don't fail the payment submission
      console.error('❌ Failed to send email notification:', emailError.message);
    }

    res.status(201).json({
      message: "Payment proof submitted successfully. Awaiting admin approval.",
      payment: {
        id: payment._id,
        reference: payment.reference,
        amount: payment.amount,
        status: payment.status,
        submittedAt: payment.createdAt
      }
    });

  } catch (error) {
    console.error("Submit payment proof error:", error);
    res.status(500).json({ 
      message: "Failed to submit payment proof", 
      error: error.message 
    });
  }
};

/**
 * Get current user's payment status
 * @route GET /api/payment/my-status
 */
exports.getMyPaymentStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("subscription email name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's payment history
    const payments = await Payment.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      subscription: {
        status: user.subscription.status,
        paidAt: user.subscription.paidAt,
        hasAccess: user.subscription.status === "active"
      },
      payments: payments.map(p => ({
        id: p._id,
        reference: p.reference,
        amount: p.amount,
        status: p.status,
        submittedAt: p.createdAt,
        adminNote: p.adminNote
      }))
    });

  } catch (error) {
    console.error("Get payment status error:", error);
    res.status(500).json({ 
      message: "Failed to get payment status", 
      error: error.message 
    });
  }
};

/**
 * Get all pending payments (Admin only)
 * @route GET /api/payment/pending
 */
exports.getPendingPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ status: "pending" })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: payments.length,
      payments: payments.map(payment => ({
        id: payment._id,
        user: {
          id: payment.user._id,
          name: payment.user.name,
          email: payment.user.email
        },
        amount: payment.amount,
        reference: payment.reference,
        proofImage: payment.proofImage,
        status: payment.status,
        submittedAt: payment.createdAt
      }))
    });

  } catch (error) {
    console.error("Get pending payments error:", error);
    res.status(500).json({ 
      message: "Failed to get pending payments", 
      error: error.message 
    });
  }
};

/**
 * Get all payments with filters (Admin only)
 * @route GET /api/payment/all
 */
exports.getAllPayments = async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    // Build query
    const query = {};
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const payments = await Payment.find(query)
      .populate("user", "name email")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Payment.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
      payments: payments.map(payment => ({
        id: payment._id,
        user: {
          id: payment.user._id,
          name: payment.user.name,
          email: payment.user.email
        },
        amount: payment.amount,
        reference: payment.reference,
        proofImage: payment.proofImage,
        status: payment.status,
        submittedAt: payment.createdAt,
        approvedBy: payment.approvedBy ? {
          id: payment.approvedBy._id,
          name: payment.approvedBy.name,
          email: payment.approvedBy.email
        } : null,
        approvedAt: payment.approvedAt,
        adminNote: payment.adminNote
      }))
    });

  } catch (error) {
    console.error("Get all payments error:", error);
    res.status(500).json({ 
      message: "Failed to get payments", 
      error: error.message 
    });
  }
};

/**
 * Approve payment (Admin only)
 * @route PUT /api/payment/approve/:paymentId
 */
exports.approvePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { note } = req.body;
    const adminId = req.user.id;

    // Find payment
    const payment = await Payment.findById(paymentId).populate("user");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check if already processed
    if (payment.status !== "pending") {
      return res.status(400).json({ 
        message: `Payment has already been ${payment.status}` 
      });
    }

    // Update payment
    payment.status = "approved";
    payment.approvedBy = adminId;
    payment.approvedAt = new Date();
    if (note) {
      payment.adminNote = note;
    }
    await payment.save();

    // Update user subscription
    const user = await User.findById(payment.user._id);
    user.subscription.status = "active";
    user.subscription.paidAt = new Date();
    await user.save();

    console.log(`✅ Payment approved for user: ${user.email} by admin: ${adminId}`);

    res.status(200).json({
      message: "Payment approved successfully",
      payment: {
        id: payment._id,
        reference: payment.reference,
        status: payment.status,
        approvedAt: payment.approvedAt
      },
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription
      }
    });

  } catch (error) {
    console.error("Approve payment error:", error);
    res.status(500).json({ 
      message: "Failed to approve payment", 
      error: error.message 
    });
  }
};

/**
 * Reject payment (Admin only)
 * @route PUT /api/payment/reject/:paymentId
 */
exports.rejectPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { note } = req.body;
    const adminId = req.user.id;

    // Validate rejection note
    if (!note || note.trim().length < 10) {
      return res.status(400).json({ 
        message: "Rejection note is required (minimum 10 characters)" 
      });
    }

    // Find payment
    const payment = await Payment.findById(paymentId).populate("user");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check if already processed
    if (payment.status !== "pending") {
      return res.status(400).json({ 
        message: `Payment has already been ${payment.status}` 
      });
    }

    // Update payment
    payment.status = "rejected";
    payment.approvedBy = adminId;
    payment.approvedAt = new Date();
    payment.adminNote = note.trim();
    await payment.save();

    // Reset user subscription to free
    const user = await User.findById(payment.user._id);
    user.subscription.status = "free";
    user.subscription.paidAt = null;
    await user.save();

    console.log(`❌ Payment rejected for user: ${user.email} by admin: ${adminId}`);

    res.status(200).json({
      message: "Payment rejected",
      payment: {
        id: payment._id,
        reference: payment.reference,
        status: payment.status,
        adminNote: payment.adminNote
      }
    });

  } catch (error) {
    console.error("Reject payment error:", error);
    res.status(500).json({ 
      message: "Failed to reject payment", 
      error: error.message 
    });
  }
};

/**
 * Get payment statistics (Admin only)
 * @route GET /api/payment/stats
 */
exports.getPaymentStats = async (req, res) => {
  try {
    const [pending, approved, rejected, totalRevenue] = await Promise.all([
      Payment.countDocuments({ status: "pending" }),
      Payment.countDocuments({ status: "approved" }),
      Payment.countDocuments({ status: "rejected" }),
      Payment.aggregate([
        { $match: { status: "approved" } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ])
    ]);

    const activeSubscriptions = await User.countDocuments({
      "subscription.status": "active"
    });

    res.status(200).json({
      stats: {
        payments: {
          pending,
          approved,
          rejected,
          total: pending + approved + rejected
        },
        revenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
        activeSubscriptions
      }
    });

  } catch (error) {
    console.error("Get payment stats error:", error);
    res.status(500).json({ 
      message: "Failed to get payment statistics", 
      error: error.message 
    });
  }
};
