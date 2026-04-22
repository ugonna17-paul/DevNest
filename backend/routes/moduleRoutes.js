const express = require('express');
const router = express.Router();
const {
    getModulesByCourse,
    getModuleById,
    createModule
} = require('../controllers/moduleController');
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');

// Protected learning routes
router.get('/single/:moduleId', protect, requireActiveSubscription, getModuleById);
router.get('/:courseId', protect, requireActiveSubscription, getModulesByCourse);

// Admin routes
router.post('/', protect, createModule);

module.exports = router;
