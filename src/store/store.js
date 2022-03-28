import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import login from "./login-slice";
import user, { getUser } from "./user-slice";
import socket from "./socket-slice";
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
    login,
    user,
    socket,
    signup,
    workerslist,
    reviews,
    chat,
    project,
    myproject,
  },
  middleware: customizedMiddleware,
});
console.log(store.getState());
if (store.getState().login.token) {
  store.dispatch(getUser());
}
export default store;
