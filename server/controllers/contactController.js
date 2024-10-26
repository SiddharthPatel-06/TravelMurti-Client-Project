const Contact = require("../models/Contact");
const transporter = require("../config/nodemailerConfig");
const { contactUsEmail } = require("../templates/emailTemplate");

// Create a new contact
exports.createContact = async (req, res) => {
  const { name, email, mobile, enquiry } = req.body;

  // Save contact to database
  const newContact = new Contact({ name, email, mobile, enquiry });

  try {
    await newContact.save();

    // Generate email content using template
    const emailContent = contactUsEmail(name, email, mobile, enquiry);

    // Send email to the user
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: "siddharthpatel199448@gmail.com",
      subject: "New Contact Form Confirmation",
      html: emailContent,
    });

    res.status(201).json({ message: "Contact form submitted successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Get a contact by ID
exports.getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found." });
    }
    res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};
