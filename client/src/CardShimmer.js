import React from "react";

const CardShimmer = () => {
  return (
    <div className="relative mx-auto max-w-xs min-w-[300px] sm:min-w-[300px] md:min-w-[260px] lg:min-w-[280px] p-1 rounded-xl overflow-hidden">
      <div className="relative bg-white shadow-lg flex flex-col items-center rounded-xl w-full max-w-xs md:max-w-md lg:max-w-lg h-full overflow-hidden">
        {/* Image shimmer */}
        <div className="shimmer h-52 w-full rounded-t-lg"></div>

        {/* Text shimmer blocks */}
        <div className="px-4 mt-4 w-full">
          <div className="shimmer h-6 w-3/4 mb-2 rounded"></div>
          <div className="shimmer h-4 w-1/2 mb-2 rounded"></div>
          <div className="shimmer h-6 w-2/3 mb-2 rounded"></div>
        </div>

        {/* Button shimmer */}
        <div className="shimmer h-10 w-1/2 mt-4 mb-4 rounded"></div>
      </div>
    </div>
  );
};

export default CardShimmer;
