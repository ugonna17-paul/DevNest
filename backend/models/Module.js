const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Module must belong to a course']
    },
    title: {
        type: String,
        required: [true, 'Module title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        required: true,
        default: 1
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
moduleSchema.index({ course: 1, order: 1 });

module.exports = mongoose.model('Module', moduleSchema);
