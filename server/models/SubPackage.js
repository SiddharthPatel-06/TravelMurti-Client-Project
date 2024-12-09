const mongoose = require('mongoose');

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
  price: { type: Number, default: null },
  duration: { type: String, required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  imageUrl: { type: String, required: true },
  isDealOfTheDay: { type: Boolean, default: false },
  introduction: { type: String }, 
  tourPlan: { type: String },
  includeExclude: { type: String },
  // hotelInfo: { type: String }, 
  galleryImages: [imageSchema],
  pricingDetails: [pricingSchema],
  subPackages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubPackage' }],
  subPackageUrl: { type: String, required: false }
}, { timestamps: true });

subPackageSchema.index({ packageId: 1 });

module.exports = mongoose.model('SubPackage', subPackageSchema);
