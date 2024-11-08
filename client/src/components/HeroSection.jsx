import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730189561/southindiasliderimage_pkvwqf.avif",
    title: "South Indian Temple Tour",
    description:
      "Experience the spiritual essence of South India, known for its ancient and revered temples",
    link: "/subpackages/671e8b84a52b50bdeacc472d",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730189415/slideimage_zy8wiq.avif",
    title: "Himachal Tours Packages",
    description:
      "Explore Himachal's majestic landscapes, from lush valleys to snow-capped peaks.",
    link: "/subpackages/671eab9aa52b50bdeacc5851",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/djrxcdfrr/image/upload/v1730189507/sliderimage2_x3vi6a.avif",
    title: "Kashmir Tours Packages",
    description:
      "Discover the beauty of Kashmir, with its serene lakes, gardens, and breathtaking views.",
    link: "/subpackages/671e58c8ead46f3494f89191",
  },
];

const HeroSection = () => {
  return (
    <section className="relative w-full h-[calc(100vh-250px)] md:h-[calc(100vh-80px)] bg-gray-800">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        className="w-full h-full"
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0 flex items-center justify-center md:pt-24 pt-16">
                <div className="bg-black bg-opacity-50 p-6 sm:p-8 rounded-lg shadow-lg text-center w-full lg:max-w-4xl md:max-w-2xl max-w-64">
                  <h2 className="text-2xl sm:text-[28px] font-bold text-white">
                    {slide.title}
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-gray-200">
                    {slide.description}
                  </p>
                  <Link to={slide.link}>
                    <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                      Know More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
