import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubPackageDetails } from "../redux/subPackagesSlice";
import { Link, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Card from "./Card";
import CardShimmer from "../CardShimmer";

const SubPackageDetails = () => {
  const dispatch = useDispatch();
  const { subPackageId } = useParams();

  const subPackageDetails = useSelector(
    (state) => state.subPackages.currentDetails
  );
  const status = useSelector((state) => state.subPackages.status);
  const error = useSelector((state) => state.subPackages.error);

  useEffect(() => {
    if (subPackageId) {
      dispatch(fetchSubPackageDetails(subPackageId));
    } else {
      console.error("subPackageId is undefined");
    }
  }, [dispatch, subPackageId]);

  if (status === "loading") {
    return (
      <div className="container mx-auto mb-28 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
          {[1, 2, 3, 4].map((index) => (
            <CardShimmer key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    console.error("Error fetching sub-package details:", error);
    return <div>Error: {error}</div>;
  }

  if (!subPackageDetails) {
    return <div>No details found.</div>;
  }

  return (
    <div className="container mx-auto mb-28 mt-12">
      {subPackageDetails && (
        <>
          <div className="relative w-full h-52 overflow-hidden ">
            <img
              src={subPackageDetails.imageUrl}
              alt={subPackageDetails.name}
              className="w-full h-[30vh] md:h-full object-cover rounded-sm"
            />
            <div className="absolute inset-0 flex flex-col pt-10 md:pt-12 justify-center items-center text-center text-white">
              <div className="bg-black bg-opacity-35 p-6 sm:p-8 rounded-lg shadow-lg w-full lg:max-w-4xl md:max-w-2xl max-w-xs">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {subPackageDetails.name}
                </h1>
                <p className="text-base flex items-center justify-center">
                  <Link to="/">Home </Link><FaChevronRight className="mx-2" size={16} />{" "}
                  {subPackageDetails.name}
                </p>
              </div>
            </div>
          </div>
          <p className="md:mt-6 mt-6 text-center text-2xl font-semibold text-black">
            {subPackageDetails.name}
          </p>
          
          <p className="mt-4 md:text-center text-start px-6 sm:px-8 md:px-36 mb-10 text-gray-800">
            {subPackageDetails.description}
          </p>

          <h2 className="mt-6 text-xl font-bold text-center mb-2">
            Related Sub-Packages
          </h2>
          <hr className="border-[2px] max-w-56 text-center mx-auto border-blue-500 mt-1 mb-8 sm:mb-8 rounded-sm" />
          {subPackageDetails.relatedSubPackages &&
          subPackageDetails.relatedSubPackages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl mx-auto px-4">
              {subPackageDetails.relatedSubPackages.map((relatedSubPackage) => (
                <Card
                  key={relatedSubPackage._id}
                  imageUrl={relatedSubPackage.imageUrl}
                  title={relatedSubPackage.name}
                  description={relatedSubPackage.description}
                  price={relatedSubPackage.price}
                  duration={relatedSubPackage.duration}
                  onViewDetails={() => {
                    if (relatedSubPackage._id) {
                      window.location.href = `/subpackages/${subPackageId}/${relatedSubPackage._id}`;
                    } else {
                      console.error("relatedSubPackage ID is undefined");
                    }
                  }}
                />
              ))}
            </div>
          ) : (
            <div>No related sub-packages found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default SubPackageDetails;
// Perfectly working and fuly responsive
