import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import userSlice from "./user-slice";
import socketSlice from "./socket-slice";
import loginuser from "./actions/login-actions";
import signupuser from "./actions/signup-actions";
import workerslist from "./actions/workers-action";
import reviews from "./actions/review-actions";
import chat from "./actions/chat-actions";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
    loginuser,
    signupuser,
    workerslist,
    reviews,
    chat,
  },
  middleware: customizedMiddleware,
});

export default store;
