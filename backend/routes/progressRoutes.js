const express = require('express');
const router = express.Router();
const {
    markLessonComplete,
    getUserProgress,
    getCourseProgressPercentage,
    updateLessonAccess
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

// All progress routes are protected
router.post('/', protect, markLessonComplete);
router.get('/', protect, getUserProgress);
router.get('/course/:courseId', protect, getCourseProgressPercentage);
router.put('/access', protect, updateLessonAccess);

module.exports = router;
