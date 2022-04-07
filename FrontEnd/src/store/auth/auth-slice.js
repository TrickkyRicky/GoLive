import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwtToken: null,
    userIdLogin: null,
    isAuth: false,
    redirect: false
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
    redirectLogin(state, action) {
      state.redirect = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
