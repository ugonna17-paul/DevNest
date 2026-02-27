const express = require('express');
const router = express.Router();
const {
    runCode,
    savePlaygroundCode
} = require('../controllers/playgroundController');
const { protect } = require('../middleware/authMiddleware');

// Public route for running code
router.post('/', runCode);

// Protected route for saving code (future feature)
router.post('/save', protect, savePlaygroundCode);

module.exports = router;
