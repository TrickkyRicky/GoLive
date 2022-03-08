import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwtToken: null,
    userIdLogin: null,
  },
  reducers: {
    LoggedIn(state, action) {
      console.log(action.payload);
      state.jwtToken = action.payload.jwt;
      state.userIdLogin = action.payload.userIdLogin;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
