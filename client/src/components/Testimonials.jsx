import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "We went on a Chopta tour with Travel Murti. Despite some planning issues, our trip leader Amit was super helpful and arranged bonfires at most camps. The hotels were nice, and we saw nearly all the attractions. It was a memorable experience! 🙏",
    name: "Siddharth Patel",
    role: "Software Engineer",
    image: "https://res.cloudinary.com/djrxcdfrr/image/upload/v1741976699/bfkwnaus4mgc2vmwxftl.png",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "My first Chadham trip with Travel Murti and it was an amazing experience. All the service provided by the Travel Murti were excellent.They arranged everything in proper line with perfect hotel, rooms, car driver everything. I recommended them..",
    name: "Santhosh Kavuparambil",
    role: "Working Professional",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiTEJIIr8IGnCWmECJw3stWQBl_hv9U4ZEdA&s",
    rating: 4.5,
  },
  {
    id: 3,
    quote:
      "My first trip with Travel Murti and it was an amazing experience. All the service provided by the Travel Murti were excellent.They made sure that everything was on proper line with perfect hotel, rooms, car driver everything.",
    name: "Saurav Chauhan",
    role: "Working Professional",
    image: "https://res.cloudinary.com/djrxcdfrr/image/upload/v1741976824/zlbglujtltf56hi6qgr8.png",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Travel Murti has planned our three dham yatra meticulously as per our time &need. Amitji has taken all his best efforts to provide good service. Journey was safe as the vehicle & driver provided by tour operator were very good.We enjoyed the stay and food as well.",
    name: "Asha Chandrakar",
    role: "Working Professional",
    image: "https://res.cloudinary.com/djrxcdfrr/image/upload/v1741976911/images_y8wr3y.png",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "Thanks to Travel Murti for making all the arrangements for our journey Manali. They are absolutely fantastic and they did better than we wanted. They make our honeymoon a very memorable one. I recommend this place very strongly for tourists.",
    name: "Saurav Chauhan",
    role: "Working Professional",
    image: "https://res.cloudinary.com/djrxcdfrr/image/upload/v1741977270/fy5hgjeeqxvtbpocx4sh.jpg",
    rating: 3.5,
  },
  {
    id: 6,
    quote:
      "We visited Vaishno Devi Dham and had an amazing experience! The journey was beautiful, and the atmosphere was serene. The temple was awe-inspiring, making it a truly memorable trip! Thank you, Mr. Amit, for arranging this! 🙏",
    name: "Sandeep Kumar Mehta",
    role: "Software Engineer",
    image: "https://res.cloudinary.com/djrxcdfrr/image/upload/v1741977333/sandeep_image_pkeimf.jpg",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(slider);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="relative w-full max-h-[56vh] md:max-h-[78vh] bg-white overflow-hidden mt-14 lg:mt-20">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Testimonials
      </h2>
      <hr className="border max-w-28 text-center mx-auto border-gray-300 mt-1 mb-8 sm:mb-12 rounded-sm " />

      <div className="relative w-full h-[600px] flex items-center justify-center">
        {" "}
        {/* Adjusted height */}
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`absolute top-0 left-0 w-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className=" flex flex-col items-center justify-center h-full px-4">
              <div className="bg-white p-4 md:p-10 rounded-lg shadow-lg max-w-2xl md:max-w-4xl w-full text-center border border-gray-200">
                <p className="text-gray-600 mb-4 text-sm md:text-lg">
                  "{testimonial.quote}"
                </p>
                <img
                  alt={testimonial.name}
                  src={testimonial.image}
                  className="w-16 md:w-24 h-16 md:h-24 mx-auto rounded-full mb-4"
                />
                <h3 className="font-semibold text-lg md:text-2xl">
                  {testimonial.name}
                </h3>
                <span className="text-gray-500 text-sm md:text-base">
                  {testimonial.role}
                </span>
                <div className="flex justify-center mt-4">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15.27L16.18 20l-1.64-7.03L20 8.24l-7.19-.61L10 2 7.19 7.63 0 8.24l5.46 4.73L3.82 20z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="hidden md:block absolute top-[30%] sm:top-[30%] left-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 md:p-3 ml-4 rounded-full focus:outline-none z-10"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="hidden md:block absolute top-[30%] sm:top-[30%] right-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 md:p-3 mr-4 rounded-full focus:outline-none z-10"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default TestimonialSlider;
// Perfectly working fully responsive
