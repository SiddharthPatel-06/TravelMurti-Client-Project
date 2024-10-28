import React, { useState, useEffect } from "react";

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
    hotelInfo: "",
    galleryImages: [],
    pricingDetails: [],
  });

  // State to control visibility of previous data
  const [showGallery, setShowGallery] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

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
        hotelInfo: subPackage.hotelInfo,
        galleryImages: [], // Reset to empty array for new images
        pricingDetails: [], // Reset to empty array for new pricing details
      });
    }
  }, [subPackage]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

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

      <div className="mb-4">
        <label className="block mb-1">Introduction</label>
        <textarea
          name="introduction"
          value={formData.introduction}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Tour Plan</label>
        <textarea
          name="tourPlan"
          value={formData.tourPlan}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Includes/Excludes</label>
        <textarea
          name="includeExclude"
          value={formData.includeExclude}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Hotel Info</label>
        <textarea
          name="hotelInfo"
          value={formData.hotelInfo}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      {/* ... (Other fields remain unchanged) ... */}

      {/* Gallery Images Section */}
      <div className="mb-4">
        <label className="block mb-1">Gallery Images</label>
        {showGallery ? (
          formData.galleryImages.map((img, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="file"
                onChange={(e) => handleGalleryChange(index, e.target.files[0])}
                className="border border-gray-300 rounded px-2 py-1"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No existing gallery images.</p>
        )}
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
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="number"
                name={`noOfPax-${index}`}
                placeholder="No. of Pax"
                value={detail.noOfPax}
                onChange={(e) =>
                  handlePricingChange(index, "noOfPax", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="text"
                name={`cab-${index}`}
                placeholder="Cab"
                value={detail.cab}
                onChange={(e) =>
                  handlePricingChange(index, "cab", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="number"
                name={`costPerPax-${index}`}
                placeholder="Cost per Pax"
                value={detail.costPerPax}
                onChange={(e) =>
                  handlePricingChange(index, "costPerPax", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1"
              />
              <button
                type="button"
                onClick={() => removePricingDetail(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateSubPackageForm;
// Perfectly working!