// routes/jobRoutes.js
const express = require('express');
const { upload } = require('../config/cloudinaryConfig'); // Adjust path as necessary
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

// Route for creating a job
router.post('/', upload.single('image'), createJob);

// Route for getting all jobs
router.get('/', getAllJobs);

// Route for getting a job by ID
router.get('/:id', getJobById);

// Route for updating a job
router.put('/:id', upload.single('image'), updateJob);

// Route for deleting a job
router.delete('/:id', deleteJob);

module.exports = router;
