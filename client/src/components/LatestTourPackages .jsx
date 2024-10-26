import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const LatestTourPackages = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const navigate = useNavigate();

  // Fetch latest tour packages from the backend
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        const response = await axiosInstance.get('/subpackages/latest-tour-packages');
        if (Array.isArray(response.data.data)) {
          setTourPackages(response.data.data);
        } else {
          console.error('Received data is not an array');
          setTourPackages([]);
        }
      } catch (error) {
        console.error('Error fetching tour packages:', error);
      }
    };

    fetchTourPackages();
  }, []);

  // Handle "View Details" click event
  const handleViewDetails = (subPackageId, packageId) => {
    navigate(`/subpackages/${packageId}/${subPackageId}`);
  };

  // Handle "Submit Query" click event
  const handleSubmitQuery = (subPackageId) => {
    console.log('Submit query for package:', subPackageId);
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-[28px] font-semibold mb-2 text-gray-700 text-center mx-auto">
        Latest Tour Packages
      </h2>
      <p className="text-center mx-auto my-2 text-gray-600">
        Check out these amazing devotional trips
      </p>
      <hr className="border max-w-xs text-center mx-auto border-gray-300 mt-1 mb-6 sm:mb-8" />

      {tourPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
          {tourPackages.map((pkg) => (
            <Card
              key={pkg._id}
              imageUrl={pkg.imageUrl}
              title={pkg.name}
              description={pkg.description}
              price={pkg.price}
              duration={pkg.duration}
              onViewDetails={() => handleViewDetails(pkg._id, pkg.packageId)}
              onSubmitQuery={() => handleSubmitQuery(pkg._id)}
            />
          ))}
        </div>
      ) : (
        <p>No tour packages available at the moment.</p>
      )}
    </div>
  );
};

export default LatestTourPackages;
