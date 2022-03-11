import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    email: null,
    avatar: null,
    media: null,
    streamKey: null,
    subscribed: null,
    subscribers: null,
  },
  reducers: {
    getUserInfo(state, action) {
      state.avatar = action.payload.avatar;
      state.username = action.payload.username;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
