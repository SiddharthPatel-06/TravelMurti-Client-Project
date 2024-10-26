// src/redux/slices/dealSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching deal of the day
export const fetchDealOfTheDay = createAsyncThunk(
  'deal/fetchDealOfTheDay',
  async () => {
    const response = await axios.get('http://localhost:4000/api/deals-of-the-day');
    return response.data.deal;
  }
);

const dealSlice = createSlice({
  name: 'deal',
  initialState: {
    deal: null,
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDealOfTheDay.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDealOfTheDay.fulfilled, (state, action) => {
        state.deal = action.payload;
        state.loading = false;
      })
      .addCase(fetchDealOfTheDay.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default dealSlice.reducer;
