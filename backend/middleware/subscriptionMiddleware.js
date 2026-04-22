const User = require("../models/User");

const normalizeSubscription = (subscription) => {
  const status = subscription?.status || "free";
  return {
    status,
    hasAccess: status === "active",
    paidAt: subscription?.paidAt || null,
    reference: subscription?.reference || null,
  };
};

exports.requireActiveSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("subscription");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const normalized = normalizeSubscription(user.subscription);

    if (!normalized.hasAccess) {
      return res.status(403).json({
        message: "Premium subscription required",
        code: "SUBSCRIPTION_REQUIRED",
        subscription: normalized,
      });
    }

    req.subscription = normalized;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Failed to verify subscription",
      error: error.message,
    });
  }
};

exports.checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("subscription");
    req.subscription = normalizeSubscription(user?.subscription);
    next();
  } catch (error) {
    req.subscription = normalizeSubscription(null);
    next();
  }
};