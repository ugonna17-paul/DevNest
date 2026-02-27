const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Progress must belong to a user']
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: [true, 'Progress must be for a lesson']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    },
    timeSpent: {
        type: Number, // in seconds
        default: 0
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index to ensure one progress entry per user per lesson
progressSchema.index({ user: 1, lesson: 1 }, { unique: true });
progressSchema.index({ user: 1, course: 1 });
progressSchema.index({ user: 1, completed: 1 });

module.exports = mongoose.model('Progress', progressSchema);
