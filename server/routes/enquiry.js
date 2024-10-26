const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const enquiryEmail = require('../templates/enquiryEmailTemplate').enquiryEmailTemplate;

// POST Enquiry (Contact Us)
router.post('/enquiry', (req, res) => {
  const {
    name,
    email,
    contactNo,
    country,
    adults,
    children,
    arrival,
    departure,
    travelRequirement,
  } = req.body;

  // Create email content
  const emailContent = `
    Name: ${name}
    Email: ${email}
    Contact No: ${contactNo}
    Country: ${country}
    Adults: ${adults}
    Children: ${children}
    Arrival: ${arrival}
    Departure: ${departure}
    Travel Requirement: ${travelRequirement}
  `;

  // Set up email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587, // Change to 465 if using secure
    secure: false, // Set to true if using port 465
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    logger: true,
    debug: true, // Shows detailed logs in console
  });

  const mailOptions = {
    from: process.env.MAIL_USER, // Use MAIL_USER for 'from'
    to: 'siddharthpatel199448@gmail.com',
    subject: 'New Enquiry from Website',
    html: enquiryEmail(name, email, contactNo, country, adults, children, arrival, departure, travelRequirement),
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Enquiry submitted successfully!' });
  });
});

module.exports = router;
