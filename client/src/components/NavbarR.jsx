import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";

const Navbar = () => {
  const [packages, setPackages] = useState([]);
  const [subPackages, setSubPackages] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState({});
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const fetchSubPackages = async (packageId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/subpackages/package/${packageId}`
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
  };

  const handleMouseLeave = (pkgCategory) => {
    const id = setTimeout(() => {
      setDropdownOpen((prevState) => ({
        ...prevState,
        [pkgCategory]: false,
      }));
    }, 200);

    setTimeoutId(id);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = (pkgCategory) => {
    setMobileDropdownOpen((prevState) => ({
      ...prevState,
      [pkgCategory]: !prevState[pkgCategory],
    }));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-3">
      {/* Logo */}
      <div className="flex justify-between items-center">
        <img
          className="h-8 w-auto"
          src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg"
          alt="Company Logo"
        />
        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-3xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <p className="pr-4">Home</p>
        <p>About Us</p>

        {packages.length > 0 &&
          packages.map((pkg) => (
            <div
              key={pkg._id}
              className="relative"
              onMouseLeave={() => handleMouseLeave(pkg.category)}
              onMouseEnter={() => handleMouseEnter(pkg.category, pkg._id)}
            >
              <p className="flex items-center gap-2 cursor-pointer">
                <span>{pkg.category}</span>
                <IoIosArrowDown />
              </p>
              {isDropdownOpen[pkg.category] && subPackages[pkg._id] && (
                <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg z-10">
                  {subPackages[pkg._id].length > 0 ? (
                    subPackages[pkg._id].map((subPkg) => (
                      <Link
                        to={`/subpackages/${subPkg._id}`}
                        key={subPkg._id}
                        className="block px-4 py-2 hover:bg-gray-100"
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
        <p>Contact Us</p>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4">
          <p>Home</p>
          <p>About Us</p>
          {packages.length > 0 &&
            packages.map((pkg) => (
              <div key={pkg._id}>
                <p
                  className="flex items-center justify-between"
                  onClick={() => toggleMobileDropdown(pkg.category)}
                >
                  <span>{pkg.category}</span>
                  <IoIosArrowDown />
                </p>
                {mobileDropdownOpen[pkg.category] && subPackages[pkg._id] && (
                  <div className="flex flex-col mt-2 bg-gray-50">
                    {subPackages[pkg._id].length > 0 ? (
                      subPackages[pkg._id].map((subPkg) => (
                        <Link
                          to={`/subpackages/${subPkg._id}`}
                          key={subPkg._id}
                          className="block px-4 py-2 hover:bg-gray-100"
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
          <p>Contact Us</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
