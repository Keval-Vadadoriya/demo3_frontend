import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "../user-slice";
import { loginActions } from "../login-slice";
import baseService from "../baseService";

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ body, role }, getState) => {
    try {
      const response = await baseService.post(`/signup?role=${role}`);

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);
export const verifyUser = createAsyncThunk(
  "signup/verifyUser",
  async ({ otp }, getState) => {
    try {
      const response = await baseService.post(`/verify/${otp}`);

      getState.dispatch(
        userActions.setLoggedInUser({ user: response.data.user })
      );
      getState.dispatch(
        loginActions.setToken({ token: "Bearer " + response.data.token })
      );
      baseService.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      localStorage.setItem("token", "Bearer " + response.data.token);
      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    status: "idle",
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "Signup Successful";
    },
    [signupUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [verifyUser.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "Verification Successful";
    },
    [verifyUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [verifyUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
