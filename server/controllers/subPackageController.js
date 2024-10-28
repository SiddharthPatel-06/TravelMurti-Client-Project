const SubPackage = require("../models/SubPackage");
const Package = require("../models/Package");
const { cloudinary } = require("../config/cloudinaryConfig");

// Create SubPackage Function
exports.createSubPackage = async (req, res) => {
  try {
    const mainImage = req.files["mainImage"] ? req.files["mainImage"][0] : null;
    const galleryImages = req.files["galleryImages"] || [];

    const {
      name,
      description,
      price,
      duration,
      packageId,
      isDealOfTheDay,
      introduction,
      tourPlan,
      includeExclude,
      hotelInfo,
      pricingDetails,
      subPackages,
    } = req.body;

    if (!packageId) {
      return res.status(400).json({ message: "Package ID is required" });
    }

    const parentPackage = await Package.findById(packageId);
    const parentSubPackage = await SubPackage.findById(packageId);

    if (!parentPackage && !parentSubPackage) {
      return res
        .status(404)
        .json({ message: "Package or SubPackage not found" });
    }

    const parentId = parentPackage ? parentPackage._id : parentSubPackage._id;
    console.log("Parent ID found:", parentId);

    if (!mainImage) {
      return res.status(400).json({ message: "No main image uploaded" });
    }

    const imageUrl = mainImage.path;
    const galleryImageUrls = galleryImages
      .map((file) => {
        return { url: file.path };
      })
      .filter(Boolean);

    // if (galleryImageUrls.length === 0) {
    //   return res.status(400).json({ message: "Invalid gallery images data" });
    // }

    const subPackage = new SubPackage({
      name: name || "", // Fallback to empty string if missing
      description: description || "",
      price: price || 0, // Fallback to 0 if price is missing
      duration: duration || "", // Fallback to 0 if duration is missing
      packageId: parentId,
      imageUrl,
      isDealOfTheDay: isDealOfTheDay !== undefined ? isDealOfTheDay : false,
      introduction: introduction || "",
      tourPlan: tourPlan || "",
      includeExclude: includeExclude || "",
      hotelInfo: hotelInfo || "",
      galleryImages: galleryImageUrls || [],
      pricingDetails: pricingDetails || [],
      subPackages: subPackages || [],
    });

    await subPackage.save();
    console.log("SubPackage created successfully:", subPackage);

    const updateQuery = {
      $push: { subPackages: subPackage._id },
    };

    if (parentPackage) {
      await Package.findByIdAndUpdate(parentPackage._id, updateQuery);
      console.log("Parent package updated successfully");
    } else if (parentSubPackage) {
      await SubPackage.findByIdAndUpdate(parentSubPackage._id, updateQuery);
      console.log("Parent subpackage updated successfully");
    }

    res.status(201).json(subPackage);
  } catch (error) {
    console.error("Error in createSubPackage:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Fetch all sub-packages for a specific package ID
exports.getSubPackagesByPackageId = async (req, res) => {
  try {
    const { packageId } = req.params;
    const subPackages = await SubPackage.find({ packageId });
    res.status(200).json(subPackages);
  } catch (error) {
    console.error("Error fetching sub-packages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch details for a single sub-package
exports.getSubPackageDetails = async (req, res) => {
  try {
    const { subPackageId } = req.params;
    const subPackage = await SubPackage.findById(subPackageId);
    if (!subPackage) {
      return res.status(404).json({ message: "SubPackage not found" });
    }
    res.status(200).json(subPackage);
  } catch (error) {
    console.error("Error fetching sub-package details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all packages
exports.getAllSubPackages = async (req, res) => {
  try {
    const subPackages = await SubPackage.find();
    res.json(subPackages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Create 100 SubPackage at a time
// exports.createSubPackage = async (req, res) => {
//   try {
//     const { baseName, description, price, duration, packageId, isDealOfTheDay } = req.body;

//     // Check if we are creating a sub-package or sub-package of a sub-package
//     const parentPackage = await Package.findById(packageId); // Check if it's a parent package
//     const parentSubPackage = await SubPackage.findById(packageId); // Check if it's a sub-package

//     if (!parentPackage && !parentSubPackage) {
//       return res.status(404).json({ message: "Package or SubPackage not found" });
//     }

//     // Determine which ID we are using for the new sub-packages
//     const parentId = parentPackage ? parentPackage._id : parentSubPackage._id;

//     // Check if file is uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: "No image uploaded" });
//     }

//     const imageUrl = req.file.path; // URL from file upload

//     // Create an array to hold promises for all sub-packages
//     const subPackagePromises = [];

//     for (let i = 0; i < 100; i++) {
//       // Create the sub-package data
//       const subPackageData = {
//         name: `${baseName} ${i + 1}`, // Generate unique name for each sub-package
//         description,
//         price,
//         duration,
//         packageId: parentId, // Set the packageId to the correct parent
//         imageUrl,
//         isDealOfTheDay: isDealOfTheDay !== undefined ? isDealOfTheDay : false,
//       };

//       // Create a new sub-package instance and save it
//       const subPackage = new SubPackage(subPackageData);
//       subPackagePromises.push(subPackage.save());
//     }

//     // Execute all save promises in parallel
//     const subPackages = await Promise.all(subPackagePromises);

//     // Update the parent package or sub-package to include these new sub-packages
//     if (parentPackage) {
//       parentPackage.subPackages.push(...subPackages.map(sp => sp._id));
//       await parentPackage.save();
//     } else if (parentSubPackage) {
//       parentSubPackage.subPackages.push(...subPackages.map(sp => sp._id));
//       await parentSubPackage.save();
//     }

//     res.status(201).json(subPackages);
//   } catch (error) {
//     console.error("Error in createSubPackage:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// Update a sub-package
exports.updateSubPackage = async (req, res) => {
  try {
    const subPackageId = req.params.id;

    // Find the sub-package by ID
    const existingSubPackage = await SubPackage.findById(subPackageId);
    if (!existingSubPackage) {
      return res.status(404).json({ message: "SubPackage not found" });
    }

    // Build the updates object with only the provided fields
    const updates = {};

    // Update each field if it's provided in the request body
    if (req.body.name) updates.name = req.body.name;
    if (req.body.description) updates.description = req.body.description;
    if (req.body.price) updates.price = req.body.price;
    if (req.body.duration) updates.duration = req.body.duration;
    if (req.body.packageId) updates.packageId = req.body.packageId;

    // Handle boolean field separately to allow 'false' value
    if (typeof req.body.isDealOfTheDay !== "undefined")
      updates.isDealOfTheDay = req.body.isDealOfTheDay;

    if (req.body.introduction) updates.introduction = req.body.introduction;
    if (req.body.tourPlan) updates.tourPlan = req.body.tourPlan;
    if (req.body.includeExclude)
      updates.includeExclude = req.body.includeExclude;
    if (req.body.hotelInfo) updates.hotelInfo = req.body.hotelInfo;

    // Handle galleryImages update (merge with existing if needed)
    if (req.body.galleryImages && req.body.galleryImages.length > 0) {
      updates.galleryImages = [
        ...existingSubPackage.galleryImages,
        ...req.body.galleryImages,
      ];
    }

    // Handle pricingDetails update (merge with existing if needed)
    if (req.body.pricingDetails && req.body.pricingDetails.length > 0) {
      updates.pricingDetails = [
        ...existingSubPackage.pricingDetails,
        ...req.body.pricingDetails,
      ];
    }

    if (req.body.subPackages) updates.subPackages = req.body.subPackages;

    // Handle image update if a new file is uploaded (single file)
    if (req.file) {
      updates.imageUrl = req.file.path;
    }

    // Update the sub-package with new data
    const updatedSubPackage = await SubPackage.findByIdAndUpdate(
      subPackageId,
      { $set: updates },
      { new: true }
    );

    res.status(200).json(updatedSubPackage);
  } catch (error) {
    console.error("Error in updateSubPackage:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a sub-package
exports.deleteSubPackage = async (req, res) => {
  try {
    const deletedSubPackage = await SubPackage.findByIdAndDelete(req.params.id);
    if (!deletedSubPackage)
      return res.status(404).json({ message: "SubPackage not found" });
    res.json({ message: "SubPackage deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Deal of the Day
exports.getDealOfTheDay = async (req, res) => {
  try {
    // Fetch all SubPackages that are marked as Deal of the Day
    const dealOfTheDay = await SubPackage.find({ isDealOfTheDay: true });

    if (dealOfTheDay.length === 0) {
      return res.status(404).json({ message: "No Deal of the Day found" });
    }

    res.status(200).json(dealOfTheDay);
  } catch (error) {
    console.error("Error in getDealOfTheDay:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to get the latest tour packages with isDealOfTheDay set to true
exports.getLatestTourPackages = async (req, res) => {
  try {
    // Fetch all sub-packages where isDealOfTheDay is true
    const latestSubPackages = await SubPackage.find({
      isDealOfTheDay: true, // Filter for packages marked as Deal of the Day
    })
      .sort({ createdAt: -1 }) // Sort by creation date (latest first)
      .limit(4); // Limit to the 4 latest tour packages

    // Return the fetched data
    res.json({
      success: true,
      message: "Latest Deal of the Day tour packages retrieved successfully!",
      data: latestSubPackages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving latest Deal of the Day tour packages",
      error: error.message,
    });
  }
};
