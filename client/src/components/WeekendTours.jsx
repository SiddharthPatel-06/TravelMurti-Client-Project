import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const WeekendTours = () => {
  return (
    <div className="weekend-tours  min-h-screen min-w-fit pt-20 md:pt-24">
      {/* Static Banner Image */}
      <div className="banner relative min-w-full mb-8">
        <img
          src="https://res.cloudinary.com/djrxcdfrr/image/upload/v1731676840/premium_photo-1683140513388-4344c8fc2778_kbd6ff.jpg"
          alt="Banner"
          className="banner-image w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
          <p className="font-bold text-4xl md:text-5xl">Weekend Tours</p>
          <p className="text-md flex items-center pt-2">
            <Link to="/" className="hover:underline">Home</Link>
            <FaChevronRight className="mx-2" size={14} />
            Weekend Tours
          </p>
        </div>
      </div>

      {/* Weekend Tours Description */}
      <div className="description px-4 md:px-8 lg:px-48 lg:py-14 py-12 text-gray-600">
        <p className="text-md md:text-base leading-relaxed mb-4">
          India is well-known as a country where people of various religions such as Hinduism, Islam, Christianity, Jainism, Sikhism, and Buddhism reside in harmony. The presence of temples across the landscape reflects the strong religious faith of its people.
        </p>
        <p className="text-md md:text-base leading-relaxed mb-4">
          Since ancient times, temples have been integral to Indian life. They attract devotees worldwide and inspire a sense of divine calmness. At Indian Holiday, you can explore a range of temple tours that allow you to experience this unique cultural heritage.
        </p>
      </div>
    </div>
  );
};

export default WeekendTours;
