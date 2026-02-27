const User = require("../models/User");

/**
 * Middleware to check if user has an active subscription
 * Blocks access to premium content if subscription is not active
 */
exports.requireActiveSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get user subscription status
    const user = await User.findById(userId).select("subscription email");

    if (!user) {
      return res.status(404).json({ 
        message: "User not found" 
      });
    }

    // Check if subscription is active
    if (user.subscription.status !== "active") {
      return res.status(403).json({
        message: "Premium subscription required",
        code: "SUBSCRIPTION_REQUIRED",
        subscription: {
          status: user.subscription.status,
          hasAccess: false
        }
      });
    }

    // User has active subscription, proceed
    next();

  } catch (error) {
    console.error("Subscription check error:", error);
    res.status(500).json({ 
      message: "Failed to verify subscription", 
      error: error.message 
    });
  }
};

/**
 * Middleware to check subscription and attach status to request
 * Does not block, just adds subscription info to req object
 */
exports.checkSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("subscription");

    if (user) {
      req.subscription = {
        status: user.subscription.status,
        hasAccess: user.subscription.status === "active",
        paidAt: user.subscription.paidAt
      };
    } else {
      req.subscription = {
        status: "free",
        hasAccess: false,
        paidAt: null
      };
    }

    next();

  } catch (error) {
    console.error("Check subscription error:", error);
    // Don't block request, just continue without subscription info
    req.subscription = {
      status: "free",
      hasAccess: false,
      paidAt: null
    };
    next();
  }
};
