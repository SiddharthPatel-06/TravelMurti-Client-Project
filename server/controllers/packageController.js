// backend/controllers/packageController.js
const Package = require('../models/Package');

// Get all packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single package by ID
exports.getPackageById = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) return res.status(404).json({ message: 'Package not found' });
        res.json(package);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new package
exports.createPackage = async (req, res) => {
    const newPackage = new Package(req.body);
    try {
        const savedPackage = await newPackage.save();
        res.status(201).json(savedPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a package
exports.updatePackage = async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
        res.json(updatedPackage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a package
exports.deletePackage = async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id);
        if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
        res.json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
