import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const signupUser = createAsyncThunk(
  "signupuser/signupUser",
  async ({ body, role }, { getState }) => {
    // console.log(obj.role, obj.loginEmail, obj.loginPassword);
    const response = await fetch(`http://127.0.0.1:3001/signup?role=${role}`, {
      method: "POST",
      // body: body,
      body: JSON.stringify(body),

      headers: {
        // Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);

export const signupSlice = createSlice({
  name: "signupuser",
  initialState: {
    status: "idle",
    errorMessage: "",
    // user: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = "idle";
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [signupUser.pending]: (state, action) => {
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
