const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address.'],
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required.'],
    match: [/^\d{10}$/, 'Mobile number must be 10 digits.'],
  },
  enquiry: {
    type: String,
    required: [true, 'Enquiry is required.'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
