import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const SubNavbar = () => {
  const phoneNumber = "+91 8527036496";
  const email = "contact@travelmurti.com";

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] text-white py-1 fixed top-0 left-0 right-0 z-50">
      {/* Change to flex-col for smaller screens */}
      <div className="flex flex-col sm:flex-row justify-start items-center">
        <span
          className="text-white cursor-pointer hover:underline mx-4 flex items-center"
          onClick={handlePhoneClick}
        >
          <FaPhoneAlt className="mr-1" />
          {phoneNumber}
        </span>

        <span
          className="text-white cursor-pointer hover:underline mx-4 flex items-center"
          onClick={handleEmailClick}
        >
          <FaEnvelope className="mr-1" />
          {email}
        </span>
      </div>
    </div>
  );
};

export default SubNavbar;
