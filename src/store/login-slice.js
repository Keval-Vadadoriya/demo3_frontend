import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socketActions } from "./socket-slice";
import { userActions } from "./user-slice";

export const loggedInUser = createAsyncThunk(
  "login/loggedInUser",
  async (obj, getState) => {
    const response = await fetch(`${process.env.REACT_APP_HOST}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: obj.loginEmail,
        password: obj.loginPassword,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    } else {
      getState.dispatch(userActions.setLoggedInUser({ user: data.user }));
      getState.dispatch(loginActions.setRole({ role: data.role }));

      getState.dispatch(socketActions.setSocket());

      localStorage.setItem("token", "Bearer " + data.token);
    }
    return data;
  }
);
export const verifyPassword = createAsyncThunk(
  "login/verifyPassword",
  async ({ otp, body }, getState) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/verifyPassword/${otp}`,
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
      // getState.dispatch(userActions.setLoggedInUser({ user: data.user }));
      // getState.dispatch(
      //   loginActions.setToken({ token: "Bearer " + data.token })
      // );
      // localStorage.setItem("token", "Bearer " + data.token);
    }
    return data;
  }
);
export const forgotPassword = createAsyncThunk(
  "login/forgotPassword",
  async ({ body }, getState) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/forgotPassword`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("dfdsk", response.ok);
    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "idle",
    errorMessage: "",
    token: localStorage.getItem("token"),
    role: "",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setRole(state, action) {
      state.role = action.payload.role;
    },
  },
  extraReducers: {
    [loggedInUser.fulfilled]: (state, action) => {
      state.status = "Login Successful";
      state.errorMessage = "";
      state.token = "Bearer " + action.payload.token;
    },
    [loggedInUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [loggedInUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.status = "Sent";
      state.errorMessage = "";
    },
    [forgotPassword.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [forgotPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [verifyPassword.fulfilled]: (state, action) => {
      state.status = "Password Updated Successfully";
      state.errorMessage = "";
    },
    [verifyPassword.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [verifyPassword.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;
