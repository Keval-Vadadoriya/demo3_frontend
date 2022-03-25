import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userActions } from "../user-slice";
import { loginActions } from "../login-slice";
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async ({ body, role }, getState) => {
    const response = await fetch(
      `http://192.168.200.175:3001/signup?role=${role}`,
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
    } else {
      getState.dispatch(userActions.setLoggedInUser({ user: data.user }));
      getState.dispatch(
        loginActions.setLoginStatus({ token: "Bearer " + data.token })
      );
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
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
