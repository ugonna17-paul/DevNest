const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .sort({ order: 1, createdAt: -1 });

        // Get module and lesson counts for each course
        const coursesWithCounts = await Promise.all(
            courses.map(async (course) => {
                const moduleCount = await Module.countDocuments({ 
                    course: course._id, 
                    isPublished: true 
                });
                const lessonCount = await Lesson.countDocuments({ 
                    course: course._id, 
                    isPublished: true 
                });

                return {
                    ...course.toObject(),
                    moduleCount,
                    lessonCount: lessonCount || course.totalLessons
                };
            })
        );

        res.status(200).json({
            success: true,
            count: coursesWithCounts.length,
            data: coursesWithCounts
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single course by slug
// @route   GET /api/courses/:slug
// @access  Public
const getCourseBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const course = await Course.findOne({ slug, isPublished: true });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Get modules and lessons for this course
        const modules = await Module.find({ 
            course: course._id, 
            isPublished: true 
        }).sort({ order: 1 });

        const modulesWithLessons = await Promise.all(
            modules.map(async (module) => {
                const lessons = await Lesson.find({ 
                    module: module._id, 
                    isPublished: true 
                }).sort({ order: 1 }).select('title duration order isPremium');

                return {
                    ...module.toObject(),
                    lessons
                };
            })
        );

        res.status(200).json({
            success: true,
            data: {
                ...course.toObject(),
                modules: modulesWithLessons
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create course (Admin only - for now public for testing)
// @route   POST /api/courses
// @access  Public
const createCourse = async (req, res, next) => {
    try {
        const course = await Course.create(req.body);

        res.status(201).json({
            success: true,
            data: course
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCourses,
    getCourseBySlug,
    createCourse
};
