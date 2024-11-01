const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, checkPermissions } = require('../middleware/authMiddleware');

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/users/:id/permissions', auth, checkPermissions('canAssignPermissions'), userController.assignPermissions);

// Forgot Password & Reset Password
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

// Get all users (Admin Only)
router.get('/', auth, checkPermissions('admin'), userController.getAllUsers);

// Get user by ID (Admin Only)
router.get('/:id', auth, checkPermissions('admin'), userController.getUserById);

// Edit user (Admin or Permission-Based)
router.put('/:id', auth, checkPermissions('canUpdateUser'), userController.editUser);

// Delete user (Admin or Permission-Based)
router.delete('/:id', auth, checkPermissions('canDeleteUser'), userController.deleteUser);




module.exports = router;