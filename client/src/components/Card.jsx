import React from "react";

const Card = ({
  imageUrl,
  title,
  description,
  price,
  duration,
  onViewDetails,
  onSubmitQuery,
}) => {
  return (
    <div className="card bg-white shadow-lg flex flex-col items-center rounded-t-xl w-full max-w-xs mx-auto h-90 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 border-[3px] border-transparent hover:border-blue-500">
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
  );
};

export default Card;
