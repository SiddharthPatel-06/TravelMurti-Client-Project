// src/redux/subPackagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch subpackages
export const fetchSubPackages = createAsyncThunk(
  'subPackages/fetchSubPackages',
  async (packageId) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/subPackages/package/${packageId}`);
    return response.data; // Return the fetched data
  }
);

// Thunk to fetch a single subpackage's details along with related sub-packages
export const fetchSubPackageDetails = createAsyncThunk(
  'subPackages/fetchSubPackageDetails',
  async (subPackageId) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/subPackages/${subPackageId}`);
    const subPackageData = response.data;

    // Check if there are related sub-packages and fetch their details
    if (subPackageData.subPackages && subPackageData.subPackages.length > 0) {
      // Fetch details of each related sub-package
      const relatedSubPackagesPromises = subPackageData.subPackages.map(async (id) => {
        const relatedResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/subPackages/${id}`);
        return relatedResponse.data;
      });

      // Wait for all related sub-package details to be fetched
      const relatedSubPackages = await Promise.all(relatedSubPackagesPromises);
      
      // Add the fetched related sub-packages to the main data
      subPackageData.relatedSubPackages = relatedSubPackages;
    } else {
      subPackageData.relatedSubPackages = [];
    }

    return subPackageData;
  }
);


const subPackagesSlice = createSlice({
  name: 'subPackages',
  initialState: {
    data: [], // List of sub-packages
    currentDetails: null, // To hold details of the current sub-package
    status: 'idle', // Status for fetching the list of sub-packages
    detailsStatus: 'idle', // Status for fetching sub-package details
    error: null,
  },
  reducers: {}, // No synchronous reducers for now
  extraReducers(builder) {
    builder
      // For fetching the list of sub-packages
      .addCase(fetchSubPackages.pending, (state) => {
        state.status = 'loading'; // Set status to loading when fetching
      })
      .addCase(fetchSubPackages.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when fetching is done
        state.data = action.payload; // Update state with fetched data
      })
      .addCase(fetchSubPackages.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed if there's an error
        state.error = action.error.message; // Capture the error message
      })

      // For fetching details of a single sub-package
      .addCase(fetchSubPackageDetails.pending, (state) => {
        state.detailsStatus = 'loading'; // Set status to loading when fetching details
      })
      .addCase(fetchSubPackageDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded'; // Set status to succeeded when fetching details is done
        state.currentDetails = action.payload; // Update state with the fetched details
      })
      .addCase(fetchSubPackageDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed'; // Set status to failed if there's an error
        state.error = action.error.message; // Capture the error message
      });
  },
});

// Export the reducer as default
export default subPackagesSlice.reducer;

// If needed, you can export the thunks like this
// export { fetchSubPackages, fetchSubPackageDetails };
