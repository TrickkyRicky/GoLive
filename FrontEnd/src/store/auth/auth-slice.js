import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwtToken: null,
    userIdLogin: null,
    isAuth: false,
  },
  reducers: {
    LoggedIn(state, action) {
      state.jwtToken = action.payload.jwt;
      state.userIdLogin = action.payload.userIdLogin;
      state.isAuth = true;
    },
    LoggedOut(state, action) {
      state.jwtToken = null;
      state.userIdLogin = null;
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
