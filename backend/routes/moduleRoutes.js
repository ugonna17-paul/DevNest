const express = require('express');
const router = express.Router();
const {
    getModulesByCourse,
    getModuleById,
    createModule
} = require('../controllers/moduleController');
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');

// Protected routes - require authentication + active subscription
router.get('/:courseId', protect, requireActiveSubscription, getModulesByCourse);
router.get('/single/:moduleId', protect, requireActiveSubscription, getModuleById);

// Admin routes
router.post('/', protect, createModule);

module.exports = router;
