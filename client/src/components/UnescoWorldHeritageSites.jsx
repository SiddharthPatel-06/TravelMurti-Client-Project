import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnescoWorldHeritageSites = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const navigate = useNavigate();

  // Static data for UNESCO World Heritage sites
  const subPackages = [
    {
      _id: "1",
      name: "Taj Mahal",
      imageUrl: "https://images.unsplash.com/photo-1526711657229-e7e080ed7aa1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
    },
    {
      _id: "2",
      name: "Elephanta Caves",
      imageUrl: "https://images.unsplash.com/photo-1598026477531-da65d7107277?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2F2ZSUyMGVsZXBoYW50fGVufDB8fDB8fHww",
    },
    {
      _id: "3",
      name: "Qutub Minar",
      imageUrl: "https://plus.unsplash.com/premium_photo-1697730320983-f99aab252a44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UXV0dWIlMjBNaW5hcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      _id: "4",
      name: "Red Fort",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmVkJTIwRm9ydHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      _id: "5",
      name: "Hampi",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661915320026-84ca2c96faa7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGFtcGl8ZW58MHx8MHx8fDA%3D",
    },
    {
      _id: "6",
      name: "Khajuraho Temples",
      imageUrl: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S2hhanVyYWhvJTIwVGVtcGxlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      _id: "7",
      name: "Jantar Mantar, Jaipur",
      imageUrl: "https://plus.unsplash.com/premium_photo-1697730309688-cc2a3a573494?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SmFudGFyJTIwTWFudGFyfGVufDB8fDB8fHww",
    },
    {
      _id: "8",
      name: "Sun Temple, Konark",
      imageUrl: "https://images.unsplash.com/photo-1690313186501-445a6367d7e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U3VuJTIwVGVtcGxlfGVufDB8fDB8fHww",
    },
    // Add more sites as needed
  ];

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth <= 796 ? 1 : 2);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Slide change functions
  const nextSlide = () => {
    setCurrentSlide(
      (prevIndex) =>
        (prevIndex + 1) % Math.ceil(subPackages.length / itemsPerPage)
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(subPackages.length / itemsPerPage) - 1
        : prevIndex - 1
    );
  };

  // Automatic sliding
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);

    return () => clearInterval(slideInterval);
  }, [subPackages, itemsPerPage]);

  // Displayed items for current slide
  const currentItems = subPackages.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  // const handleImageClick = (subPackageId) => {
  //   navigate(`/subpackages/${subPackageId}`);
  // };

  return (
    <div className="max-w-6xl mx-auto px-4 my-10">
      <h2 className="text-[22px] md:text-2xl font-semibold mb-2 text-gray-700 text-center">
        UNESCO World Heritage Sites in India
      </h2>
      <p className="my-2 text-center font-medium text-gray-600">
        Check out these amazing heritage sites
      </p>
      <hr className="border-[3px] max-w-40 text-center mx-auto border-blue-500 mt-1 mb-6 sm:mb-8 rounded-sm" />

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
                    // onClick={() => handleImageClick(subPackage._id)}
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
    </div>
  );
};

export default UnescoWorldHeritageSites;



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
