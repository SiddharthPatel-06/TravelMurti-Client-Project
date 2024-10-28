import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const heroData = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730076611/kadarnath-transformed_n2uz2w.jpg",
    title: "Chardham Yatra Pilgrimage & Religious Tours",
    description: "Sacred Visit to Badrinath, Kedarnath, Gangotri & Yamunotri.",
    link: "/subpackages/671e8f16a52b50bdeacc4896",
  },
  {
    id: 2,
    image:
      "https://akshardham.com/gujarat/wp-content/uploads/2017/04/slider1.jpg",
    title: "Gujarat Tours Packages",
    description:
      "In Gujarat all temples are very famous for their worship and pilgrims.",
    link: "/subpackages/671e8537a52b50bdeacc42f7",
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1697729444936-8c6a6f643312?&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c291dGglMjBpbmRpYW4lMjB0ZW1wbGVzfGVufDB8fDB8fHww",
    title: "South Indian Temple Tour",
    description:
      "Experience the spiritual essence of South India, known for its ancient and revered temples",
    link: "/subpackages/671e8b84a52b50bdeacc472d",
  },
  {
    id: 4,
    image:
      "https://plus.unsplash.com/premium_photo-1697730481640-114d8546ef3d?&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGhpbWFjaGFsJTIwdGVtcGxlfGVufDB8fDB8fHww",
    title: "Himachal Tours Packages",
    description:
      "Explore Himachal's majestic landscapes, from lush valleys to snow-capped peaks.",
    link: "/subpackages/671eab9aa52b50bdeacc5851",
  },
  {
    id: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1697730277839-440df1a4415f?&auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D",
    title: "Kashmir Tours Packages",
    description:
      "Discover the beauty of Kashmir, with its serene lakes, gardens, and breathtaking views.",
    link: "/subpackages/671e58c8ead46f3494f89191",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slider logic to auto change images
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroData.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change every 2 seconds
    return () => clearInterval(slider);
  }, []);

  const currentSlide = heroData[currentIndex];

  return (
    <section className="relative w-full h-[calc(100vh-250px)] md:h-[calc(100vh-80px)] bg-gray-800">
      {/* Render only the current slide */}
      <div className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000 opacity-100">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center" }}
        />
        <div className="absolute inset-0 flex items-center justify-center md:pt-24 pt-16">
          <div className="bg-black bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg text-center w-full lg:max-w-4xl md:max-w-2xl max-w-64">
            <h2 className="text-2xl sm:text-[28px] font-bold text-white">
              {currentSlide.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-200">
              {currentSlide.description}
            </p>
            <Link to={currentSlide.link}>
              <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                Know More
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroData.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
