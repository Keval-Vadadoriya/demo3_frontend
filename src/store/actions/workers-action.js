import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getAllWorkers = createAsyncThunk(
  "workers/getAllWorkers",
  async ({ skip }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `http://192.168.200.175:3001/getallworkers?limit=3&&skip=${skip}`,
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
export const getWorker = createAsyncThunk(
  "workers/getWorker",
  async ({ workerId }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `http://192.168.200.175:3001/getworker/${workerId}`,
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

export const filterWorkers = createAsyncThunk(
  "workers/filterWorkers",
  async ({ location, profession, review, availability, skip }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `http://192.168.200.175:3001/filterworkers?${
        location !== "none" ? `location=${location}&&` : ""
      }${profession !== "none" ? `profession=${profession}&&` : ""}${
        review !== "none" ? `review=${review}&&` : ""
      }${
        availability !== "none" ? `availability=${availability}&&` : ""
      }limit=3&&${skip ? `skip=${skip}` : ""}`,

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

export const workersSlice = createSlice({
  name: "workers",
  initialState: {
    status: "idle",
    errorMessage: "",
    workers: null,
    worker: null,
    count: null,
  },
  reducers: {},
  extraReducers: {
    //getAllWorkers
    [getAllWorkers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";

      state.workers = action.payload.workers;
      console.log(action.payload.count);
      if (action.payload.count !== null) {
        state.count = action.payload.count;
      }
    },
    [getAllWorkers.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getAllWorkers.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    //filter Workers
    [filterWorkers.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "succeeded";
      state.workers = action.payload.workers;
      if (action.payload.count !== null) {
        state.count = action.payload.count;
      }
    },
    [filterWorkers.pending]: (state, action) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [filterWorkers.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
      state.workers = null;
    },
    //get Worker
    [getWorker.fulfilled]: (state, action) => {
      state.errorMessage = "";
      state.status = "succeeded";
      state.worker = action.payload;
    },
    [getWorker.pending]: (state) => {
      state.errorMessage = "";
      state.status = "loading";
    },
    [getWorker.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export const workersActions = workersSlice.actions;
export default workersSlice.reducer;
