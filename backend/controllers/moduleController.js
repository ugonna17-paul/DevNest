const Module = require('../models/Module');
const Lesson = require('../models/Lesson');

// @desc    Get all modules for a course
// @route   GET /api/modules/:courseId
// @access  Public
const getModulesByCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const modules = await Module.find({ 
            course: courseId, 
            isPublished: true 
        })
        .sort({ order: 1 })
        .populate('course', 'title slug');

        // Get lesson count for each module
        const modulesWithLessonCount = await Promise.all(
            modules.map(async (module) => {
                const lessonCount = await Lesson.countDocuments({ 
                    module: module._id, 
                    isPublished: true 
                });

                return {
                    ...module.toObject(),
                    lessonCount
                };
            })
        );

        res.status(200).json({
            success: true,
            count: modulesWithLessonCount.length,
            data: modulesWithLessonCount
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single module by ID
// @route   GET /api/modules/single/:moduleId
// @access  Public
const getModuleById = async (req, res, next) => {
    try {
        const { moduleId } = req.params;

        const module = await Module.findById(moduleId)
            .populate('course', 'title slug');

        if (!module) {
            return res.status(404).json({
                success: false,
                message: 'Module not found'
            });
        }

        res.status(200).json({
            success: true,
            data: module
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create module (Admin only - for now public for testing)
// @route   POST /api/modules
// @access  Public
const createModule = async (req, res, next) => {
    try {
        const module = await Module.create(req.body);

        res.status(201).json({
            success: true,
            data: module
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getModulesByCourse,
    getModuleById,
    createModule
};
