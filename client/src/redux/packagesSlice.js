import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch packages from backend
export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => {
    const response = await axios.get('http://localhost:4000/api/packages');
    return response.data;
  }
);

const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    packages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default packagesSlice.reducer;
