const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourseBySlug,
    createCourse
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');

// Public routes - users can browse courses
router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);

// Admin routes
router.post('/', protect, createCourse);

module.exports = router;
