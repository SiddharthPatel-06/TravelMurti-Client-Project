import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RequestOtp = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/request-password-reset`, { email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error requesting OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-otp">
      <h2>Request Password Reset OTP</h2>
      <form onSubmit={handleRequestOtp}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default RequestOtp;
