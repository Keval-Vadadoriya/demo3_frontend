import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const loggedInUser = createAsyncThunk(
  "loginuser/loggedInUser",
  async (obj, { getState }) => {
    // console.log(obj.role, obj.loginEmail, obj.loginPassword);
    const response = await fetch(
      `http://127.0.0.1:3001/login?role=${obj.role}`,
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
    }
    return data;
  }
);

export const loginuserSlice = createSlice({
  name: "loginuser",
  initialState: {
    status: "idle",
    errorMessage: "",
    user: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = null;
    },
  },
  extraReducers: {
    [loggedInUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    },
    [loggedInUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loggedInUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const loginuserActions = loginuserSlice.actions;
export default loginuserSlice.reducer;
