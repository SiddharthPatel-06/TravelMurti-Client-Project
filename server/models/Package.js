const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String },
  subPackages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'SubPackage',
    default: [] // To hold sub-package IDs
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
