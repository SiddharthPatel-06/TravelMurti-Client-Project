import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateJobForm = ({ jobId }) => {
    const [jobData, setJobData] = useState({
        title: '',
        department: '',
        designation: '',
        companyName: '',
        preferredIndustry: '',
        numberOfPositions: '',
        location: '',
        experience: '',
        salary: '',
        jobObjective: '',
        skills: '',
        responsibilities: '',
        jobSpecifications: '',
        description: '',
        imageUrl: null, // For storing the selected image file
    });

    const [loading, setLoading] = useState(true);

    // Fetch the existing job data when the component mounts
    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const response = await axios.get(`/api/jobs/${jobId}`);
                setJobData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching job data:', error);
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
        setJobData((prev) => ({
            ...prev,
            imageUrl: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(jobData).forEach((key) => {
            formData.append(key, jobData[key]);
        });

        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/jobs/6721fc2a481fa5a83fb02c3b`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message); // Show success message
        } catch (error) {
            console.error('Error updating job:', error);
            alert('Error updating job. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-5 bg-white rounded-lg shadow-md my-12">
            <h1 className="text-2xl font-bold mb-4">Update Job</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(jobData).map((key) => {
                    if (key === 'imageUrl') {
                        return (
                            <div key={key} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Job Image</label>
                                <input type="file" onChange={handleImageChange} className="mt-1 block w-full" />
                            </div>
                        );
                    }
                    // Use textarea for specific fields that require multi-line input
                    if (['jobObjective', 'skills', 'responsibilities', 'jobSpecifications', 'description'].includes(key)) {
                        return (
                            <div key={key} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                <textarea
                                    name={key}
                                    value={jobData[key] || ''}
                                    onChange={handleChange}
                                    rows={4} // Number of visible rows
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                                />
                            </div>
                        );
                    }
                    return (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                            <input
                                type="text"
                                name={key}
                                value={jobData[key] || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                            />
                        </div>
                    );
                })}
                <button
                    type="submit"
                    className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Update Job
                </button>
            </form>
        </div>
    );
};

export default UpdateJobForm;
