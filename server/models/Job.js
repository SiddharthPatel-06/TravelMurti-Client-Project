const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  department: String,
  description: String,
  designation: String,
  companyName: String,
  preferredIndustry: String,
  numberOfPositions: Number,
  location: String,
  experience: String,
  salary: String,
  jobObjective: String,
  skills: String,
  responsibilities: String,
  jobSpecifications: String,
  imageUrl: String,
});

module.exports = mongoose.model("Job", jobSchema);
