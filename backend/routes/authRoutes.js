const express = require("express");
const { register, login, updateProfile, changePassword, getAllUsers } = require("../controllers/authController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

// Admin routes
router.get("/users", protect, isAdmin, getAllUsers);

module.exports = router;
