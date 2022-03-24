import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const removeProject = createAsyncThunk(
  "myproject/removeProject",
  async ({ token, projectId }, { getState }) => {
    const response = await fetch(
      `http://192.168.200.175:3001/removeproject/${projectId}`,
      {
        method: "DELETE",

        headers: {
          Authorization: token,
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

export const postProject = createAsyncThunk(
  "myproject/postProject",
  async (
    { token, project_name, description, profession, location, money },
    { getState }
  ) => {
    const response = await fetch(`http://192.168.200.175:3001/project`, {
      method: "POST",
      body: JSON.stringify({
        project_name,
        description,
        profession,
        location,
        money,
      }),
      headers: {
        Authorization: token,
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

export const myprojectSlice = createSlice({
  name: "myproject",
  initialState: {
    status: "idle",
    errorMessage: "",
    project: null,
  },
  reducers: {},
  extraReducers: {
    [removeProject.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.reviews = action.payload;
    },
    [removeProject.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [removeProject.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [postProject.fulfilled]: (state, action) => {
      state.status = "review added";
      state.errorMessage = "";
    },
    [postProject.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [postProject.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export default myprojectSlice.reducer;
