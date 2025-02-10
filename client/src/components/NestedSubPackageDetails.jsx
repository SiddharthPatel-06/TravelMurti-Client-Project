import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import DOMPurify from "dompurify";
import { FaChevronRight } from "react-icons/fa";
import CardShimmer from "../CardShimmer";

const NestedSubPackageDetails = () => {
  const { nestedSubPackageId } = useParams();
  const [subPackage, setSubPackage] = useState(null);
  const [activeSection, setActiveSection] = useState("introduction");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [arrivalType, setArrivalType] = useState("text");
  const [departureType, setDepartureType] = useState("text");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nestedSubPackageId) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/subPackages/${nestedSubPackageId}`
        )
        .then((response) => {
          setSubPackage(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching sub-package:", error);
          toast.error("Error fetching sub-package. Please try again.");
          setLoading(false);
        });
    }
  }, [nestedSubPackageId]);

  const renderShimmer = () => {
    return (
      <div className="shimmer-container">
        <div className="shimmer-block w-full h-40 mb-4 mt-28 rounded shimmer"></div>

        <div className="shimmer-block flex gap-2 w-full mb-4">
          <div className="w-1/3 h-6 shimmer rounded"></div>
          <div className="w-1/3 h-6 shimmer rounded"></div>
          <div className="w-1/3 h-6 shimmer rounded"></div>
        </div>

        <div className="shimmer-block w-full h-6 mb-4 shimmer rounded"></div>
        <div className="shimmer-block w-full h-6 mb-4 shimmer rounded"></div>

        <div className="shimmer-block w-full h-32 shimmer rounded mb-16"></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 px-4 max-w-[1200px] mx-auto">
        {renderShimmer()}
      </div>
    );
  }

  if (!subPackage) {
    return <div className="text-center">Sub-package details not found.</div>;
  }

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "introduction":
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subPackage.introduction), // Sanitize HTML
            }}
          />
        );
      case "tourPlan":
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subPackage.tourPlan), // Sanitize HTML
            }}
          />
        );
      case "includeExclude":
        return (
          <div>
            {/* Package Include Section */}
            <section>
              <h2 className="font-semibold text-base">PACKAGE INCLUDE:</h2>
              <ul className="list-disc pl-5 mb-4">
                <li>Meeting and assistance on arrival.</li>
                <li>Accommodations in rooms at hotels.</li>
                <li>
                  Vehicle for sightseeing and excursions as per Group Size.
                </li>
                <li>Driver Bata, Toll tax, and parking.</li>
                <li>Hotel and vehicle Tax.</li>
                <li>Breakfast & Dinner.</li>
              </ul>
            </section>

            {/* Package Exclude Section */}
            <section>
              <h2 className="font-semibold text-base">PACKAGE EXCLUDE:</h2>
              <ul className="list-disc pl-5">
                <li>Coolie/Porter charges.</li>
                <li>Camera charges.</li>
                <li>Donations at temples.</li>
                <li>Extended stay or traveling due to any reason.</li>
                <li>
                  Any meals other than those specified in Tour Cost Includes.
                </li>
                <li>
                  Expenses of personal nature such as tips, laundry, liquor,
                  etc.
                </li>
                <li>Any other item not specified in Tour cost includes.</li>
                <li>Guide & Entrance fees during sightseeing.</li>
              </ul>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enquiryData = Object.fromEntries(formData.entries());

    for (const key in enquiryData) {
      if (Object.hasOwnProperty.call(enquiryData, key)) {
        enquiryData[key] = DOMPurify.sanitize(enquiryData[key]);
      }
    }

    const loadingToastId = toast.loading("Submitting your enquiry...");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/enquiry`,
        enquiryData
      );
      if (response.status === 200) {
        toast.success("Enquiry submitted successfully!", {
          id: loadingToastId,
        });
        e.target.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error("Error submitting enquiry. Please try again.", {
        id: loadingToastId,
      });
      console.error("Error submitting enquiry:", error);
    }
  };

  const GallerySlider = ({ images }) => {
    const totalImages = images.length;

    const goToNextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === totalImages - 1 ? 0 : prevIndex + 1
      );
    };

    const goToPreviousImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? totalImages - 1 : prevIndex - 1
      );
    };

    // Auto-slide images every 3 seconds
    useEffect(() => {
      const autoSlide = setInterval(goToNextImage, 3000);
      return () => clearInterval(autoSlide);
    }, []);
    return (
      <div className="relative mb-4">
        <img
          src={images[currentImageIndex]?.url || "default-image-url.jpg"}
          alt={`Gallery Image ${currentImageIndex + 1}`}
          className="w-full h-96 object-contain rounded"
        />
        {/* Buttons below the image */}
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={goToPreviousImage}
            className="text-blue-500 flex items-center px-3 py-1 rounded hover:text-blue-600"
          >
            <span className="mr-1 text-xl">&#60;</span> {/* Left Arrow */}
            Back
          </button>
          {/* Indicators */}
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={goToNextImage}
            className="text-blue-500 flex items-center px-3 py-1 rounded hover:text-blue-600"
          >
            Next
            <span className="ml-1 text-xl">&#62;</span> {/* Right Arrow */}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="sub-package-details-page md:mb-28 mb-16">
      {/* Static Banner Image */}
      <div className="banner relative w-full mb-8">
        <img
          src="https://images.pexels.com/photos/574313/pexels-photo-574313.jpeg?auto=compress&cs=tinysrgb&w=5000 "
          alt="Banner"
          className="banner-image w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-row items-center justify-center md:pt-24 pt-20 text-white text-2xl  bg-black bg-opacity-50">
          <p className="font-bold text-center">
            {subPackage.name
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </p>
          {/* <p className="text-base flex items-center pt-2"><Link to="/">Home </Link> <FaChevronRight className="mx-2" size={14} />{subPackage.name}</p> */}
        </div>
      </div>

      <div className="content-container px-4 max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="left-section flex-1 bg-white md:p-4 px-2 rounded-lg shadow-lg">
          {loading ? (
            renderShimmer()
          ) : (
            <>
              {subPackage.galleryImages &&
              subPackage.galleryImages.length > 0 ? (
                <GallerySlider images={subPackage.galleryImages} />
              ) : (
                <img
                  src={subPackage.imageUrl || "default-image-url.jpg"}
                  alt={subPackage.name}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
              )}

              <div className="section-buttons flex flex-row w-full gap-[1px] mb-4 bg-blue-500 rounded-lg md:py-2 py-2">
                <button
                  className={`flex-1 py-2 px-2 mx-1 rounded-lg text-center text-sm ${
                    activeSection === "introduction"
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white"
                  } font-semibold transition duration-200`}
                  onClick={() => handleSectionChange("introduction")}
                >
                  INTRODUCTION
                </button>

                <button
                  className={`flex-1 py-2 px- mx- rounded text-center text-sm ${
                    activeSection === "tourPlan"
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white"
                  } font-semibold transition duration-200`}
                  onClick={() => handleSectionChange("tourPlan")}
                >
                  ITINEARY
                </button>

                <button
                  className={`flex-1 py-2 px-1 mx-1 text-sm rounded text-center ${
                    activeSection === "includeExclude"
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white"
                  } font-semibold transition duration-200`}
                  onClick={() => handleSectionChange("includeExclude")}
                >
                  INCLUDE/EXCLUDE
                </button>
              </div>

              <div className="section-content mb-4">{renderSection()}</div>
            </>
          )}

          {subPackage.pricingDetails && subPackage.pricingDetails.length > 0 ? (
            <div className="table-container">
              <table className="cost-table w-full border-collapse text-center mt-4 mb-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">S.No</th>
                    <th className="p-2 border">No. of Pax</th>
                    <th className="p-2 border">Cab</th>
                    <th className="p-2 border">Cost/Pax</th>
                  </tr>
                </thead>
                <tbody>
                  {subPackage.pricingDetails.map((row, index) => (
                    <tr key={index}>
                      <td className="p-2 border">{index + 1}</td>
                      <td className="p-2 border">{row.noOfPax}</td>
                      <td className="p-2 border">{row.cab}</td>
                      <td className="p-2 border">{row.costPerPax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No cost details available.</p>
          )}
        </div>

        {/* Right Section - Enquiry Form */}
        <div className="right-section flex-1 bg-white border p-4 rounded-lg mx-auto shadow-lg max-h-fit max-w-md lg:max-w-sm sm:max-w-md">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Enquiry Form
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="contactNo"
              placeholder="Contact No"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="adults"
              placeholder="No. of Adults"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="children"
              placeholder="Children"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div>
              <div className="relative mb-4">
                <input
                  type={arrivalType}
                  name="arrival"
                  placeholder="Arrival Date"
                  required
                  onFocus={() => setArrivalType("date")}
                  onBlur={() => setArrivalType("text")}
                  className="w-full p-2 border border-gray-300 rounded placeholder-gray-500"
                />
              </div>

              <div className="relative mb-4">
                <input
                  type={departureType}
                  name="departure"
                  placeholder="Departure Date"
                  required
                  onFocus={() => setDepartureType("date")}
                  onBlur={() => setDepartureType("text")}
                  className="w-full p-2 border border-gray-300 rounded placeholder-gray-500"
                />
              </div>
            </div>
            <textarea
              name="travelRequirement"
              placeholder="Travel Requirement"
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
            >
              Submit
            </button>
          </form>

          {/* Contact Info */}
          <div className="contact-info mt-8">
            <h4 className="font-semibold">Looking for Help?</h4>
            <p>For Tour Packages, Vehicle Rental, and Customer Care Support</p>
            <div className="mt-4">
              <p>Phone: +91 8527036496</p>
              <p>Email: contact@travelmurti.com</p>
            </div>
          </div>

          <div className="mt-8 border-2 border-gray-300">
            <img
              src="https://images.unsplash.com/photo-1542560453-88e10bdc429f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRvdXJpc218ZW58MHx8MHx8fDA%3D"
              alt=""
              className="rounded-sm p-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedSubPackageDetails;
// Perfectly working and fully responsive
