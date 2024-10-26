const mongoose = require('mongoose');

// Schema for storing only the image URL
const imageSchema = new mongoose.Schema({
  url: { type: String, required: true } 
});

const pricingSchema = new mongoose.Schema({
  noOfPax: { type: Number, required: true },
  cab: { type: String, required: true },
  costPerPax: { type: Number, required: true }
});

const subPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // E.g., '2 days 1 night'
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true }, // Reference to parent package
  imageUrl: { type: String, required: true },
  isDealOfTheDay: { type: Boolean, default: false },
  introduction: { type: String }, // Intro section
  tourPlan: { type: String }, // Tour plan section
  includeExclude: { type: String }, // Include/Exclude section
  hotelInfo: { type: String }, // Hotel info section
  galleryImages: [imageSchema], // Array of gallery image URLs
  pricingDetails: [pricingSchema], // Pricing table
  subPackages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubPackage' }], // Reference to other SubPackages
  // NEW: Field to store the direct URL of the sub-package
  subPackageUrl: { type: String, required: false }
}, { timestamps: true });

// Index for fast querying
subPackageSchema.index({ packageId: 1 });

module.exports = mongoose.model('SubPackage', subPackageSchema);
