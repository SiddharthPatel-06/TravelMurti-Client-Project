import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-hot-toast";

const EnquiryTable = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axiosInstance.get("/users-enquiry");
        setEnquiries(res.data);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users-enquiry/${id}`);
      setEnquiries(enquiries.filter((enquiry) => enquiry._id !== id));
      toast.success("Enquiry deleted successfully", { position: "top-right" });
    } catch (error) {
      toast.error("Error deleting enquiry");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">
          Manage Enquiries
        </h2>

        {/* Traditional Table Layout for larger screens */}
        <div className="hidden xl:block overflow-x-auto mt-6 shadow-xl rounded-lg">
          <table className="min-w-full table-auto leading-normal">
            <thead>
              <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                {[
                  "Name",
                  "Email",
                  "Contact No",
                  "Country",
                  "Adults",
                  "Children",
                  "Arrival",
                  "Departure",
                  "Travel Requirement",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-2 py-3 text-xs sm:text-sm uppercase font-semibold tracking-wide text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-gray-600">
                    No enquiries available
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr
                    key={enquiry._id}
                    className="bg-white border-b hover:bg-gray-100 transition-all duration-150"
                  >
                    <td className="px-2 py-4 text-gray-700 text-xs sm:text-sm">
                      {enquiry.name || "N/A"}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {enquiry.email || "N/A"}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {enquiry.contactNo || "N/A"}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {enquiry.country || "N/A"}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {enquiry.adults || 0}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {enquiry.children || 0}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {new Date(enquiry.arrival).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {new Date(enquiry.departure).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-4 text-gray-600 text-xs sm:text-sm">
                      {enquiry.travelRequirement || "N/A"}
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex justify-center space-x-1 sm:space-x-2">
                        <button
                          className="flex items-center bg-red-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-md hover:bg-red-600 transition-all duration-200 shadow-lg"
                          onClick={() => handleDelete(enquiry._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Card layout for enquiries on smaller screens */}
        <div className="grid grid-cols-1 gap-4 mt-6 xl:hidden"> {/* One card per row on small screens */}
          {enquiries.length === 0 ? (
            <div className="text-center py-4 text-gray-600 col-span-full">
              No enquiries available
            </div>
          ) : (
            enquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-white p-4 rounded-lg shadow-md" // Each enquiry in its own card
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{enquiry.name}</h3>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-150"
                    onClick={() => handleDelete(enquiry._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="border-gray-300 rounded-md">
                  <table className="min-w-full">
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Email:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {enquiry.email || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Contact No:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {enquiry.contactNo || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Country:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {enquiry.country || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Adults:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {enquiry.adults || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Children:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {enquiry.children || 0}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Arrival:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {new Date(enquiry.arrival).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Departure:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {new Date(enquiry.departure).toLocaleDateString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 py-1 font-semibold">
                          Requirement:
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                          {enquiry.travelRequirement || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryTable;
// perfect for mobile screen not for large screen's