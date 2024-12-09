import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    role: "",
    authToken: null,
    canCreatePackages: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.role = action.payload.role;
      state.user.authToken = action.payload.token;
    },

    logoutUser: (state) => {
      state.user = { role: "", authToken: null };
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
