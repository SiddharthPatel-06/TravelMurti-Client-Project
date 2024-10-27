import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubPackages } from "../redux/subPackagesSlice";
import { useNavigate } from "react-router-dom";

const SpiritualSubPackages = () => {
  const dispatch = useDispatch();
  const {
    data: subPackages,
    status,
    error,
  } = useSelector((state) => state.subPackages);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Default to 2 for desktop
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSubPackages("6718db46c8039b655f222f5d"));
  }, [dispatch]);

  useEffect(() => {
    // Function to update items per page based on screen size
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 796) {
        setItemsPerPage(1); // Show 1 item for mobile view
      } else {
        setItemsPerPage(2); // Show 2 items for desktop view
      }
    };

    // Set initial items per page
    updateItemsPerPage();

    // Add event listener for window resize
    window.addEventListener("resize", updateItemsPerPage);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const nextSlide = () => {
    // Move to the next slide or loop back to the first slide
    setCurrentSlide(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(subPackages.length / itemsPerPage)
    );
  };

  const prevSlide = () => {
    // Move to the previous slide or loop back to the last slide
    setCurrentSlide((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(subPackages.length / itemsPerPage) - 1
        : prevIndex - 1
    );
  };

  // Get the current items to display
  const currentItems = subPackages.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  const handleImageClick = (packageId, subPackageId) => {
    navigate(`/subpackages/${packageId}/${subPackageId}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <h2 className="text-[28px] font-semibold mb-2 text-gray-700 text-center mx-auto">
        Spiritual Packages
      </h2>
      <p className="my-2 text-center font-medium text-gray-600">
        Check out these amazing devotional trips
      </p>
      <hr className="border-[3px] max-w-40 text-center mx-auto border-blue-500 mt-1 mb-6 sm:mb-8 rounded-sm" />

      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Error fetching data: {error}</p>
      ) : (
        <div className="relative">
          <div className="overflow-hidden h-auto">
            <div
              className={`grid ${
                itemsPerPage === 1 ? "grid-cols-1" : "grid-cols-2"
              } gap-4 transition-transform duration-500`}
            >
              {currentItems.length > 0 ? (
                currentItems.map((subPackage) => (
                  <div
                    key={subPackage._id}
                    className="w-full h-64 sm:h-96 relative"
                  >
                    <img
                      src={subPackage.imageUrl}
                      alt={subPackage.name}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          "6704c40b9c3b94c80c90748d",
                          subPackage._id
                        )
                      }
                    />
                    <div className="bg-black bg-opacity-50 text-white absolute bottom-0 left-0 w-full p-2 text-center">
                      {subPackage.name}
                    </div>
                  </div>
                ))
              ) : (
                <p>No subpackages available.</p>
              )}
            </div>
          </div>

          {/* Previous and Next buttons */}
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default SpiritualSubPackages;

// Perfectly working fully responsive

// Old code

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSubPackages } from "../redux/subPackagesSlice";

// const SpiritualSubPackages = () => {
//   const dispatch = useDispatch();
//   const {
//     data: subPackages,
//     status,
//     error,
//   } = useSelector((state) => state.subPackages);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 4; // Number of cards to show at once

//   useEffect(() => {
//     // Fetch the subpackages related to the Spiritual Tour Package
//     dispatch(fetchSubPackages("6704c40b9c3b94c80c90748d")); // Package ID for Spiritual Tour
//   }, [dispatch]);

//   const nextSlide = () => {
//     if (currentIndex < Math.ceil(subPackages.length / itemsPerPage) - 1) {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   // Get the current items to display
//   const currentItems = subPackages.slice(
//     currentIndex * itemsPerPage,
//     (currentIndex + 1) * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto my-10  spiritual-sub-packages">
//       <h1 className="text-[28px] font-semibold mb-2 text-gray-700 text-center mx-auto">
//         Spiritual Tour Packages
//       </h1>
//       <p className="text-center mx-auto my-2 text-gray-500 ">
//         Check out these amazing devotional trips
//       </p>

//       {status === "loading" ? (
//         <p>Loading...</p>
//       ) : status === "failed" ? (
//         <p>Error fetching data: {error}</p> // Show the error message
//       ) : (
//         <div className="flex items-center justify-between">
//           <button
//             onClick={prevSlide}
//             disabled={currentIndex === 0}
//             className="p-2 bg-gray-300 rounded-full disabled:opacity-50 ml-4 hidden md:block" // Hide on mobile
//           >
//             &lt; {/* Left Arrow Icon */}
//           </button>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
//             {currentItems.length > 0 ? ( // Check if there are any subPackages
//               currentItems.map((subPackage) => (
//                 <div
//                   key={subPackage._id}
//                   className="card bg-white shadow-lg p-4 rounded-lg"
//                 >
//                   <img
//                     src={subPackage.imageUrl}
//                     alt={subPackage.name}
//                     className="h-48 w-full object-cover rounded"
//                   />
//                   <h2 className="text-lg font-semibold mt-4">
//                     {subPackage.name}
//                   </h2>
//                   <p className="text-gray-600 mt-2">{subPackage.description}</p>
//                   <p className="text-blue-600 mt-2 font-bold">
//                     ₹{subPackage.price}/Person
//                   </p>
//                   <p className="text-gray-500">{subPackage.duration}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No subpackages available.</p> // Handle the case with no subPackages
//             )}
//           </div>

//           <button
//             onClick={nextSlide}
//             disabled={
//               currentIndex >= Math.ceil(subPackages.length / itemsPerPage) - 1
//             }
//             className="p-2 bg-gray-300 rounded-full disabled:opacity-50 mr-4 hidden md:block" // Hide on mobile
//           >
//             &gt; {/* Right Arrow Icon */}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpiritualSubPackages;
