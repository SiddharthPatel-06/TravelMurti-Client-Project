import React from "react";

const Card = ({
  imageUrl,
  title,
  description,
  price,
  duration,
  onViewDetails,
}) => {
  return (
    <div className="relative mx-auto max-w-xs min-w-[300px] sm:min-w-[300px] md:min-w-[260px] lg:min-w-[280px]  p-1 rounded-xl overflow-hidden transform transition-transform duration-500 hover:shadow-2xl">
      {/* <div className="relative mx-auto max-w-xs min-w-[300px] sm:min-w-[300px] md:min-w-[260px] lg:min-w-[280px]  p-1 rounded-xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"> */}
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-red-600 to-purple-600 animate-gradient-x rounded-xl blur-sm -z-10"></div>
      
      {/* Card Content */}
      <div className="relative bg-white shadow-lg  flex flex-col items-center rounded-xl w-full max-w-xs md:max-w-md lg:max-w-lg h-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-52 w-full object-cover rounded-t-lg"
        />
        <h2 className="text-lg font-semibold mt-2 px-4 text-center">{title}</h2>
        <p className="text-gray-500 px-4 mt-2">Duration: {duration}</p>
        <p className="text-blue-600 mt-2 font-bold text-lg px-4">
          ₹{price}/Person
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 my-4 rounded transition-colors duration-300 hover:bg-blue-600"
          onClick={onViewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
