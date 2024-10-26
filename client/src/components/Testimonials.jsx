import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "We took a Chopta tour with Travel Murti. While the trip could have been planned a bit better, our trip leader, Amit, was really helpful and understanding. He did his best to assist us. He even arranged bonfires at nearly all the camps where we stayed. The hotels booked by the team were really nice, too. We got to see almost all the attractions on this trip. It was truly a memorable experience! 🙏",
    name: "Siddharth Patel",
    role: "Software Engineer",
    image: "https://via.placeholder.com/150",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Travel Murti has planned our three dham yatra meticulously as per our time & need. Mr. Amit has taken all his best efforts to provide good service. Journey was safe as the vehicle & driver provided by the tour operator were very good. We enjoyed the stay and food as well. Thank you, Travel Murti team!",
    name: "Aditi Sharma",
    role: "College Student",
    image: "https://via.placeholder.com/150",
    rating: 4.5,
  },
  {
    id: 3,
    quote:
      "I am running a travels in Trivandrum, Kerala. We had a very nice dealings with Travel Murti Tours & Travels. I got 5 days package from Murti Travels from trivandrum to kanyakumari, rameshwaram, madurai. All places in itenerary was accurate. And it was very good deal for us. All things have been nicely handled by Mr. Amit. Again i expecting future business with Murti Tours & Travels. Thanks for building a good relationship with us.",
    name: "Rahul Verma",
    role: "College Student",
    image: "https://via.placeholder.com/150",
    rating: 4,
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
    <section className="relative w-full max-h-[90vh] bg-white overflow-hidden mt-24 lg:mt-48">
      <h2 className="text-center text-2xl md:text-4xl font-semibold text-gray-700 mb-6">
        Testimonials
      </h2>

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
            <div className="flex flex-col items-center justify-center h-full px-4">
              <div className="bg-white p-4 md:p-10 rounded-lg shadow-lg max-w-2xl md:max-w-4xl w-full text-center">
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
          className="absolute top-[40%] sm:top-[30%] left-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 md:p-3 ml-4 rounded-full focus:outline-none z-10"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-[40%] sm:top-[30%] right-5 transform -translate-y-1/2 bg-gray-800 text-white p-2 md:p-3 mr-4 rounded-full focus:outline-none z-10"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default TestimonialSlider;
// Perfectly working fully responsive
