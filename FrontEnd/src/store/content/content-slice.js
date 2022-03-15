import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    userProfile: null,
    profileLoader: false
  },
  reducers: {
    userProfile(state, action) {
      state.userProfile = {
        ...action.payload
      }
    },
    profileLoader(state, action) {
      state.profileLoader = action.payload
    }
  },
});

export const contentActions = contentSlice.actions;

export default contentSlice;
