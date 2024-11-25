import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateJobForm = ({ jobId }) => {
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    designation: "",
    companyName: "",
    preferredIndustry: "",
    numberOfPositions: "",
    location: "",
    experience: "",
    salary: "",
    jobObjective: "",
    skills: "",
    responsibilities: "",
    jobSpecifications: "",
    description: "",
    imageUrl: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/jobs/6721fc2a481fa5a83fb02c3b`
        );
        setJobData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setJobData((prev) => ({
      ...prev,
      imageUrl: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(jobData).forEach((key) => {
      if (key === "imageUrl" && jobData[key] instanceof File) {
        formData.append("imageUrl", jobData[key]);
      } else {
        formData.append(key, jobData[key]);
      }
    });

    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/jobs/6721fc2a481fa5a83fb02c3b`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Job updated successfully!", { position: "top-right" });
    } catch (error) {
      toast.error("Error updating job. Please try again.", {
        position: "top-right",
      });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-8 pt-0 my-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto border">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-700">
          Update Job Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(jobData)
            .filter((key) => !["_id", "__v"].includes(key))
            .map((key) => {
              if (key === "imageUrl") {
                return (
                  <div key={key}>
                    <label htmlFor="imageUrl" className="block font-medium">
                      Upload Job Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-50 file:text-sm file:text-gray-700 hover:file:bg-gray-100"
                    />
                  </div>
                );
              }

              if (
                [
                  "jobObjective",
                  "skills",
                  "responsibilities",
                  "jobSpecifications",
                  "description",
                ].includes(key)
              ) {
                return (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block font-medium capitalize"
                    >
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <textarea
                      id={key}
                      name={key}
                      value={jobData[key] || ""}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                );
              }

              return (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block font-medium capitalize"
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={jobData[key] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              );
            })}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Update Job Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateJobForm;
