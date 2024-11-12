import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [packages, setPackages] = useState([]);
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
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setDropdownOpen((prevState) => ({
        ...prevState,
        [pkgCategory]: true,
      }));

      if (!subPackages[packageId]) {
        fetchSubPackages(packageId);
      }
    }
  };

  const handleMouseLeave = (pkgCategory) => {
    if (!isMobile) {
      const id = setTimeout(() => {
        setDropdownOpen((prevState) => ({
          ...prevState,
          [pkgCategory]: false,
        }));
      }, 200);

      setTimeoutId(id);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = (pkgCategory, packageId) => {
    setMobileDropdownOpen((prevState) => ({
      ...prevState,
      [pkgCategory]: !prevState[pkgCategory],
    }));

    if (!subPackages[packageId]) {
      fetchSubPackages(packageId);
    }
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
              key={pkg._id}
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
              {isDropdownOpen[pkg.category] && subPackages[pkg._id] && (
                <div className="border absolute -right-16 top-10 w-auto flex-col gap-1 rounded-md bg-white py-3 shadow-sm opacity-100 transition-opacity">
                  {subPackages[pkg._id].length > 0 ? (
                    subPackages[pkg._id].map((subPkg) => (
                      <Link
                        to={`/subpackages/${subPkg._id}`} // Dynamic routing
                        key={subPkg._id}
                        className="block cursor-pointer items-center min-w-60 py-1 pl-8 pr-8 text-black hover:text-blue-900"
                      >
                        {subPkg.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-500">
                      No sub-packages
                    </p>
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
          {packages.length > 0 &&
            packages.map((pkg) => (
              <div key={pkg._id}>
                <p
                  className="flex items-center justify-between"
                  onClick={() => toggleMobileDropdown(pkg.category, pkg._id)}
                >
                  <span>{pkg.category}</span>
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${
                      mobileDropdownOpen[pkg.category] ? "rotate-180" : ""
                    }`}
                  />
                </p>
                {mobileDropdownOpen[pkg.category] && subPackages[pkg._id] && (
                  <div className="flex flex-col mt-2 bg-gray-50 text-black overflow-hidden transition-all duration-300 ease-in-out border rounded-md">
                    {subPackages[pkg._id]?.length > 0 ? (
                      subPackages[pkg._id].map((subPkg) => (
                        <Link
                          to={`/subpackages/${subPkg._id}`}
                          key={subPkg._id}
                          onClick={handleLinkClick}
                          className="block px-4 py-2 hover:text-blue-900"
                        >
                          {subPkg.name}
                        </Link>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-500">No sub-packages</p>
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
