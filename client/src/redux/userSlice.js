// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: {
    role: '', // Default empty role
    authToken: null, // To store the token
    canCreatePackages: false,
    // Add more user-related properties here
  },
};

// Create user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data and token
    setUser: (state, action) => {
      state.user.role = action.payload.role; // Set role
      state.user.authToken = action.payload.token; // Set authToken
    },
    // Action to log out user
    logoutUser: (state) => {
      state.user = { role: '', authToken: null }; // Reset user and token
    },
  },
});

// Export actions
export const { setUser, logoutUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
