import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SubPackageManager from "./SubPackageManager";
import AdminUsersTable from "./AdminUsersTable";
import UpdateSubPackageForm from "./UpdateSubPackageForm";
import EnquiryTable from "./EnquiryTable";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux"; // Import useDispatch
import { logoutUser } from "../redux/userSlice"; // Import logoutUser action
import { FiLogOut } from "react-icons/fi"; // Import FiLogOut icon

import {
  FiPackage,
  FiUsers,
  FiInbox,
  FiUserPlus,
  FiMenu,
  FiMessageSquare,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({ category: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [subPackages, setSubPackages] = useState([]);
  const [loadingSubPackages, setLoadingSubPackages] = useState(true);
  const [showSubPackages, setShowSubPackages] = useState(false);
  const [showUsersTable, setShowUsersTable] = useState(false);
  const [selectedSubPackage, setSelectedSubPackage] = useState(null);
  const [showEnquiryTable, setShowEnquiryTable] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axiosInstance.get("/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleDeletePackage = async (id) => {
    try {
      await axiosInstance.delete(`/packages/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id));
      toast.success("Package deleted successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("Error deleting package. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleEditPackage = (pkg) => {
    setFormData({ category: pkg.category, description: pkg.description });
    setIsEditing(true);
    setSelectedPackage(pkg._id);
  };

  const handleCreateOrUpdatePackage = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update package
      try {
        await axiosInstance.put(`/packages/${selectedPackage}`, formData);
        setPackages(
          packages.map((pkg) =>
            pkg._id === selectedPackage ? { ...pkg, ...formData } : pkg
          )
        );
        toast.success("Package updated successfully!", {
          position: "top-right",
        });
      } catch (error) {
        console.error("Error updating package:", error);
        toast.error("You are not authorized!", {
          position: "top-right",
        });
      }
    } else {
      // Create package
      try {
        const response = await axiosInstance.post("/packages", formData);
        setPackages([...packages, response.data]);
        toast.success("Package created successfully!", {
          position: "top-right",
        });
      } catch (error) {
        console.error("Error creating package:", error);
        toast.error("Error creating package. Please try again.", {
          position: "top-right",
        });
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ category: "", description: "" });
    setIsEditing(false);
    setSelectedPackage(null);
  };

  // Fetch sub-packages when admin selects to view them
  const fetchSubPackages = async () => {
    try {
      const response = await axiosInstance.get("/subPackages");
      setSubPackages(response.data);
    } catch (error) {
      console.error("Error fetching sub-packages:", error);
      toast.error("Failed to load sub-packages.");
    } finally {
      setLoadingSubPackages(false);
    }
  };

  const handleSubpackagesClick = () => {
    setShowSubPackages(true);
    fetchSubPackages();
  };

  const handleUpdateClick = (subPkg) => {
    setSelectedSubPackage(subPkg);
  };

  const handleUpdateSubPackage = async (id, updatedData) => {
    try {
      // Use axios to send the PUT request
      const response = await axiosInstance.put(
        `/subpackages/${id}`,
        updatedData
      );

      // Axios response is directly usable; no need for response.json()
      const data = response.data;

      // Assuming you have a state that holds your subpackages
      setSubPackages((prev) =>
        prev.map((pkg) => (pkg._id === id ? data : pkg))
      );

      // Optionally reset the selected subpackage
      setSelectedSubPackage(null);
      toast.success("SubPackage updated successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Error updating SubPackage. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleCancelUpdate = () => {
    setSelectedSubPackage(null); // Clear the selected subpackage
  };

  // Handle delete subpackage
  const handleDeleteSubPackage = async (id) => {
    try {
      await axiosInstance.delete(`/subPackages/${id}`);
      setSubPackages(subPackages.filter((pkg) => pkg._id !== id));
      toast.success("SubPackage deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Error deleting SubPackage. Please try again.", {
        position: "top-right",
      });
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-0">
      {/* Sidebar Toggle Button for Mobile */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleSidebarToggle}
          className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-md"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* Background Overlay (visible only when sidebar is open) */}
      {isSidebarOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 bg-white w-64 sm:w-48 p-5 shadow-md md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        <h2 className="text-xl font-bold mb-5 pl-4">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => {
                setShowUsersTable(false);
                setShowSubPackages(false);
                setSelectedPackage(null);
                setShowEnquiryTable(false);
                setIsSidebarOpen(false); // Close sidebar on selection
              }}
              className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-200"
            >
              <FiPackage className="mr-2" /> Packages
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => {
                setShowUsersTable(false);
                setShowSubPackages(true);
                fetchSubPackages(); // Fetch SubPackages
                setShowEnquiryTable(false);
                setIsSidebarOpen(false); // Close sidebar on selection
              }}
              className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-200"
            >
              <FiInbox className="mr-2" /> SubPackages
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => {
                setShowUsersTable(false);
                setShowSubPackages(false);
                setShowEnquiryTable(true); // Show Enquiry Table
                setIsSidebarOpen(false); // Close sidebar on selection
              }}
              className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-200"
            >
              <FiMessageSquare className="mr-2" /> Enquiries
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => {
                setShowUsersTable(true);
                setShowSubPackages(false);
                setSelectedPackage(null);
                setShowEnquiryTable(false);
                setIsSidebarOpen(false); // Close sidebar on selection
              }}
              className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-200"
            >
              <FiUsers className="mr-2" /> Users
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => {
                navigate("/create-employee");
                setIsSidebarOpen(false); // Close sidebar on selection
              }}
              className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-200"
            >
              <FiUserPlus className="mr-2" /> Create Employee
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => {
                // Dispatch logout action to reset Redux state
                dispatch(logoutUser());

                // Clear token from local storage
                localStorage.removeItem("authToken");
                localStorage.removeItem("userData");

                // Redirect user to login page
                navigate("/admin/login");
              }}
              className="flex items-center w-full text-left py-2 px-4 hover:bg-gray-200 text-red-600"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 w-full">
        {/* toggle bugg: */}
        {/* <h1 className="text-2xl text-gray-800 ml- text-center font-bold mb-5 mx-auto block sm:hidden">
          Welcome to the Admin Dashboard!
        </h1> */}   

        {loading && <p>Loading...</p>}
        <>
          {showEnquiryTable ? (
            <EnquiryTable />
          ) : showUsersTable ? (
            <AdminUsersTable />
          ) : !showSubPackages ? (
            <div>
              <h2 className="text-2xl font-bold mb-5 ml-12 md:ml-0">
                Packages
              </h2>
              {/* Adjust grid for mobile to larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {packages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{pkg.category}</h3>
                      <p className="text-gray-600">{pkg.description}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPackage(pkg)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setSelectedPackage(pkg._id)} // Pass the current package's id
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Manage SubPackages
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleCreateOrUpdatePackage}
                className="bg-white p-5 rounded-lg shadow-md mt-5"
              >
                <h3 className="text-lg font-bold mb-4">
                  {isEditing ? "Edit Package" : "Create Package"}
                </h3>
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isEditing ? "Update Package" : "Create Package"}
                </button>
              </form>
              {selectedPackage && (
                <SubPackageManager packageId={selectedPackage} />
              )}
            </div>
          ) : (
            // Render SubPackages here
            <div className="p-5 bg-gray-50 min-h-screen">
              <h2 className="text-3xl font-bold mb-5 text-center text-gray-800">
                All SubPackages
              </h2>
              {loadingSubPackages ? (
                <p className="text-center text-gray-600">Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subPackages.length > 0 ? (
                    subPackages.map((subPkg) => (
                      <div
                        key={subPkg._id}
                        className="bg-white p-6 rounded-lg shadow-lg transition-colors duration-200 hover:bg-gray-100 hover:shadow-md"
                      >
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {subPkg.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {subPkg.description}
                        </p>
                        <p className="font-medium text-gray-700">
                          Price:{" "}
                          <span className="text-green-500">
                            ₹{subPkg.price}
                          </span>
                        </p>
                        <p className="font-medium text-gray-700">
                          Duration: {subPkg.duration}
                        </p>
                        <div className="font-medium text-gray-700">
                          Introduction:
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(subPkg.introduction),
                            }}
                          />
                        </div>
                        <div className="font-medium text-gray-700">
                          Tour Plan:
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(subPkg.tourPlan),
                            }}
                          />
                        </div>
                        <div className="font-medium text-gray-700">
                          Includes/Excludes:
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(subPkg.includeExclude),
                            }}
                          />
                        </div>
                        <div className="font-medium text-gray-700">
                          Hotel Info:
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(subPkg.hotelInfo),
                            }}
                          />
                        </div>

                        {subPkg.galleryImages.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-bold text-gray-800 mb-2">
                              Gallery:
                            </h4>
                            <div className="flex space-x-2">
                              {subPkg.galleryImages.map((image) => (
                                <img
                                  key={image._id}
                                  src={image.url}
                                  alt={subPkg.name}
                                  className="w-32 h-20 object-cover rounded-md shadow-sm"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        {subPkg.pricingDetails.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-bold text-gray-800 mb-2">
                              Pricing Details:
                            </h4>
                            {subPkg.pricingDetails.map((pricing) => (
                              <p key={pricing._id} className="text-gray-700">
                                {pricing.noOfPax} Pax - {pricing.cab}:{" "}
                                <span className="font-semibold">
                                  ₹{pricing.costPerPax}
                                </span>
                              </p>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex space-x-3">
                          <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                            onClick={() => handleUpdateClick(subPkg)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => handleDeleteSubPackage(subPkg._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-600">
                      No SubPackages found.
                    </p>
                  )}
                </div>
              )}
              {selectedSubPackage && (
                <UpdateSubPackageForm
                  subPackage={selectedSubPackage}
                  onUpdate={handleUpdateSubPackage}
                  onCancel={handleCancelUpdate}
                />
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default AdminDashboard;
// Perfectly working
