import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: '',
    avatar: null
  },
  reducers: {
    getUserInfo(state, action) {
      state.username = action.payload.username;
      state.avatar = action.payload.avatar
    },
  },  
});

export const userActions = userSlice.actions;

export default userSlice;