const User = require('../models/User');
const Course = require('../models/Course');
const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Get user basic info
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Get all courses that user has progress in
        const enrolledCoursesIds = await Progress.distinct('course', { user: userId });
        
        const enrolledCourses = await Course.find({ 
            _id: { $in: enrolledCoursesIds } 
        }).select('title slug level icon');

        // Get total completed lessons
        const totalCompletedLessons = await Progress.countDocuments({
            user: userId,
            completed: true
        });

        // Get last accessed lesson
        const lastAccessedProgress = await Progress.findOne({ user: userId })
            .sort({ lastAccessedAt: -1 })
            .populate('lesson', 'title')
            .populate('course', 'title slug');

        // Get progress percentage for each enrolled course
        const coursesProgress = await Promise.all(
            enrolledCourses.map(async (course) => {
                const totalLessons = await Lesson.countDocuments({ 
                    course: course._id, 
                    isPublished: true 
                });

                const completedLessons = await Progress.countDocuments({
                    user: userId,
                    course: course._id,
                    completed: true
                });

                const percentage = totalLessons > 0 
                    ? Math.round((completedLessons / totalLessons) * 100) 
                    : 0;

                return {
                    courseId: course._id,
                    title: course.title,
                    slug: course.slug,
                    level: course.level,
                    icon: course.icon,
                    totalLessons,
                    completedLessons,
                    percentage
                };
            })
        );

        // Get weekly activity (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const weeklyCompleted = await Progress.countDocuments({
            user: userId,
            completed: true,
            completedAt: { $gte: sevenDaysAgo }
        });

        // Calculate current streak
        const allCompletedProgress = await Progress.find({
            user: userId,
            completed: true,
            completedAt: { $exists: true }
        }).sort({ completedAt: -1 }).select('completedAt');

        let currentStreak = 0;
        if (allCompletedProgress.length > 0) {
            let checkDate = new Date();
            checkDate.setHours(0, 0, 0, 0);

            for (let i = 0; i < allCompletedProgress.length; i++) {
                const progressDate = new Date(allCompletedProgress[i].completedAt);
                progressDate.setHours(0, 0, 0, 0);

                const daysDiff = Math.floor((checkDate - progressDate) / (1000 * 60 * 60 * 24));

                if (daysDiff === 0 || daysDiff === 1) {
                    currentStreak++;
                    checkDate = progressDate;
                } else {
                    break;
                }
            }

            // Remove duplicates from same day
            currentStreak = Math.min(currentStreak, 365); // Cap at 365 days
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    joinedAt: user.createdAt
                },
                stats: {
                    totalCompletedLessons,
                    enrolledCoursesCount: enrolledCourses.length,
                    weeklyCompletedLessons: weeklyCompleted,
                    currentStreak
                },
                enrolledCourses: coursesProgress,
                lastAccessedLesson: lastAccessedProgress ? {
                    lessonId: lastAccessedProgress.lesson._id,
                    lessonTitle: lastAccessedProgress.lesson.title,
                    courseTitle: lastAccessedProgress.course.title,
                    courseSlug: lastAccessedProgress.course.slug,
                    lastAccessedAt: lastAccessedProgress.lastAccessedAt
                } : null
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboard
};
