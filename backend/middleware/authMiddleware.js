const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes - requires valid JWT token
 */
const protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

/**
 * Admin only - requires admin role
 */
const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('role');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ 
                message: 'Access denied. Admin privileges required.' 
            });
        }

        next();
    } catch (error) {
        res.status(500).json({ 
            message: 'Authorization failed', 
            error: error.message 
        });
    }
};

module.exports = { protect, isAdmin };

// Backward compatibility
module.exports.default = protect;
