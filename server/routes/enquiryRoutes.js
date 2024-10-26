// routes/enquiryRoutes.js
const express = require('express');
const { submitEnquiry, getAllEnquiries, deleteEnquiry } = require('../controllers/enquiryController');

const router = express.Router();

// Route to create a new enquiry
router.post('/enquiry', submitEnquiry);

// Route to get all enquiries
router.get('/users-enquiry', getAllEnquiries);

// Route to delete an enquiry by ID
router.delete('/users-enquiry/:id', deleteEnquiry);

module.exports = router;
