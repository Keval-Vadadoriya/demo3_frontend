import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { socketActions } from "./socket-slice";
import { userActions } from "./user-slice";
export const loggedInUser = createAsyncThunk(
  "login/loggedInUser",
  async (obj, getState) => {
    const states = getState.getState();
    console.log(getState);
    const response = await fetch(
      `http://192.168.200.175:3001/login?role=${obj.role}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: obj.loginEmail,
          password: obj.loginPassword,
        }),

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

      getState.dispatch(socketActions.setSocket());

      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", states.login.role);
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
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "user",
  },
  reducers: {
    setLoginStatus(state, action) {
      state.token = action.payload.token;
    },
    setRole(state, action) {
      state.role = action.payload.role;
    },
  },
  extraReducers: {
    [loggedInUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.token = "Bearer " + action.payload.token;
      // state.user = action.payload;
    },
    [loggedInUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [loggedInUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
