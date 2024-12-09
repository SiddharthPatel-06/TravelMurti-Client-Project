import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubPackages = createAsyncThunk(
  "subPackages/fetchSubPackages",
  async (packageId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/subPackages/package/${packageId}`
    );
    return response.data;
  }
);

export const fetchSubPackageDetails = createAsyncThunk(
  "subPackages/fetchSubPackageDetails",
  async (subPackageId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/subPackages/${subPackageId}`
    );
    const subPackageData = response.data;

    if (subPackageData.subPackages && subPackageData.subPackages.length > 0) {
      const relatedSubPackagesPromises = subPackageData.subPackages.map(
        async (id) => {
          const relatedResponse = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/subPackages/${id}`
          );
          return relatedResponse.data;
        }
      );

      const relatedSubPackages = await Promise.all(relatedSubPackagesPromises);

      subPackageData.relatedSubPackages = relatedSubPackages;
    } else {
      subPackageData.relatedSubPackages = [];
    }

    return subPackageData;
  }
);

const subPackagesSlice = createSlice({
  name: "subPackages",
  initialState: {
    data: [],
    currentDetails: null,
    status: "idle",
    detailsStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(fetchSubPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSubPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchSubPackageDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchSubPackageDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.currentDetails = action.payload;
      })
      .addCase(fetchSubPackageDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default subPackagesSlice.reducer;
