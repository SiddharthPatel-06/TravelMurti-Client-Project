const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig'); // Import Cloudinary configuration

// Set up Cloudinary storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'subpackages', // Folder in Cloudinary to store images
        allowed_formats: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
    },
});

// Initialize Multer upload middleware
const upload = multer({ storage });

module.exports = upload;
