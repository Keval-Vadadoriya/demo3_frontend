import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginActions } from "./login-slice";
import baseURL from "./baseService";

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ body, role, userId }, getState) => {
    const states = getState.getState();

    try {
      const response = await baseURL.patch(
        `/editprofile/${userId}?role=${role}`,
        body
      );

      return response.data;
    } catch (e) {
      throw new Error(e.response.data.Error);
    }
    // const response = await fetch(
    //   `${process.env.REACT_APP_HOST}/editprofile/${userId}?role=${role}`,
    //   {
    //     method: "POST",
    //     body: body,
    //     headers: {
    //       Authorization: states.login.token,
    //     },
    //   }
    // );

    // const data = await response.json();
    // if (response.ok === false) {
    //   throw new Error(data.Error);
    // }
    // return data;
  }
);
export const getUser = createAsyncThunk("user/getUser", async (_, getState) => {
  const states = getState.getState();

  try {
    const response = await baseURL.get(`/getprofile`);

    getState.dispatch(loginActions.setRole({ role: response.data.role }));
    return response.data;
  } catch (e) {
    throw new Error(e.response.data.Error);
  }
  // const response = await fetch(`${process.env.REACT_APP_HOST}/getprofile`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: states.login.token,
  //   },
  // });

  // const data = await response.json();
  // if (response.ok === false) {
  //   throw new Error(data.Error);
  // } else {
  //   getState.dispatch(loginActions.setRole({ role: data.role }));
  // }
  // console.log(data);
  // return data;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "loading data",
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
      state.status = "Saved Changes Successfully";
      state.errorMessage = "";
      state.user = action.payload;
    },
    [editUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [editUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "user data";
      state.errorMessage = "";
      state.user = action.payload.user;
    },
    [getUser.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading data";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
