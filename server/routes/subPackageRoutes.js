const express = require("express");
const {
  getSubPackagesByPackageId,
  getSubPackageDetails,
  createSubPackage,
  updateSubPackage,
  deleteSubPackage,
  getDealOfTheDay,
  getLatestTourPackages,
  getAllSubPackages
} = require("../controllers/subPackageController");
const { upload } = require("../config/cloudinaryConfig");
const { auth, checkPermissions } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to fetch latest tour packages
router.get("/latest-tour-packages", getLatestTourPackages);

// Route to get Deal of the Day
router.get("/deal-of-the-day", getDealOfTheDay);


// Define routes for SubPackages

router.get("/", getAllSubPackages);
router.post(
  "/create",
  auth,
  checkPermissions("canCreateSubPackages"),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  createSubPackage
);

router.get("/package/:packageId", getSubPackagesByPackageId);
router.get("/:subPackageId", getSubPackageDetails);
router.put("/:id", auth, checkPermissions('canUpdateSubPackages'), upload.single("imageUrl"), updateSubPackage);
router.delete("/:id", auth, checkPermissions('canDeleteSubPackages'), deleteSubPackage);

module.exports = router;

// // Route to get Deal of the Day
// router.get("/deal-of-the-day", getDealOfTheDay);

// // Define routes for SubPackages
// router.get("/package/:packageId", getSubPackagesByPackageId); // GET all sub-packages for a specific package
// router.get("/:subPackageId", getSubPackageDetails); // GET a specific sub-package by ID
// router.post(
//   "/create",
//   upload.fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "galleryImages", maxCount: 10 },
//   ]),
//   createSubPackage
// ); // POST to create a new sub-package for a package
// router.put("/:id", updateSubPackage); // PUT to update a sub-package
// router.delete("/:id", deleteSubPackage); // DELETE a sub-package

// module.exports = router;

// //
