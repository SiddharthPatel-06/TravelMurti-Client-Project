const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Create a new contact
router.post('/', contactController.createContact);

// Get all contacts
router.get('/', contactController.getAllContacts);

// Get a contact by ID
router.get('/:id', contactController.getContactById);

// Update a contact
router.put('/:id', contactController.updateContact);

// Delete a contact
router.delete('/:id', contactController.deleteContact);

module.exports = router;
