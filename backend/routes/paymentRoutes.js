const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  submitPaymentProof,
  getMyPaymentStatus,
  getPendingPayments,
  getAllPayments,
  approvePayment,
  rejectPayment,
  getPaymentStats
} = require("../controllers/paymentController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads/payment-proofs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `payment-${req.user.id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, png, gif, webp)"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  },
  fileFilter: fileFilter
});

/**
 * USER ROUTES
 */

/**
 * @route   POST /api/payment/submit-proof
 * @desc    Submit payment proof (screenshot + reference)
 * @access  Private (authenticated users)
 */
router.post("/submit-proof", protect, upload.single("proofImage"), submitPaymentProof);

/**
 * @route   GET /api/payment/my-status
 * @desc    Get current user's payment and subscription status
 * @access  Private
 */
router.get("/my-status", protect, getMyPaymentStatus);

/**
 * ADMIN ROUTES
 */

/**
 * @route   GET /api/payment/pending
 * @desc    Get all pending payments awaiting approval
 * @access  Admin only
 */
router.get("/pending", protect, isAdmin, getPendingPayments);

/**
 * @route   GET /api/payment/all
 * @desc    Get all payments with filters (status, pagination)
 * @access  Admin only
 */
router.get("/all", protect, isAdmin, getAllPayments);

/**
 * @route   GET /api/payment/stats
 * @desc    Get payment statistics
 * @access  Admin only
 */
router.get("/stats", protect, isAdmin, getPaymentStats);

/**
 * @route   PUT /api/payment/approve/:paymentId
 * @desc    Approve a payment and activate user subscription
 * @access  Admin only
 */
router.put("/approve/:paymentId", protect, isAdmin, approvePayment);

/**
 * @route   PUT /api/payment/reject/:paymentId
 * @desc    Reject a payment with a note
 * @access  Admin only
 */
router.put("/reject/:paymentId", protect, isAdmin, rejectPayment);

/**
 * @route   GET /api/payment/proof/:filename
 * @desc    Serve payment proof images (admin only)
 * @access  Admin only
 */
router.get("/proof/:filename", protect, isAdmin, (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(uploadDir, filename);

  if (fs.existsSync(filepath)) {
    res.sendFile(filepath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File too large. Maximum size is 5MB"
      });
    }
    return res.status(400).json({
      message: error.message
    });
  } else if (error) {
    return res.status(400).json({
      message: error.message
    });
  }
  next();
});

module.exports = router;
