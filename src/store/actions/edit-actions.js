import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const editUser = createAsyncThunk(
  "edituser/editUser",
  async ({ body, role, userId }, { getState }) => {
    const response = await fetch(
      `http://127.0.0.1:3001//editprofile/${userId}?role=${role}`,
      {
        method: "POST",
        body: body,
      }
    );

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);

export const editSlice = createSlice({
  name: "edituser",
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
    [editUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [editUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [editUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const editActions = editSlice.actions;
export default editSlice.reducer;
