const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage for Cloudinary without format restrictions
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'uploads',
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    resource_type: 'auto', // Allows all file types (image, video, etc.)
  }),
});

// Create Multer instance without file type restrictions
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Example limit: 10MB
});

module.exports = { cloudinary, upload };
