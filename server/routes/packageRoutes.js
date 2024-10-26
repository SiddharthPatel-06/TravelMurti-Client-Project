// backend/routes/packageRoutes.js
const express = require('express');
const {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
} = require('../controllers/packageController');
const packageController = require('../controllers/packageController');
const { auth, checkPermissions } = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes for Packages
// router.get('/', getAllPackages);            // GET all packages
// router.get('/:id', getPackageById);         // GET a specific package by ID
// router.post('/', createPackage);            // POST to create a new package
// router.put('/:id', updatePackage);          // PUT to update a package
// router.delete('/:id', deletePackage);       // DELETE a package

// Package routes
router.get('/',  packageController.getAllPackages);
router.post('/', auth, checkPermissions('canCreatePackages'), packageController.createPackage);
router.put('/:id', auth, checkPermissions('canUpdatePackages'), packageController.updatePackage);
router.delete('/:id', auth, checkPermissions('canDeletePackages'), packageController.deletePackage);


module.exports = router;
