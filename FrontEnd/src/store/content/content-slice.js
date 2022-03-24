import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    userProfile: null,
    profileLoader: false,
    videoInfo: null,
    categoryNames: [],
    videos: [],
    otherVideos: [],
    comments: [],
    newComment: null,
    showUploadModal: false
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
    setOtherVideos(state, action) {
      state.otherVideos = action.payload
    },
    setVideoInfo(state, action) {
      state.videoInfo = {
        ...action.payload
      }
    },
    addVideoInfo(state, action) {
      state.videoInfo = {
        ...state.videoInfo,
        userId: action.payload
      }
    },
    setCategoryNames(state, action) {
      state.categoryNames = action.payload
    },
    setVideos(state, action) {
      state.videos = action.payload
    },
    setVideoComments(state, action) {
      // console.log(action.payload)
      state.comments = action.payload
    },
    addComment(state, action) {
      // console.log(action.payload)
      state.comments.push(action.payload)
    },
    showUploadModal(state, action) {
      state.showUploadModal = action.payload
    }
  }
});

export const contentActions = contentSlice.actions;

export default contentSlice;
