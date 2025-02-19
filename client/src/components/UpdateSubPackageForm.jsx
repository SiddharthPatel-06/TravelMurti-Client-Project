import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const UpdateSubPackageForm = ({ subPackage, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    isDealOfTheDay: false,
    introduction: "",
    tourPlan: "",
    includeExclude: "",
    // hotelInfo: "",
    galleryImages: [],
    pricingDetails: [],
    imageUrl: null,
  });

  // State to control visibility of previous data
  const [showGallery, setShowGallery] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [existingGalleryImages, setExistingGalleryImages] = useState([]);

  useEffect(() => {
    if (subPackage) {
      // Load the data once when the component mounts
      setFormData({
        name: subPackage.name,
        description: subPackage.description,
        price: subPackage.price,
        duration: subPackage.duration,
        isDealOfTheDay: subPackage.isDealOfTheDay || false,
        introduction: subPackage.introduction,
        tourPlan: subPackage.tourPlan,
        includeExclude: subPackage.includeExclude,
        // hotelInfo: subPackage.hotelInfo,
        galleryImages: [], // Reset to empty array for new images
        pricingDetails: [], // Reset to empty array for new pricing details
        imageUrl: null,
      });
      setExistingGalleryImages(subPackage.galleryImages || []);
    }
  }, [subPackage]);

  // Function to handle deleting an existing image
  const handleDeleteGalleryImage = async (imageId) => {
    try {
      await axiosInstance.delete(
        `/subpackages/${subPackage._id}/gallery-images/${imageId}`
      );

      // Remove the deleted image from state
      setExistingGalleryImages(
        existingGalleryImages.filter((img) => img._id !== imageId)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Handle basic field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle gallery image change
  const handleGalleryChange = (index, file) => {
    const updatedImages = [...formData.galleryImages];
    updatedImages[index] = file; // Update the file for the selected index
    setFormData({ ...formData, galleryImages: updatedImages });
  };

  // Add a new gallery image field
  const addGalleryImage = () => {
    setFormData({
      ...formData,
      galleryImages: [...formData.galleryImages, null],
    });
  };

  // Remove a gallery image
  const removeGalleryImage = (index) => {
    const updatedImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData({ ...formData, galleryImages: updatedImages });
  };

  // Handle pricing details change
  const handlePricingChange = (index, key, value) => {
    const updatedPricing = [...formData.pricingDetails];
    updatedPricing[index] = { ...updatedPricing[index], [key]: value };
    setFormData({ ...formData, pricingDetails: updatedPricing });
  };

  // Add a new pricing detail row
  const addPricingDetail = () => {
    setFormData({
      ...formData,
      pricingDetails: [
        ...formData.pricingDetails,
        { noOfPax: "", cab: "", costPerPax: "" },
      ],
    });
  };

  // Remove a pricing detail row
  const removePricingDetail = (index) => {
    const updatedPricing = formData.pricingDetails.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, pricingDetails: updatedPricing });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const data = new FormData();

    // Append basic fields
    Object.keys(formData).forEach((key) => {
      if (
        key !== "galleryImages" &&
        key !== "pricingDetails" &&
        formData[key] !== null
      ) {
        data.append(key, formData[key]);
      }
    });

    // Append gallery images if they exist
    formData.galleryImages.forEach((file) => {
      if (file) data.append("galleryImages", file);
    });

    // Append pricing details explicitly
    formData.pricingDetails.forEach((detail, index) => {
      data.append(`pricingDetails[${index}][noOfPax]`, detail.noOfPax);
      data.append(`pricingDetails[${index}][cab]`, detail.cab);
      data.append(`pricingDetails[${index}][costPerPax]`, detail.costPerPax);
    });

    try {
      const response = await axiosInstance.put(
        `/subpackages/${subPackage._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate(response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
      }
    }

    // Prepare updated form data for submission
    const updatedFormData = {
      ...formData,
      // Only include gallery images that are not null
      galleryImages: formData.galleryImages.filter(Boolean),
      // Filter out empty pricing details
      pricingDetails: formData.pricingDetails.filter(
        (detail) => detail.noOfPax || detail.cab || detail.costPerPax
      ),
    };

    // Call parent update function with the correctly formatted data
    onUpdate(subPackage._id, updatedFormData);
  };

  const handleChangeForDealsOfTheDay = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setFormData({ ...formData, imageUrl: e.target.files[0] });
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Update SubPackage</h2>

      {/* Existing fields */}
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Duration</label>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      {/* Deal of the Day Toggle */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="isDealOfTheDay"
            checked={formData.isDealOfTheDay}
            onChange={handleChangeForDealsOfTheDay}
            className="mr-2"
          />
          Deal of the Day
        </label>
      </div>

      <div>
        <label>Upload New Image:</label>
        <input type="file" onChange={handleImageChange} />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Introduction</label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          className="border p-2 w-full"
          // required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Tour Plan</label>
        <textarea
          name="tourPlan"
          value={formData.tourPlan}
          onChange={handleChange}
          className="border p-2 w-full"
          // required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Includes/Excludes</label>
        <textarea
          name="includeExclude"
          value={formData.includeExclude}
          onChange={handleChange}
          className="border p-2 w-full"
          // required
        />
      </div>

      {/* <div className="mb-4">
        <label className="block mb-1">Hotel Info</label>
        <textarea
          name="hotelInfo"
          value={formData.hotelInfo}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div> */}

      {/* ... (Other fields remain unchanged) ... */}

      {/* Gallery Images Section */}
      <div className="mb-4">
        <label className="block mb-1">Gallery Images</label>

        {/* Render Existing Images from Backend */}
        {subPackage?.galleryImages?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Existing Gallery Images:</h4>
            <div className="flex flex-wrap gap-1">
              {subPackage.galleryImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img.url}
                    alt={`Gallery ${index + 1}`}
                    className="w-[80px] h-[80px] object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteGalleryImage(img._id)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add or Edit New Images */}
        {showGallery ? (
          formData.galleryImages.map((img, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:space-x-2 mb-2 space-y-2 md:space-y-0"
            >
              <input
                type="file"
                onChange={(e) => handleGalleryChange(index, e.target.files[0])}
                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="bg-red-500 text-white px-3 py-1 rounded w-full md:w-auto"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No additional gallery images added yet.</p>
        )}

        {/* Button to Add New Image Fields */}
        <button
          type="button"
          onClick={() => {
            addGalleryImage();
            setShowGallery(true); // Show gallery section when adding new images
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Gallery Image
        </button>
      </div>

      {/* Pricing Details Section */}
      <div className="mb-4">
        <label className="block mb-1">Pricing Details</label>
        {showPricing ? (
          formData.pricingDetails.map((detail, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:space-x-2 mb-2 space-y-2 md:space-y-0"
            >
              <input
                type="number"
                name={`noOfPax-${index}`}
                placeholder="No. of Pax"
                value={detail.noOfPax}
                onChange={(e) =>
                  handlePricingChange(index, "noOfPax", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
              />
              <input
                type="text"
                name={`cab-${index}`}
                placeholder="Cab"
                value={detail.cab}
                onChange={(e) =>
                  handlePricingChange(index, "cab", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
              />
              <input
                type="number"
                name={`costPerPax-${index}`}
                placeholder="Cost per Pax"
                value={detail.costPerPax}
                onChange={(e) =>
                  handlePricingChange(index, "costPerPax", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1 w-full md:w-auto"
              />
              <button
                type="button"
                onClick={() => removePricingDetail(index)}
                className="bg-red-500 text-white px-3 py-1 rounded w-full md:w-auto"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No existing pricing details.</p>
        )}
        <button
          type="button"
          onClick={() => {
            addPricingDetail();
            setShowPricing(true); // Show pricing section when adding new details
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Pricing Detail
        </button>
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateSubPackageForm;
// Perfectly working!
