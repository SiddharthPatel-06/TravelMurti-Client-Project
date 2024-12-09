import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-hot-toast";

const SubPackageManager = ({ packageId }) => {
  // State variables
  const [subPackages, setSubPackages] = useState([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [pricingCount, setPricingCount] = useState(0);
  const [pricingDetails, setPricingDetails] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    packageId: packageId,
    mainImage: null,
    isDealOfTheDay: false,
    introduction: "",
    tourPlan: "",
    includeExclude: "",
    // hotelInfo: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubPackage, setSelectedSubPackage] = useState(null);

  useEffect(() => {
    const fetchSubPackages = async () => {
      try {
        const response = await axiosInstance.get(
          `/subpackages/package/${packageId}`
        );
        setSubPackages(response.data);
      } catch (error) {
        console.error("Error fetching sub-packages:", error);
      }
    };

    fetchSubPackages();
  }, [packageId]);

  const handleCreateOrUpdateSubPackage = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    // Append basic fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    // Append gallery images
    for (let i = 0; i < galleryImages.length; i++) {
      formDataToSubmit.append("galleryImages", galleryImages[i]); // 'galleryImages' should match your multer field name
    }

    // Append pricing details
    pricingDetails.forEach((detail, idx) => {
      formDataToSubmit.append(
        `pricingDetails[${idx}][noOfPax]`,
        detail.noOfPax
      );
      formDataToSubmit.append(`pricingDetails[${idx}][cab]`, detail.cab);
      formDataToSubmit.append(
        `pricingDetails[${idx}][costPerPax]`,
        detail.costPerPax
      );
    });

    try {
      if (isEditing) {
        await axiosInstance.put(
          `/subpackages/${selectedSubPackage}`,
          formDataToSubmit
        );
        toast.success("SubPackage updated successfully!", {
          position: "top-right",
        });
      } else {
        await axiosInstance.post("/subpackages/create", formDataToSubmit);
        toast.success("SubPackage created successfully!", {
          position: "top-right",
        });
      }

      resetForm();

      const response = await axiosInstance.get(
        `/subpackages/package/${packageId}`
      );
      setSubPackages(response.data);
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.", {
          position: "top-right",
        });
      } else {
        toast.error("Failed to create/update SubPackage. Please try again.", {
          position: "top-right",
        });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      packageId: packageId,
      mainImage: null,
      isDealOfTheDay: false,
      introduction: "",
      tourPlan: "",
      includeExclude: "",
      // hotelInfo: "",
    });
    setGalleryImages([]);
    setPricingDetails([]);
    setGalleryCount(0);
    setPricingCount(0);
    setIsEditing(false);
    setSelectedSubPackage(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleEditSubPackage = (subPkg) => {
    setFormData(subPkg);
    setIsEditing(true);
    setSelectedSubPackage(subPkg._id);
  };

  const handleDeleteSubPackage = async (id) => {
    try {
      await axiosInstance.delete(`/subpackages/${id}`);
      setSubPackages(subPackages.filter((subPkg) => subPkg._id !== id));
      setSuccessMessage("SubPackage deleted successfully!");
    } catch (error) {
      setErrorMessage("Error deleting sub-package. Please try again.");
      console.error("Error deleting sub-package:", error);
    }
  };

  const handleGalleryChange = (index, file) => {
    const updatedImages = [...galleryImages];
    updatedImages[index] = file;
    setGalleryImages(updatedImages);
  };

  const handlePricingChange = (index, key, value) => {
    const updatedPricing = [...pricingDetails];
    updatedPricing[index] = { ...updatedPricing[index], [key]: value };
    setPricingDetails(updatedPricing);
  };

  // Add a handler for 'Create Relative Subpackage' button
  const handleCreateRelativeSubPackage = (subPkgId) => {
    // When the button is clicked, open the form and set the packageId in formData
    toast.success(`ID ${subPkgId} copied for creating Relative Subpackage!`, {
      position: "top-right",
    });
    setFormData({
      ...formData,
      packageId: subPkgId, // Assign the current subpackage's packageId
    });
    setIsEditing(false); // It's a new subpackage, so not editing
  };

  return (
    <div className="sub-package-manager mt-5">
      <h2 className="text-xl font-bold">Manage SubPackages</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="grid grid-cols-1 gap-4 mt-4">
        {subPackages.map((subPkg) => (
          <div key={subPkg._id} className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{subPkg.name}</h3>
            <p className="text-gray-600">{subPkg.description}</p>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditSubPackage(subPkg)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubPackage(subPkg._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCreateRelativeSubPackage(subPkg._id)} // Pass the current subpackage's id
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Create Relative Subpackage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleCreateOrUpdateSubPackage}
        className="bg-white p-5 rounded-lg shadow-md mt-5"
      >
        <h3 className="text-lg font-bold mb-4">
          {isEditing ? "Edit SubPackage" : "Create SubPackage"}
        </h3>

        <input
          type="text"
          placeholder="SubPackage Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          required
        />
        <textarea
          placeholder="SubPackage Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        />

        <input
          type="text"
          placeholder="Duration (in days)"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setFormData({ ...formData, mainImage: e.target.files[0] })
          }
          className="w-full mb-4"
          required
        />
        <input
          type="checkbox"
          checked={formData.isDealOfTheDay}
          onChange={() =>
            setFormData({
              ...formData,
              isDealOfTheDay: !formData.isDealOfTheDay,
            })
          }
        />
        <label className="ml-2">Trending of the Day</label>
        <textarea
          type="text"
          placeholder="Introduction"
          value={formData.introduction}
          onChange={(e) =>
            setFormData({ ...formData, introduction: e.target.value })
          }
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          placeholder="Tour Plan"
          value={formData.tourPlan}
          onChange={(e) =>
            setFormData({ ...formData, tourPlan: e.target.value })
          }
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          placeholder="Include/Exclude"
          value={formData.includeExclude}
          onChange={(e) =>
            setFormData({ ...formData, includeExclude: e.target.value })
          }
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        />
        {/* <textarea
          placeholder="Hotel Info"
          value={formData.hotelInfo}
          onChange={(e) =>
            setFormData({ ...formData, hotelInfo: e.target.value })
          }
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        /> */}

        <div className="mb-4">
          <h4 className="font-bold mb-2">Pricing Details</h4>
          {pricingDetails.map((detail, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="number"
                placeholder="No. of Pax"
                value={detail.noOfPax || ""}
                onChange={(e) =>
                  handlePricingChange(index, "noOfPax", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="text"
                placeholder="Cab"
                value={detail.cab || ""}
                onChange={(e) =>
                  handlePricingChange(index, "cab", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1"
                required
              />
              <input
                type="number"
                placeholder="Cost per Pax"
                value={detail.costPerPax || ""}
                onChange={(e) =>
                  handlePricingChange(index, "costPerPax", e.target.value)
                }
                className="border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setPricingDetails([
                ...pricingDetails,
                { noOfPax: "", cab: "", costPerPax: "" },
              ])
            }
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Pricing Detail
          </button>
        </div>

        <div className="mb-4">
          <h4 className="font-bold mb-2">Gallery Images</h4>
          {galleryImages.map((img, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="file"
                onChange={(e) => handleGalleryChange(index, e.target.files[0])}
                className="border border-gray-300 rounded px-2 py-1"
                required
              />
              <button
                type="button"
                onClick={() => {
                  const updatedImages = galleryImages.filter(
                    (_, i) => i !== index
                  );
                  setGalleryImages(updatedImages);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setGalleryImages([...galleryImages, null])}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Gallery Image
          </button>
        </div>

        <div className="flex mt-8">
          <button
            type="submit"
            className="bg-green-500 text-white px-5 py-2 rounded"
          >
            {isEditing ? "Update SubPackage" : "Create SubPackage"}
          </button>

          {/* Red Reset button */}
          <button
            type="button" // Use type="button" to prevent form submission
            className="bg-red-500 text-white mx-5 px-4 py-2 rounded"
            onClick={resetForm} // Call the resetForm function when clicked
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubPackageManager;
// Perfectly working
