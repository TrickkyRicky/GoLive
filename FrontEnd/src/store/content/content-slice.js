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
    likedVideos: [],
    comments: [],
    newComment: null,
    showUploadModal: false,
    subscribed: false,
    liked: false
  },
  reducers: {
    liked(state, action) {
      state.liked = action.payload
    },
    subscribed(state, action) {
      state.subscribed = action.payload
    },
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
    addVideoLikes(state, action) {
      state.videoInfo.likes.push(action.payload)
    },
    removeVideoLikes(state, action) {
      let index = state.videoInfo.likes.indexOf(action.payload);
      state.videoInfo.likes.splice(index, 1);
    },
    setCategoryNames(state, action) {
      state.categoryNames = action.payload
    },
    setVideos(state, action) {
      state.videos = action.payload
    },
    setLikedVideos(state, action) {
      state.likedVideos = action.payload
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
