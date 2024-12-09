import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import CardShimmer from "../CardShimmer";

// Static placeholder data (same as your example)
const staticTourPackages = [
  {
    _id: "1",
    imageUrl: "placeholder-image1.jpg",
    name: "Port Blair Haelook Neil Island Tour Package",
    description: "Explore the beauty of nature",
    price: "Coming Soon",
    duration: "6NIGHT / 7DAYS",
    packageId: "1",
  },
  {
    _id: "2",
    imageUrl: "placeholder-image2.jpg",
    name: "Port Blair Havelook & Kalapathar Tour Package",
    description: "Spiritual journey experience",
    price: "Coming Soon",
    duration: "5NIGHT / 6DAY",
    packageId: "2",
  },
  {
    _id: "3",
    imageUrl: "placeholder-image3.jpg",
    name: "Port Blair Havelook & Neil Island Tour",
    description: "Explore cities and hills",
    price: "Coming Soon",
    duration: "5NIGHT / 6DAYS",
    packageId: "3",
  },
  {
    _id: "4",
    imageUrl: "placeholder-image4.jpg",
    name: "Andaman & Nicobar Issland Tour Package",
    description: "Adventure in the hills",
    price: "Coming Soon",
    duration: "4NIGHT / 5DAYS",
    packageId: "4",
  },
];

const LatestTourPackages = () => {
  const [tourPackages, setTourPackages] = useState(staticTourPackages);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch latest tour packages from the backend
  useEffect(() => {
    const fetchTourPackages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/subpackages/latest-tour-packages`
        );
        if (Array.isArray(response.data.data)) {
          setTourPackages(response.data.data);
        } else {
          console.error("Received data is not an array");
          setTourPackages([]);
        }
      } catch (error) {
        console.error("Error fetching tour packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourPackages();
  }, []);

  // Handle "View Details" click event
  const handleViewDetails = (packageId) => {
    navigate(`/subpackages/${packageId}`);
  };

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-[22px] md:text-2xl font-semibold mb-2 text-gray-700 text-center mx-auto">
        Latest Tour Packages
      </h2>
      <p className="text-center mx-auto my-2 text-gray-600">
        Check out these amazing devotional trips
      </p>
      <hr className="border-[3px] max-w-40 text-center mx-auto border-blue-500 mt-1 mb-6 sm:mb-8 rounded-sm" />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
          {[1, 2, 3, 4].map((index) => (
            <CardShimmer key={index} />
          ))}
        </div>
      ) : tourPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
          {tourPackages.map((pkg) => (
            <Card
              key={pkg._id}
              imageUrl={pkg.imageUrl}
              title={pkg.name}
              description={pkg.description}
              price={pkg.price}
              duration={pkg.duration}
              onViewDetails={() => handleViewDetails(pkg.packageId)}
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
