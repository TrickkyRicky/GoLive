import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      subscribed: {
        users: []
      },
      media: {
        videos: []
      }
    },
    id: ""
  },
  reducers: {
    setUserInfo(state, action) {
      state.user = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    updateVideo(state, action) {
      let index = state.user.media.videos.findIndex(video => video._id == action.payload._id);

      state.user.media.videos[index] = action.payload;
    },
    deleteVideo(state, action) {
      let index = state.user.media.videos.findIndex(video => video._id == action.payload._id);
      
      state.user.media.videos.splice(index, 1);
    },
    removeSubscriber(state, action) {
      let index = state.user.subscribed.users.indexOf(action.payload);
      state.user.subscribed.users.splice(index, 1)
    }
  },  
}); 

export const userActions = userSlice.actions;

export default userSlice;