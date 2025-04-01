import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const WeAreHiring = () => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/jobs`
        );
        setJob(response.data[0]);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = () => {
    window.open(
      "mailto:contact.travelmurti@gmail.com?subject=Application for Travel Sales Consultant",
      "_blank"
    );
  };

  return (
    <div className=" min-h-screen min-w-full bg-gray-50 mb-12 pt-20 md:pt-24">
      {/* Static Banner Image */}
      <div className="banner relative min-w-full mb-">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          alt="Banner"
          className="banner-image w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center md:pt-24 pt-16 text-white text-2xl  bg-black bg-opacity-50">
          <p className="font-bold text- text-5xl">We are Hiring</p>
          <p className="text-md flex items-center pt-2">
            <Link to="/">Home </Link>{" "}
            <FaChevronRight className="mx-2" size={14} />
            We are Hiring
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen px-4 bg-white py-10 pt-4 md:pt-10">
        {job ? (
          <>
            <div className="flex-1 flex items-start justify-center p-5">
              <img
                src={job.imageUrl}
                alt={job.title}
                className="max-w-lg h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
              />
            </div>
            <div className="flex-1 py-8 px-4 md:px-12 bg-white rounded-lg shadow-xl flex flex-col border">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {job.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Join <strong>{job.companyName}</strong> and {job.description}
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                CURRENT OPENING
              </h2>
              <div className="space-y-1 mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Sales & Marketing:
                </h3>
                <div className="bg- py-4">
                  <p className="text-lg text-gray-800">
                    <strong className="font-semibold">Department:</strong>{" "}
                    {job.department}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong className="font-semibold">Designation:</strong>{" "}
                    {job.designation}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong className="font-semibold">
                      Preferred Industry:
                    </strong>{" "}
                    {job.preferredIndustry}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong className="font-semibold">
                      Number of Positions:
                    </strong>{" "}
                    {job.numberOfPositions}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong className="font-semibold">Location:</strong>{" "}
                    {job.location}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong className="font-semibold">Experience:</strong>{" "}
                    {job.experience}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong className="font-semibold">Salary:</strong>{" "}
                    {job.salary}
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-4">
                  Job Objective:
                </h3>
                <p className="text-lg text-gray-600 mb-4">{job.jobObjective}</p>

                <h3 className="text-xl font-semibold text-gray-800">Skills:</h3>
                <p className="text-lg text-gray-600 mb-4">{job.skills}</p>

                <h3 className="text-xl font-semibold text-gray-800">
                  Responsibilities:
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  {job.responsibilities}
                </p>

                <h3 className="text-xl font-semibold text-gray-800">
                  Job Specifications:
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  {job.jobSpecifications}
                </p>
              </div>

              <button
                className="mt-6 py-3 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                onClick={handleApplyClick}
              >
                Apply Now
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            No job openings at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default WeAreHiring;
