import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "../user-slice";
import { loginActions } from "../login-slice";

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ body, role }, getState) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/signup?role=${role}`,
      {
        method: "POST",
        body: JSON.stringify(body),

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);
export const verifyUser = createAsyncThunk(
  "signup/verifyUser",
  async ({ otp }, getState) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/verify/${otp}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    } else {
      getState.dispatch(userActions.setLoggedInUser({ user: data.user }));
      getState.dispatch(
        loginActions.setToken({ token: "Bearer " + data.token })
      );
      localStorage.setItem("token", "Bearer " + data.token);
    }
    return data;
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
      state.status = "succeeded";
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
      state.status = "succeeded";
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
