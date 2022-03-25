import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "./login-slice";
import userSlice from "./user-slice";
import socketSlice from "./socket-slice";
import signup from "./actions/signup-actions";
import workerslist from "./actions/workers-action";
import reviews from "./actions/review-actions";
import chat from "./actions/chat-actions";
import project from "./actions/project-actions";
import myproject from "./actions/myproject-actions";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
    signup,
    workerslist,
    reviews,
    chat,
    project,
    myproject,
  },
  middleware: customizedMiddleware,
});

export default store;
