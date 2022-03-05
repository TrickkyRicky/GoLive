import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/auth-slice.js";
import contentSlice from "./content/content-slice.js";
import userSlice from "./user/user-slice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    content: contentSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
