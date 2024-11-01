import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" });
      return;
    }

    setLoading(true); // Set loading to true when starting the request

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users/reset-password`, {
        token,
        password: newPassword, // Ensure this matches your API's expected field
      });
      toast.success("Your password has been reset successfully.", { position: "top-right" });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again.";
      console.error("Reset Password Error:", error); // Logging the error
      toast.error(errorMessage, { position: "top-right" });
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword" // Added id for accessibility
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword" // Added id for accessibility
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Resetting..." : "Reset Password"} {/* Change button text based on loading */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
