import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./login-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: { login: loginSlice.reducer, user: userSlice.reducer },
});

export default store;
