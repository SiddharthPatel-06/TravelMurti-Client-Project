// models/Enquiry.js
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  country: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  arrival: { type: Date, required: true },
  departure: { type: Date, required: true },
  travelRequirement: { type: String, required: true },
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;
