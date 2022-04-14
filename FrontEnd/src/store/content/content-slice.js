import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: {
    userProfile: null,
    profileLoader: false,
    videoInfo: null,
    categories: [],
    listShow: false,
    videos: [],
    otherVideos: [],
    likedVideos: [],
    comments: [],
    newComment: null,
    showUploadModal: false,
    subscribed: false,
    liked: false,
    latestVideos: [],
    popularUploads: []
  },
  reducers: {
    setPopularUploads(state, action) {
      state.popularUploads = action.payload
    },
    setLatestVideos(state, action) {
      state.latestVideos = action.payload
    },
    listShow(state, action) {
      state.listShow = action.payload
    },
    liked(state, action) {
      state.liked = action.payload
    },
    subscribed(state, action) {
      state.subscribed = action.payload
    },
    userProfile(state, action) {
      state.userProfile = {
        ...state.userProfile,
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
    setCategories(state, action) {
      state.categories = action.payload
    },
    setVideos(state, action) {
      state.videos = action.payload
    },
    setLikedVideos(state, action) {
      state.likedVideos = action.payload
    },
    setVideoComments(state, action) { 
      state.comments = action.payload
    },
    addComment(state, action) {
      state.comments.push(action.payload)
    },
    deleteComment(state, action) {
      let index = state.comments.indexOf(action.payload);
      state.comments.splice(index, 1);
    },
    showUploadModal(state, action) {
      state.showUploadModal = action.payload
    }
  }
});

export const contentActions = contentSlice.actions;

export default contentSlice;
