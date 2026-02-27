const Lesson = require('../models/Lesson');
const Module = require('../models/Module');

// @desc    Get all lessons for a module
// @route   GET /api/lessons/:moduleId
// @access  Public
const getLessonsByModule = async (req, res, next) => {
    try {
        const { moduleId } = req.params;

        const lessons = await Lesson.find({ 
            module: moduleId, 
            isPublished: true 
        })
        .sort({ order: 1 })
        .populate('module', 'title')
        .populate('course', 'title slug');

        res.status(200).json({
            success: true,
            count: lessons.length,
            data: lessons
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single lesson by ID
// @route   GET /api/lesson/:lessonId
// @access  Public
const getLessonById = async (req, res, next) => {
    try {
        const { lessonId } = req.params;

        const lesson = await Lesson.findById(lessonId)
            .populate('module', 'title order')
            .populate('course', 'title slug');

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Get adjacent lessons for navigation
        const prevLesson = await Lesson.findOne({
            module: lesson.module._id,
            order: { $lt: lesson.order },
            isPublished: true
        }).sort({ order: -1 }).select('_id title order');

        const nextLesson = await Lesson.findOne({
            module: lesson.module._id,
            order: { $gt: lesson.order },
            isPublished: true
        }).sort({ order: 1 }).select('_id title order');

        res.status(200).json({
            success: true,
            data: {
                ...lesson.toObject(),
                navigation: {
                    previous: prevLesson,
                    next: nextLesson
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create lesson (Admin only - for now public for testing)
// @route   POST /api/lessons
// @access  Public
const createLesson = async (req, res, next) => {
    try {
        const lesson = await Lesson.create(req.body);

        res.status(201).json({
            success: true,
            data: lesson
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all lessons for a course
// @route   GET /api/lessons/course/:courseId
// @access  Public
const getLessonsByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const lessons = await Lesson.find({ 
            course: courseId, 
            isPublished: true 
        })
        .sort({ order: 1 })
        .populate('module', 'title order')
        .select('title duration order module');

        res.status(200).json({
            success: true,
            count: lessons.length,
            data: lessons
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getLessonsByModule,
    getLessonById,
    createLesson,
    getLessonsByCourse
};
