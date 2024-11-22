import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // Access email from state

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/verify-otp`,
        { email, otp }
      );
      toast.success(response.data.message);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <input
            type="email"
            value={email}
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
