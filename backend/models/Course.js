const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Beginner to Intermediate'],
        default: 'Beginner'
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    duration: {
        type: String,
        default: '40 hours'
    },
    prerequisites: [{
        type: String
    }],
    icon: {
        type: String,
        default: '📚'
    },
    totalLessons: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
courseSchema.index({ isPublished: 1 });

module.exports = mongoose.model('Course', courseSchema);
