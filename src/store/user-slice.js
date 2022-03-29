import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginActions } from "./login-slice";
import { host } from "../config";

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ body, role, userId }, getState) => {
    const states = getState.getState();

    const response = await fetch(`${host}/editprofile/${userId}?role=${role}`, {
      method: "POST",
      body: body,
      headers: {
        Authorization: states.login.token,
      },
    });

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);
export const getUser = createAsyncThunk("user/getUser", async (_, getState) => {
  const states = getState.getState();

  const response = await fetch(`${host}/getprofile`, {
    method: "GET",
    headers: {
      Authorization: states.login.token,
    },
  });

  const data = await response.json();
  if (response.ok === false) {
    throw new Error(data.Error);
  } else {
    getState.dispatch(loginActions.setRole({ role: data.role }));
  }
  console.log(data);
  return data;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    errorMessage: "",
    user: {},
  },

  reducers: {
    setLoggedInUser(state, action) {
      state.user = action.payload.user;
    },
    setStatus(state, action) {
      state.status = "idle";
    },
  },
  extraReducers: {
    [editUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [editUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [editUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
    },
    [getUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
