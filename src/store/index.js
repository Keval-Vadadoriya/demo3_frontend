import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import userSlice from "./user-slice";
import socketSlice from "./socket-slice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
  },
});

export default store;
