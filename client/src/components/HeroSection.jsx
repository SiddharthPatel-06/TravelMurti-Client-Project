import React, { useState, useEffect } from "react";

const heroData = [
  // {
  //   id: 1,
  //   image:
  //     "https://images.unsplash.com/photo-1555098811-6f5428a3d476?auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHRhaiUyMG1haGFsJTIwaG9yaXpvbnRhbCUyMGltYWdlfGVufDB8fDB8fHww",
  //   title: "Holiday Tour",
  //   description: "Explore the best holiday destinations around the world.",
  // },
  {
    id: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1700954878958-30363bc9ec5c?auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fGhpbmR1JTIwdGVtcGxlfGVufDB8fDB8fHww",
    title: "Spiritual Tour",
    description: "Connect with your inner peace on our spiritual tours.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1601999705946-fbf42c3c6c66?auto=format&fit=crop&q=100&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvbmV5bW9vbiUyMHZhY2F0aW9ufGVufDB8fDB8fHww",
    title: "Honeymoon Tour",
    description: "Experience the perfect honeymoon with our special packages.",
  },
  {
    id: 4,
    image:
      "https://akshardham.com/gujarat/wp-content/uploads/2017/04/slider1.jpg",
    title: "Gujarat Tours Packages",
    description: "Experience the perfect honeymoon with our special packages.",
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
    }, 2000); // Change every 5 seconds
    return () => clearInterval(slider);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-250px)] md:h-[calc(100vh-80px)] bg-gray-800">
      {/* Image Slider */}
      {heroData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center" }}
          />
          {/* Centered Component for Info */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg text-center w-full lg:max-w-4xl md:max-w-2xl max-w-xs">
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                {slide.title}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-300">
                {slide.description}
              </p>
              <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                Know More
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Indicators (Optional) */}
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
