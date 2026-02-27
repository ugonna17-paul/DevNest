const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// @desc    Mark lesson as complete
// @route   POST /api/progress
// @access  Private
const markLessonComplete = async (req, res, next) => {
    try {
        const { lessonId, courseId, timeSpent } = req.body;
        const userId = req.user.id;

        if (!lessonId || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Lesson ID and Course ID are required'
            });
        }

        // Check if lesson exists
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        // Find or create progress
        let progress = await Progress.findOne({ user: userId, lesson: lessonId });

        if (progress) {
            // Update existing progress
            progress.completed = true;
            progress.completedAt = new Date();
            progress.lastAccessedAt = new Date();
            if (timeSpent) progress.timeSpent += timeSpent;
            await progress.save();
        } else {
            // Create new progress
            progress = await Progress.create({
                user: userId,
                lesson: lessonId,
                course: courseId,
                completed: true,
                completedAt: new Date(),
                timeSpent: timeSpent || 0
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lesson marked as complete',
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user progress (all or by course)
// @route   GET /api/progress?courseId=xxx
// @access  Private
const getUserProgress = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.query;

        const filter = { user: userId };
        if (courseId) filter.course = courseId;

        const progress = await Progress.find(filter)
            .populate('lesson', 'title duration order')
            .populate('course', 'title slug')
            .sort({ lastAccessedAt: -1 });

        res.status(200).json({
            success: true,
            count: progress.length,
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get course progress percentage
// @route   GET /api/progress/course/:courseId
// @access  Private
const getCourseProgressPercentage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.params;

        // Check if courseId is a valid ObjectId or a slug
        let course;
        if (courseId.match(/^[0-9a-fA-F]{24}$/)) {
            // It's a valid ObjectId
            course = await Course.findById(courseId);
        } else {
            // It's a slug
            course = await Course.findOne({ slug: courseId });
        }

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Get total lessons in course
        const totalLessons = await Lesson.countDocuments({ 
            course: course._id, 
            isPublished: true 
        });

        // Get completed lessons
        const completedCount = await Progress.countDocuments({
            user: userId,
            course: course._id,
            completed: true
        });

        const percentage = totalLessons > 0 
            ? Math.round((completedCount / totalLessons) * 100) 
            : 0;

        res.status(200).json({
            success: true,
            data: {
                courseId: course._id,
                slug: course.slug,
                totalLessons,
                completedLessons: completedCount,
                percentage
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update lesson access time (for tracking last accessed)
// @route   PUT /api/progress/access
// @access  Private
const updateLessonAccess = async (req, res, next) => {
    try {
        const { lessonId, courseId } = req.body;
        const userId = req.user.id;

        if (!lessonId || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Lesson ID and Course ID are required'
            });
        }

        // Find or create progress
        let progress = await Progress.findOne({ user: userId, lesson: lessonId });

        if (progress) {
            progress.lastAccessedAt = new Date();
            await progress.save();
        } else {
            progress = await Progress.create({
                user: userId,
                lesson: lessonId,
                course: courseId,
                completed: false,
                lastAccessedAt: new Date()
            });
        }

        res.status(200).json({
            success: true,
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    markLessonComplete,
    getUserProgress,
    getCourseProgressPercentage,
    updateLessonAccess
};
