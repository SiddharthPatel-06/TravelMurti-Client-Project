import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

// Static data for Navbar
const staticPackages = [
  {
    category: "Spiritual Tour",
    subPackages: [
      "Chardham Tour Package",
      "Gujarat Tour Package",
      "Rameshwaram Tour",
      "Amarnath Tour Package",
      "Kailash Mansarovar Yatra",
      "Mata Vaishno Devi Darshan",
      "Nau Durga Tour Package",
      "Puri Tour Package",
      "Ayodhya Tour Package",
      "Mathura Vrindavan Tour",
      "Tirupati Balaji Darshan",
      "Sirdi Sai Baba Darshan",
      "12 Jyotirlinga Tour Package",
      "Chardham India Tour",
      "South Indian Temple Tour",
    ],
  },
  {
    category: "Holiday Tour",
    subPackages: [
      "Madhya Pradesh Tour",
      "Kashmir Tour Package",
      "Leh Ladakh Tour Package",
      "Golden Triangle Tour",
      "Gujrat Holiday Tour",
      "Rajasthan Holiday",
      "Uttarakhand Holiday",
      "Goa Holiday",
      "North Indian Holiday",
      "South Indian Holiday",
      "Andaman Holiday",
    ],
  },
  {
    category: "Honeymoon Tour",
    subPackages: [
      "Kausani Honeymoon Package",
      "Bangalore Ooty Honeymoon Tour",
      "Uttarakhand Honeymoon",
      "Himanchal Honeymoon",
      "Rajasthan Honeymoon Tour",
      "Ladakh Honeymoon",
      "Andamn Honeymoon",
      "Goa Honeymoon Tour",
      "Jammu & Kashmir Honeymoon",
    ],
  },
];

const Navbar = () => {
  const [packages, setPackages] = useState(staticPackages);
  const [subPackages, setSubPackages] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/packages`
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchSubPackages = async (packageId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/subpackages/package/${packageId}`
      );
      setSubPackages((prevState) => ({
        ...prevState,
        [packageId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching sub-packages:", error);
    }
  };

  const handleMouseEnter = (pkgCategory, packageId) => {
    if (!isMobile) {
      if (timeoutId) clearTimeout(timeoutId);
      setDropdownOpen((prev) => ({ ...prev, [pkgCategory]: true }));
      fetchSubPackages(packageId);
    }
  };

  const handleMouseLeave = (pkgCategory) => {
    if (!isMobile) {
      const id = setTimeout(() => {
        setDropdownOpen((prev) => ({ ...prev, [pkgCategory]: false }));
        setTimeoutId(null);
      }, 200);
      setTimeoutId(id);
    }
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const toggleMobileDropdown = (pkgCategory, packageId) => {
    setMobileDropdownOpen((prev) => ({
      ...prev,
      [pkgCategory]: !prev[pkgCategory],
    }));
    fetchSubPackages(packageId);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1E3A8A] to-[#1E40AF] shadow-md mx-auto md:flex w-full max-w-8xl justify-between md:px-24 px-6 py-4 text-sm text-white md:pt-10 pt-10">
      {/* Left section */}
      <div className="flex justify-between items-center gap-10">
        <div className="flex items-center">
          <Link to="/">
            <img
              className="h-8 w-auto"
              src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg"
              alt="Company Logo"
            />
          </Link>
          <Link to="/">
            <p className="pl-4 text-base">Travel Murti</p>
          </Link>
        </div>
        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-3xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/">
          <p className="pr-4">Home</p>
        </Link>
        <Link to="/about">
          <p>About Us</p>
        </Link>
        {/* Dynamic Dropdown for Packages */}
        {packages.length > 0 &&
          packages.map((pkg) => (
            <div
              key={pkg._id || pkg.category}
              className="group relative px-2 py-3 transition-all z-10"
              onMouseLeave={() => handleMouseLeave(pkg.category)}
            >
              <p
                onMouseEnter={() => handleMouseEnter(pkg.category, pkg._id)}
                className="flex items-center gap-2 cursor-pointer text-white group-hover:text-neutral-400"
              >
                <span>{pkg.category}</span>
                <IoIosArrowDown className="rotate transition-all group-hover:rotate-0" />
              </p>
              {/* Sub-package dropdown */}
              {isDropdownOpen[pkg.category] && (
                <div className="border absolute -right-16 top-10 w-auto flex-col gap-1 rounded-md bg-white py-3 shadow-sm opacity-100 transition-opacity">
                  {(subPackages[pkg._id] || pkg.subPackages).map(
                    (subPkg, index) => (
                      <Link
                        key={index}
                        to={`/subpackages/${subPkg._id || subPkg}`}
                        className="block cursor-pointer items-center min-w-60 py-1 pl-8 pr-8 text-black hover:text-blue-900"
                      >
                        {subPkg.name }
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        <Link to="/contact">
          <p className="pr-4">Contact Us</p>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 pl-2">
          <Link to="/" onClick={handleLinkClick}>
            <p className="pr-4">Home</p>
          </Link>
          <Link to="/about" onClick={handleLinkClick}>
            <p>About Us</p>
          </Link>
          {packages.map((pkg) => (
            <div key={pkg._id || pkg.category}>
              <button
                className="flex items-center justify-between"
                onClick={() => toggleMobileDropdown(pkg.category, pkg._id)}
              >
                {pkg.category}
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    mobileDropdownOpen[pkg.category] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileDropdownOpen[pkg.category] && (
                <div className="flex flex-col mt-2 bg-gray-50 text-black overflow-hidden transition-all duration-300 ease-in-out border rounded-md">
                  {(subPackages[pkg._id] || pkg.subPackages).map(
                    (subPkg, index) => (
                      <Link
                        key={index}
                        to={`/subpackages/${subPkg._id || subPkg}`}
                        className="block px-4 py-2 hover:text-blue-900"
                        onClick={toggleMobileMenu}
                      >
                        {subPkg.name}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
          <Link to="/contact" onClick={handleLinkClick}>
            <p className="pr-4">Contact Us</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
