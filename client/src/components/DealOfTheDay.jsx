import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const staticDeals = [
  {
    _id: "1",
    imageUrl:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730042055/uploads/1730042053596-photo-1595815771614-ade9d652a65d.avif",
    name: "Kashmir Trip With Gulmarg",
    description: "Explore the beauty of nature",
    price: "₹8599",
    duration: "3NIGHT / 4DAYS",
    packageId: "1",
  },
  {
    _id: "2",
    imageUrl: "placeholder-image2.jpg",
    name: "Baidyanath Tour Package",
    description: "Spiritual journey experience",
    price: "₹5599",
    duration: "3NIGHT / 4DAYS",
    packageId: "2",
  },
  {
    _id: "3",
    imageUrl:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730063256/uploads/1730063255110-BGCC.png",
    name: "Manali Tour Package Ex Delhi",
    description: "Adventure in the hills",
    price: "₹9599",
    duration: "3NIGHT / 4DAYS",
    packageId: "3",
  },
  {
    _id: "4",
    imageUrl:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730131787/uploads/1730131786908-banglore.avif",
    name: "Kedarnath Darshan Tour Ex-haridwar",
    description: "Explore cities and hills",
    price: "₹17599",
    duration: "02NIGHTS / 03DAYS",
    packageId: "4",
  },
];

const DealOfTheDay = () => {
  const [deals, setDeals] = useState(staticDeals);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axiosInstance.get(
          "/subpackages/deal-of-the-day"
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
          setDeals(response.data);
        }
      } catch (err) {
        console.error("Error fetching deals:", err);
      }
    };

    fetchDeals();
  }, []);

  const handleViewDetails = (packageId) => {
    navigate(`/subPackages/${packageId}`);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
        {deals.map((deal) => (
          <Card
            key={deal._id}
            imageUrl={deal.imageUrl}
            title={deal.name}
            description={deal.description}
            price={deal.price}
            duration={deal.duration}
            onViewDetails={() => handleViewDetails(deal.packageId)}
          />
        ))}
      </div>
    </div>
  );
};

export default DealOfTheDay;
