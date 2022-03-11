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
      state = { ...state, ...action.payload };
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
