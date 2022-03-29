import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyProjects } from "./project-actions";
import { host } from "../../config";
export const removeProject = createAsyncThunk(
  "myproject/removeProject",
  async ({ projectId }, getState) => {
    const states = getState.getState();

    const response = await fetch(`${host}/removeproject/${projectId}`, {
      method: "DELETE",

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

export const postProject = createAsyncThunk(
  "myproject/postProject",
  async (
    { project_name, description, profession, location, money },
    getState
  ) => {
    const states = getState.getState();
    console.log(states);
    const response = await fetch(`${host}/project`, {
      method: "POST",
      body: JSON.stringify({
        project_name,
        description,
        profession,
        location,
        money,
      }),
      headers: {
        Authorization: states.login.token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    } else {
      getState.dispatch(getMyProjects({ skip: 0 }));
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
