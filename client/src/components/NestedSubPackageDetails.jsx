import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import DOMPurify from "dompurify";

const NestedSubPackageDetails = () => {
  const { nestedSubPackageId } = useParams();
  const [subPackage, setSubPackage] = useState(null);
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    if (nestedSubPackageId) {
      axios
        .get(`http://localhost:4000/api/subPackages/${nestedSubPackageId}`)
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
      case "hotelInfo":
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subPackage.hotelInfo), // Sanitize HTML
            }}
          />
        );
      case "gallery":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {subPackage.galleryImages.map((imageObj, index) => (
              <img
                key={index}
                src={imageObj.url}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            ))}
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

    const loadingToastId = toast.loading("Submitting your enquiry...");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/enquiry",
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

  return (
    <div className="sub-package-details-page p-4 md:mb-28 mb-16">
      {/* Static Banner Image */}
      <div className="banner w-full mb-8">
        <img
          src="https://plus.unsplash.com/premium_photo-1697730334768-6e65fa8fded0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWFuJTIwdG91cmlzdCUyMHBsYWNlfGVufDB8fDB8fHww"
          alt="Banner"
          className="banner-image w-full h-20 md:h-48 object-cover"
        />
      </div>

      <div className="content-container max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="left-section flex-1 bg-white p-4 rounded-lg shadow-lg">
          <img
            src={subPackage.imageUrl || "default-image-url.jpg"}
            alt={subPackage.name}
            className="w-full h-64 object-cover mb-4 rounded"
          />

          <div className="section-buttons flex flex-wrap gap-2 mb-4">
            <button
              className={`py-2 px-4 rounded ${
                activeSection === "introduction" ? "bg-blue-600" : "bg-blue-500"
              } text-white`}
              onClick={() => handleSectionChange("introduction")}
            >
              Introduction
            </button>
            <button
              className="py-2 px-4 rounded bg-blue-500 text-white"
              onClick={() => handleSectionChange("tourPlan")}
            >
              Tour Plan
            </button>
            <button
              className="py-2 px-4 rounded bg-blue-500 text-white"
              onClick={() => handleSectionChange("includeExclude")}
            >
              Include/Exclude
            </button>
            <button
              className="py-2 px-4 rounded bg-blue-500 text-white"
              onClick={() => handleSectionChange("hotelInfo")}
            >
              Hotel Info
            </button>
            <button
              className="py-2 px-4 rounded bg-blue-500 text-white"
              onClick={() => handleSectionChange("gallery")}
            >
              Gallery
            </button>
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
          <h3 className="text-lg font-semibold mb-4">Enquiry Form</h3>
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
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="departure"
              required
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