import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const DealOfTheDay = () => {
  const [deals, setDeals] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axiosInstance.get(
          "/subpackages/deal-of-the-day"
        );
        setDeals(response.data);
        setStatus("success");
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchDeals();
  }, []);

  // Handles the 'View Details' button logic
  const handleViewDetails = (dealId) => {
    navigate(`/subPackages/${dealId}`);
  };

  // Handles the 'Submit Query' button logic
  const handleSubmitQuery = (dealName) => {
    alert(`Query submitted for ${dealName}`);
  };

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-[22px] md:text-2xl font-semibold mb-2 text-gray-700 text-center mx-auto">
        Trending Tour Package
      </h1>
      <p className="text-center mx-auto my-2 text-gray-600">
        Check out these amazing trips
      </p>
      <hr className="border-[3px] max-w-40 text-center mx-auto border-blue-500 mt-1 mb-6 sm:mb-8 rounded-sm" />

      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Error fetching data: {error}</p>
      ) : deals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
          {deals.map((deal) => (
            <Card
              key={deal._id}
              imageUrl={deal.imageUrl}
              title={deal.name}
              description={deal.description}
              price={deal.price}
              duration={deal.duration}
              onViewDetails={() => handleViewDetails(deal._id)}
              onSubmitQuery={() => handleSubmitQuery(deal.name)}
            />
          ))}
        </div>
      ) : (
        <p>No deals available at the moment.</p>
      )}
    </div>
  );
};

export default DealOfTheDay;
