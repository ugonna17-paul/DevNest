const express = require('express');
const router = express.Router();
const {
    markLessonComplete,
    getUserProgress,
    getCourseProgressPercentage,
    updateLessonAccess
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');

// All progress routes are protected
router.post('/', protect, requireActiveSubscription, markLessonComplete);
router.get('/', protect, requireActiveSubscription, getUserProgress);
router.get('/course/:courseId', protect, requireActiveSubscription, getCourseProgressPercentage);
router.put('/access', protect, requireActiveSubscription, updateLessonAccess);

module.exports = router;
