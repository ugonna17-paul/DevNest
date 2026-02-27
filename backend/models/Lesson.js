const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: [true, 'Lesson must belong to a module']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Lesson must belong to a course']
    },
    title: {
        type: String,
        required: [true, 'Lesson title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Lesson content is required']
    },
    codeExample: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: '10 min'
    },
    order: {
        type: Number,
        required: true,
        default: 1
    },
    videoUrl: {
        type: String
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isPremium: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Indexes for faster queries
lessonSchema.index({ module: 1, order: 1 });
lessonSchema.index({ course: 1 });

module.exports = mongoose.model('Lesson', lessonSchema);
