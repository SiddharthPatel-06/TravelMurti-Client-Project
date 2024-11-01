import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on form submission
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forgot-password`, { email });
      toast.success("Check your email for a reset link.", { position: "top-right" });
      setEmail(""); // Clear the input after success
    } catch (error) {
      console.error("Error response:", error.response);
      // More specific error messages can be added based on the error response
      if (error.response && error.response.status === 404) {
        toast.error("Email not found. Please check your email.", { position: "top-right" });
      } else {
        toast.error("Failed to send reset link. Please try again.", { position: "top-right" });
      }
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
