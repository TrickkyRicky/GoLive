import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: '',
    avatar: null,
    subscribed: []
  },
  reducers: {
    getUserInfo(state, action) {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.subscribed = action.payload.subscribed.users;
    },
    setSubscribed(state, action) {
      state.subscribed = action.payload;
    }
  },  
}); 

export const userActions = userSlice.actions;

export default userSlice;