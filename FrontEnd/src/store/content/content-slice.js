import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    userProfile: null,
    profileLoader: false,
    videoInfo: null
  },
  reducers: {
    userProfile(state, action) {
      state.userProfile = {
        ...action.payload
      }
    },
    profileLoader(state, action) {
      state.profileLoader = action.payload
    },
    setVideoInfo(state, action) {
      state.videoInfo = {
        ...action.payload
      }
    }
  }
});

export const contentActions = contentSlice.actions;

export default contentSlice;
