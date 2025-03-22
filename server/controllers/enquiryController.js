const Enquiry = require("../models/Enquiry");
const nodemailer = require("nodemailer");
const {
  enquiryEmailTemplate,
  userConfirmationEmailTemplate,
} = require("../templates/enquiryEmailTemplate");

// Function to handle enquiry submission
exports.submitEnquiry = async (req, res) => {
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

  // Add basic validation (consider using a library for comprehensive validation)
  if (!name || !email || !contactNo) {
    return res
      .status(400)
      .json({ message: "Name, email, and contact number are required." });
  }

  // Set up email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    logger: true,
    debug: true,
  });

  // Prepare admin email
  const adminMailOptions = {
    from: process.env.MAIL_USER,
    to: "contact.travelmurti@gmail.com",
    subject: "New Enquiry from Website",
    html: enquiryEmailTemplate(
      name,
      email,
      contactNo,
      country,
      adults,
      children,
      arrival,
      departure,
      travelRequirement
    ),
  };

  // Prepare user confirmation email
  const userMailOptions = {
    from: process.env.MAIL_USER,
    to: email, // Sending to the user's email
    subject: "Enquiry Confirmation",
    html: userConfirmationEmailTemplate(name),
  };

  try {
    // Send admin email
    await transporter.sendMail(adminMailOptions);

    // Send user confirmation email
    await transporter.sendMail(userMailOptions);

    // Save enquiry data to the database
    const newEnquiry = new Enquiry({
      name,
      email,
      contactNo,
      country,
      adults,
      children,
      arrival,
      departure,
      travelRequirement,
    });

    await newEnquiry.save();

    res.status(200).json({ message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Error processing enquiry:", error);
    res
      .status(500)
      .json({
        message: "Error processing enquiry. Please try again later.",
        error,
      });
  }
};

// Get all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Could not retrieve enquiries. Please try again later.",
        error,
      });
  }
};

// Delete an enquiry by ID
exports.deleteEnquiry = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    if (!deletedEnquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error deleting enquiry. Please try again later.",
        error,
      });
  }
};
