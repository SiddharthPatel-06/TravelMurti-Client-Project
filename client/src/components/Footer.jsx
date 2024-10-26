import React from 'react';

const Footer = () => {
  const contactInfo = [
    "4th Floor, Kamal Bhati Market, Sector-86, Yakubpur, Noida, Utter Pradesh, 201305, India",
    "Tel: +91 120 4561644",
    "Mob: +91 8745009300/9400/9700",
    "Email: info@suvidhayatri.com"
  ];

  const services = [
    "Spiritual Tours",
    "Holiday Tours",
    "Honeymoon Tours",
    "Weekend Tours",
    "Cab Booking",
    "Hotel Booking",
    "Pooja Booking",
    "Air Ticket Booking",
    "Visa Services"
  ];

  const quickLinks = [
    "Home",
    "Why us?",
    "About Us",
    "Travel Tips",
    "Travel Insurance",
    "Testimonial & Reviews",
    "Blog",
    "Bank Details/Make Payments",
    "Contact Us",
    "We are Hiring"
  ];

  const additionalLinks = [
    "Spiritual Tours",
    "Holiday Tours",
    "Honeymoon Tours",
    "Weekend Tours",
    "Cab Booking",
    "Hotel Booking",
    "Pooja Booking",
    "Air Ticket Booking",
    "Visa Services"
  ];

  return (
    <footer className="bg-gray-800 text-white border-t border-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: Contact Us */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <div className="border-b border-gray-300 mb-4 "></div>
            <ul className="space-y-2 text-gray-700">
              {contactInfo.map((info, index) => (
                <li key={index} className="cursor-pointer text-white hover:text-blue-600 transition duration-200">
                  {info}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Our Services</h2>
            <div className="border-b border-gray-300 mb-4"></div>
            <ul className="space-y-2 text-gray-700">
              {services.map((service, index) => (
                <li key={index} className="cursor-pointer text-white hover:text-blue-600 transition duration-200">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <div className="border-b border-gray-300 mb-4"></div>
            <ul className="space-y-2 text-gray-700">
              {quickLinks.map((link, index) => (
                <li key={index} className="cursor-pointer text-white hover:text-blue-600 transition duration-200">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Additional Links */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Additional Links</h2>
            <div className="border-b border-gray-300 mb-4"></div>
            <ul className="space-y-2 text-gray-700">
              {additionalLinks.map((link, index) => (
                <li key={index} className="cursor-pointer text-white hover:text-blue-600 transition duration-200">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gray Line Below Columns */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Copyright Section */}
        <div className="text-center text-white py-4">
          <p className="text-sm">Copyright © Travel Murti 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
