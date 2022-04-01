import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async ({ skip }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/getallprojects?limit=5&&skip=${skip}`,
      {
        headers: {
          Authorization: states.login.token,
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
export const getMyProjects = createAsyncThunk(
  "project/getMyProjects",
  async ({ skip }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/getmyprojects?limit=5&&skip=${skip}`,
      {
        headers: {
          Authorization: states.login.token,
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

export const filterProjects = createAsyncThunk(
  "project/filterProjects",
  async ({ location, profession, money, skip }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/filterprojects?${
        location !== "none" ? `location=${location}` : ""
      }${profession !== "none" ? `&&profession=${profession}` : ""}${
        money ? `&&money=${money}` : ""
      }&&limit=5&&skip=${skip}`,

      {
        headers: {
          Authorization: states.login.token,
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

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    status: "idle",
    errorMessage: "",
    projects: [],
    count: 0,
  },
  reducers: {},
  extraReducers: {
    //getAllWorkers
    [getAllProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";

      state.projects = action.payload.projects;
      state.count = action.payload.count;
    },
    [getAllProjects.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getAllProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    //filter Workers
    [filterProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.projects = action.payload.projects;
      state.count = action.payload.count;
    },
    [filterProjects.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [filterProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
      state.workers = null;
    },
    //get Worker
    [getMyProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.projects = action.payload.myProjects;
      state.count = action.payload.count;
    },
    [getMyProjects.pending]: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getMyProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice.reducer;
