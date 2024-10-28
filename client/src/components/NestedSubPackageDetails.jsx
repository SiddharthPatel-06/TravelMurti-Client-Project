import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import DOMPurify from "dompurify";

const NestedSubPackageDetails = () => {
  const { nestedSubPackageId } = useParams();
  const [subPackage, setSubPackage] = useState(null);
  const [activeSection, setActiveSection] = useState("introduction");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (nestedSubPackageId) {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/subPackages/${nestedSubPackageId}`
        )
        .then((response) => {
          setSubPackage(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sub-package:", error);
          toast.error("Error fetching sub-package. Please try again.");
        });
    }
  }, [nestedSubPackageId]);

  if (!subPackage) return <div>Loading...</div>;

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
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subPackage.includeExclude), // Sanitize HTML
            }}
          />
        );
      // case "hotelInfo":
      //   return (
      //     <div
      //       dangerouslySetInnerHTML={{
      //         __html: DOMPurify.sanitize(subPackage.hotelInfo), // Sanitize HTML
      //       }}
      //     />
      //   );
      // case "gallery":
      //   return (
      //     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      //       {subPackage.galleryImages.map((imageObj, index) => (
      //         <img
      //           key={index}
      //           src={imageObj.url}
      //           alt={`Gallery Image ${index + 1}`}
      //           className="w-full h-auto object-cover"
      //         />
      //       ))}
      //     </div>
      //   );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enquiryData = Object.fromEntries(formData.entries());

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

  // Updated GallerySlider Component
  const GallerySlider = ({ images }) => {
    const totalImages = images.length;

    // Move to the next image
    const goToNextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === totalImages - 1 ? 0 : prevIndex + 1
      );
    };

    // Move to the previous image
    const goToPreviousImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? totalImages - 1 : prevIndex - 1
      );
    };

    // Auto-slide images every 3 seconds
    useEffect(() => {
      const autoSlide = setInterval(goToNextImage, 3000);
      return () => clearInterval(autoSlide); // Clean up on unmount
    }, []);
    return (
      <div className="relative mb-4">
        <img
          src={images[currentImageIndex]?.url || "default-image-url.jpg"}
          alt={`Gallery Image ${currentImageIndex + 1}`}
          className="w-full h-64 object-cover rounded"
        />
        {/* Buttons below the image */}
        <div className="flex justify-between mt-2">
          <button
            onClick={goToPreviousImage}
            className="text-blue-500 flex items-center px-3 py-1 rounded hover:text-blue-600"
          >
            <span className="mr-1 text-xl">&#60;</span> {/* Left Arrow */}
            Back
          </button>
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
    <div className="sub-package-details-page p- md:mb-28 mb-16">
      {/* Static Banner Image */}
      <div className="banner relative w-full mb-8">
        <img
          src="https://images.pexels.com/photos/574313/pexels-photo-574313.jpeg?auto=compress&cs=tinysrgb&w=5000 "
          alt="Banner"
          className="banner-image w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center md:pt-24 pt-16 text-white text-2xl font-bold bg-black bg-opacity-50">
          {subPackage.name}
        </div>
      </div>

      <div className="content-container max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="left-section flex-1 bg-white p-4 rounded-lg shadow-lg">
          {subPackage.galleryImages && subPackage.galleryImages.length > 0 ? (
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
              className={`flex-1 py-2 mx-1 rounded text-center text-sm ${
                activeSection === "tourPlan"
                  ? "bg-white text-blue-600"
                  : "bg-blue-500 text-white"
              } font-semibold transition duration-200`}
              onClick={() => handleSectionChange("tourPlan")}
            >
              ITINERARY
            </button>

            <button
              className={`flex-1 py-2 px-2 mx-1 text-sm rounded text-center ${
                activeSection === "includeExclude"
                  ? "bg-white text-blue-600"
                  : "bg-blue-500 text-white"
              } font-semibold transition duration-200`}
              onClick={() => handleSectionChange("includeExclude")}
            >
              INCLUDE/EXCLUDE
            </button>

            {/* Uncomment for additional sections */}
            {/*
  <button
    className={`flex-1 py-2 px-4 rounded text-center ${
      activeSection === "hotelInfo" ? "bg-white text-blue-600" : "bg-blue-500 text-white"
    } font-semibold transition duration-200`}
    onClick={() => handleSectionChange("hotelInfo")}
  >
    Hotel Info
  </button>
  
  <button
    className={`flex-1 py-2 px-4 rounded text-center ${
      activeSection === "gallery" ? "bg-white text-blue-600" : "bg-blue-500 text-white"
    } font-semibold transition duration-200`}
    onClick={() => handleSectionChange("gallery")}
  >
    Gallery
  </button>
  */}
          </div>

          <div className="section-content mb-4">{renderSection()}</div>

          {/* Pricing Table */}
          {subPackage.pricingDetails && subPackage.pricingDetails.length > 0 ? (
            <div className="table-container">
              <table className="cost-table w-full border-collapse text-center mt-4">
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
        <div className="right-section flex-1 bg-white p-4 rounded-lg mx-auto shadow-lg max-w-full lg:max-w-sm sm:max-w-md">
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
            <input
              type="date"
              name="arrival"
              required
              placeholder="Arrival"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="departure"
              required
              placeholder="Departure"
              className="w-full p-2 border border-gray-300 rounded"
            />
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
              <p>Phone: +91 1234567890</p>
              <p>Email: info@travelwebsite.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NestedSubPackageDetails;
// Perfectly working and fully responsive
