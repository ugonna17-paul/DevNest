const express = require("express");
const router = express.Router();

const {
  initializePayment,
  verifyPayment,
  getMyPaymentStatus,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/initialize", protect, initializePayment);
router.get("/verify/:reference", verifyPayment);
router.get("/my-status", protect, getMyPaymentStatus);

module.exports = router;