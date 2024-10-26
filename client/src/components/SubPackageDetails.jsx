import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubPackageDetails } from "../redux/subPackagesSlice";
import { useParams } from "react-router-dom";
import Card from "./Card";

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
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    console.error("Error fetching sub-package details:", error);
    return <div>Error: {error}</div>;
  }

  if (!subPackageDetails) {
    return <div>No details found.</div>;
  }

  return (
    <div className="container mx-auto p-4 mb-28 mt-12">
      {subPackageDetails && (
        <>
          <div className="relative w-full h-64 overflow-hidden">
            <img
              src={subPackageDetails.imageUrl}
              alt={subPackageDetails.name}
              className="w-full h-full object-cover"
            />
            <h1 className="absolute inset-0 flex justify-center items-center text-center text-white text-3xl font-bold">
              {subPackageDetails.name}
            </h1>
          </div>
          <p className="mt-4 text-center text-2xl font-semibold text-black">
            {subPackageDetails.name}
          </p>
          <p className="mt-4 text-center px-4 sm:px-8 md:px-36 mb-10 text-gray-800">
            {subPackageDetails.description}
          </p>

          <h2 className="mt-6 text-xl font-bold text-center mb-10">Related Sub-Packages</h2>
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