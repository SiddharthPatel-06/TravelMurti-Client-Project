import React from 'react';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

function ContactUs() {
  return (
    <div className="bg-gray-50 py-12 my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">We’d love to hear from you!</p>
        </div>

        {/* Contact Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <FaPhone className="text-blue-500 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-800">Phone</h4>
            <p className="text-gray-600 text-center">+91-120-4561644, 8744992244, 8745009300, 8745009400</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <FaMapMarkerAlt className="text-blue-500 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-800">Address</h4>
            <p className="text-gray-600 text-center">
              B-42, 2nd Floor, Sector-64, Noida-201301, Noida
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <FaClock className="text-blue-500 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-800">Opening Time</h4>
            <p className="text-gray-600 text-center">10:00 am to 06:00 pm</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
            <FaEnvelope className="text-blue-500 w-8 h-8 mb-2" />
            <h4 className="font-semibold text-gray-800">Email</h4>
            <p className="text-gray-600 text-center">info@suvidhayatri.com</p>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-12 rounded-lg overflow-hidden shadow-md">
          <iframe
            className="w-full h-96"
            src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7011.000289368489!2d77.402638!3d28.524683!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDMxJzI4LjkiTiA3N8KwMjQnMDkuNSJF!5e0!3m2!1sen!2sin!4v1729810670957!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
