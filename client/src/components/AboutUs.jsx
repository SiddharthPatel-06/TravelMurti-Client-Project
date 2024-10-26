import React from "react";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="bg-gray-50 mb-20">
      {/* Banner Section */}
      {/* Banner Section */}
      <section
        className="relative h-52 md:h-72 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=500&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA2fHxob21lJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D')" }}
      >
        {/* Overlay for darkening the background */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Text content */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold tracking-wider drop-shadow-lg">
            About Us
          </h1>
          <p className="text-white mt-3 text-sm md:text-lg font-medium drop-shadow-md">
            Home &gt; About Us
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-6">
            Welcome to Travel Murti
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
            Travel Murti is your one-stop destination for all travel-related
            services. Our expert planning ensures your journey is safe,
            enjoyable, and unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <p className="text-gray-700 leading-relaxed text-lg">
              We specialize in individual and group tours across India, making
              us your go-to for all travel needs. From the start, our priority
              has been delivering top-notch services.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <p className="text-gray-700 leading-relaxed text-lg">
              Our commitment lies in providing economical options for everyone,
              with custom-tailored programs to suit your time and budget.
            </p>
          </div>
        </div>

        {/* Our Strengths Section */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 text-center">
            Our Strengths
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl text-center">
              <h4 className="text-xl font-semibold mb-4 text-indigo-600">
                Customer Relations
              </h4>
              <p className="text-gray-700">
                We value long-term relationships with our clients, ensuring they
                receive personalized services every time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl text-center">
              <h4 className="text-xl font-semibold mb-4 text-indigo-600">
                Destination Expertise
              </h4>
              <p className="text-gray-700">
                Our team provides accurate destination information and
                competitive pricing, making your trip hassle-free.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl text-center">
              <h4 className="text-xl font-semibold mb-4 text-indigo-600">
                Nationwide Reach
              </h4>
              <p className="text-gray-700">
                We have offices across India, allowing us to offer localized,
                on-the-ground support in all regions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl text-center">
              <h4 className="text-xl font-semibold mb-4 text-indigo-600">
                Attention to Detail
              </h4>
              <p className="text-gray-700">
                Our team takes care of every little detail to ensure your travel
                experience exceeds expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 text-center">
            Our Commitment
          </h3>
          <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl max-w-4xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              At Travel Murti, we provide comprehensive services from travel
              planning to ground operations. With a focus on exceptional
              customer service, we ensure every trip is memorable and
              stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Explore with Us?
          </h3>
          <p className="text-lg md:text-xl mb-6">
            Let Travel Murti make your travel dreams come true with our expert
            services and unbeatable prices.
          </p>
          <Link to="/contact">
          <button className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Contact Us Now
          </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
