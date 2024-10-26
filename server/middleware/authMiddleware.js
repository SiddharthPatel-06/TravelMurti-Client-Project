const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Auth middleware to verify JWT token and roles
exports.auth = async(req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to check user permissions
exports.checkPermissions = (requiredPermission) => {
    return (req, res, next) => {
        const user = req.user; // Authenticated user from auth middleware

        if (!user) return res.status(403).json({ message: 'User not found' });

        // If user is an admin, they automatically have access
        if (user.role === 'admin') {
            return next();
        }

        // Check for the required permission in user's permissions
        if (!user.permissions || !user.permissions[requiredPermission]) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        next(); // Permission granted, proceed
    };
};