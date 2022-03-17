import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    userProfile: null,
    profileLoader: false,
    videoInfo: null,
    categoryNames: []
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
    },
    setCategoryNames(state, action) {
      state.categoryNames = action.payload
    }
  }
});

export const contentActions = contentSlice.actions;

export default contentSlice;
