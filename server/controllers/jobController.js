// controllers/jobController.js
const Job = require("../models/Job");
const cloudinary = require("../config/cloudinaryConfig"); // Adjust the path as needed

// Create a new job
const createJob = async (req, res) => {
  try {
    const {
      title,
      department,
      designation,
      companyName,
      preferredIndustry,
      numberOfPositions,
      location,
      experience,
      salary,
      jobObjective,
      skills,
      responsibilities,
      jobSpecifications,
      description,
    } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Get image URL from Cloudinary

    const newJob = new Job({
      title,
      department,
      designation,
      companyName,
      preferredIndustry,
      numberOfPositions,
      location,
      experience,
      salary,
      jobObjective,
      skills,
      responsibilities,
      jobSpecifications,
      description,
      imageUrl,
    });

    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating job", error });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Get a job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching job", error });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const {
      title,
      department,
      designation,
      companyName,
      preferredIndustry,
      numberOfPositions,
      location,
      experience,
      salary,
      jobObjective,
      skills,
      responsibilities,
      jobSpecifications,
      description,
    } = req.body;
    const updateData = {
      title,
      department,
      designation,
      companyName,
      preferredIndustry,
      numberOfPositions,
      location,
      experience,
      salary,
      jobObjective,
      skills,
      responsibilities,
      description,
      jobSpecifications,
    };

    // If a new image is uploaded, update the image URL
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating job", error });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting job", error });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
