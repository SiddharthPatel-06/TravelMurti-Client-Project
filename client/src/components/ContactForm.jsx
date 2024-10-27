import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ContactForm() {
  const initialUserService = {
    id: null,
    name: "",
    email: "",
    mobile: "",
    enquiry: "",
  };

  const [user, setUser] = useState(initialUserService);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    if (!user.name || !user.email || !user.mobile || !user.enquiry) {
      toast.error("All fields are required.");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(user.email)) {
      toast.error("Invalid email format.");
      return false;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(user.mobile)) {
      toast.error("Mobile number should be 10 digits.");
      return false;
    }

    return true;
  };

  const saveUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      enquiry: user.enquiry,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/contact`, data)
      .then(() => {
        setUser(initialUserService);
        setLoading(false);
        toast.success("Your message has been sent successfully.");
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage);
      });
  };

  return (
    <div className="container mx-auto p-8 pt-0 mb-12">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto border">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-700">Contact Form</h1>
        <p className="text-center mb-6">
          Send us a message and we'll get back to you as soon as we can!
        </p>
        <form onSubmit={saveUser} className="space-y-4 ">
          <div>
            <label htmlFor="fullname" className="block font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="mobileno" className="block font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileno"
              name="mobile"
              value={user.mobile}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="enquiry" className="block font-medium">
              Message
            </label>
            <textarea
              id="enquiry"
              name="enquiry"
              value={user.enquiry}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
