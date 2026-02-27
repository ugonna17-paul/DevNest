const express = require('express');
const router = express.Router();
const {
    getLessonsByModule,
    getLessonById,
    createLesson,
    getLessonsByCourse
} = require('../controllers/lessonController');
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');

// Protected routes - require authentication + active subscription
router.get('/:moduleId', protect, requireActiveSubscription, getLessonsByModule);
router.get('/course/:courseId', protect, requireActiveSubscription, getLessonsByCourse);
router.get('/single/:lessonId', protect, requireActiveSubscription, getLessonById);

// Admin routes
router.post('/', protect, createLesson);

module.exports = router;
