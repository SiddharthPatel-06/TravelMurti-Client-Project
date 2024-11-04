import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubPackages } from "../redux/subPackagesSlice";
import { useNavigate } from "react-router-dom";
import Card from "./Card"; // Import the Card component

const SpiritualSubPackages = () => {
  const dispatch = useDispatch();
  const { data: subPackages, status, error } = useSelector(
    (state) => state.subPackages
  );
  const navigate = useNavigate();

  // Fetch data
  useEffect(() => {
    dispatch(fetchSubPackages("6718db46c8039b655f222f5d"));
  }, [dispatch]);

  // Handles 'View Details' button logic
  const handleViewDetails = (subPackageId) => {
    navigate(`/subPackages/${subPackageId}`);
  };

  // Get the last 4 items
  const lastFourSubPackages = subPackages.slice(-4);

  return (
    <div className="container mx-auto my-6">
      <h1 className="text-[22px] md:text-2xl font-semibold mb-2 text-gray-700 text-center mx-auto">
        Spiritual Packages
      </h1>
      <p className="text-center mx-auto my-2 text-gray-600">
        Check out these amazing devotional trips
      </p>
      <hr className="border-[3px] max-w-40 text-center mx-auto border-blue-500 mt-1 mb-6 sm:mb-8 rounded-sm" />

      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "failed" ? (
        <p>Error fetching data: {error}</p>
      ) : lastFourSubPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
          {lastFourSubPackages.map((subPackage) => (
            <Card
              key={subPackage._id}
              imageUrl={subPackage.imageUrl}
              title={subPackage.name}
              price={subPackage.price}
              duration={subPackage.duration}
              onViewDetails={() => handleViewDetails(subPackage._id)}
            />
          ))}
        </div>
      ) : (
        <p>No subpackages available at the moment.</p>
      )}
    </div>
  );
};

export default SpiritualSubPackages;
































// import React from 'react';

// // Sample data for images
// const images = [
//   {
//     title: "Hawa Mehal",
//     url: "https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGF3YSUyMG1laGFsfGVufDB8fDB8fHww",
//     width: "400px",
//   },
//   {
//     title: "Nepal",
//     url: "https://images.unsplash.com/photo-1542955001-ff91d5369658?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHRlbXBsZXxlbnwwfHwwfHx8MA%3D%3D",
//     width: "400px",
//   },
//   {
//     title: "Birla Temple",
//     url: "https://plus.unsplash.com/premium_photo-1691031429084-894ffad104ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGJpcmxhJTIwdGVtcGxlfGVufDB8fDB8fHww",
//     width: "400px",
//   },
//   // Add more images as needed
// ];

// const JaipurTempleTour = () => {
//   return (
//     <div className="my-8 text-center">
//       <h2 className="text-[22px] md:text-2xl font-semibold mb-2 text-gray-700 text-center mx-auto">Jaipur Temple Tour</h2>
//       <p className="mt-3 mb-1 font-medium text-gray-600">
//         Check out these amazing devotional trips
//       </p>
//       <hr className="border-[3px] max-w-40 text-center mx-auto border-blue-500 mt-1 mb-6 sm:mb-8 rounded-sm" />

//       <div className="flex flex-wrap justify-center p-2">
//         {images.map((image) => (
//           <div
//             key={image.title}
//             className="relative m-[4px] group"
//             style={{
//               width: image.width,
//               height: '300px',
//             }}
//           >
//             {/* Background Image */}
//             <div
//               className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-90 group-hover:opacity-100"
//               style={{ backgroundImage: `url(${image.url})` }}
//             />
            
//             {/* Dark Overlay (initially dark) */}
//             <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 group-hover:opacity-20" />
            
//             {/* Title and hover effect */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-white text-lg font-semibold p-4 relative group-hover:border group-hover:border-white group-hover:py-3 group-hover:px-5 transition-all duration-300">
//                 {image.title}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JaipurTempleTour;
