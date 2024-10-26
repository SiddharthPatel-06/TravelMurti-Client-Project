const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads',
      allowed_formats: ['jpg', 'png', 'jpeg', 'avif', 'webp'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

// Create Multer instance for single and multiple file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Example limit: 5MB
  fileFilter: (req, file, cb) => {
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/avif', 'image/webp'];
    if (!allowedFormats.includes(file.mimetype)) {
      const error = new Error('Invalid file type. Only JPEG, PNG, and AVIF are allowed.');
      error.file = __filename; // Add file name for debugging
      return cb(error);
    }
    cb(null, true);
  },
});

module.exports = { cloudinary, upload };
