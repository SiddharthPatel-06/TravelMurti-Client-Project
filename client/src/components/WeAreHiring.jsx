import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeAreHiring = () => {
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/jobs`);
                setJob(response.data[0]);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchJobs();
    }, []);

    const handleApplyClick = () => {
        window.open('mailto:contact@travelmurti.com?subject=Application for Travel Sales Consultant', '_blank');
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-8 pt-20 md:pt-28">
            {job ? (
                <>
                    <div className="flex-1 flex items-center justify-center p-5">
                        <img
                            src={job.imageUrl}
                            alt={job.title}
                            className="max-w-lg h-auto rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105"
                        />
                    </div>
                    <div className="flex-1 p-10 bg-white rounded-lg shadow-xl flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Join <strong>{job.companyName}</strong> and {job.description}
                        </p>

                        <h2 className="text-2xl font-semibold text-gray-800 mt-6">CURRENT OPENING</h2>
                        <div className="space-y-4 mt-4">
                            <h3 className="text-xl font-bold text-gray-800">Sales & Marketing:</h3>
                            <div className="bg- py-4">
                                <p><strong>Department:</strong> {job.department}</p>
                                <p><strong>Designation:</strong> {job.designation}</p>
                                <p><strong>Preferred Industry:</strong> {job.preferredIndustry}</p>
                                <p><strong>Number of Positions:</strong> {job.numberOfPositions}</p>
                                <p><strong>Location:</strong> {job.location}</p>
                                <p><strong>Experience:</strong> {job.experience}</p>
                                <p><strong>Salary:</strong> {job.salary}</p>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mt-4">Job Objective:</h3>
                            <p className="text-lg text-gray-600 mb-4">{job.jobObjective}</p>

                            <h3 className="text-xl font-semibold text-gray-800">Skills:</h3>
                            <p className="text-lg text-gray-600 mb-4">{job.skills}</p>

                            <h3 className="text-xl font-semibold text-gray-800">Responsibilities:</h3>
                            <p className="text-lg text-gray-600 mb-4">{job.responsibilities}</p>

                            <h3 className="text-xl font-semibold text-gray-800">Job Specifications:</h3>
                            <p className="text-lg text-gray-600 mb-4">{job.jobSpecifications}</p>
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
                <p className="text-center text-gray-500">No job openings at the moment.</p>
            )}
        </div>
    );
};

export default WeAreHiring;
