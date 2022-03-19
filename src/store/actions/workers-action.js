import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getAllWorkers = createAsyncThunk(
  "workers/getAllWorkers",
  async (_, { getState }) => {
    const response = await fetch(`http://127.0.0.1:3001/getallworkers`);

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);
export const getWorker = createAsyncThunk(
  "workers/getWorker",
  async (workerId, { getState }) => {
    const response = await fetch(`http://127.0.0.1:3001/getworker/${workerId}`);

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);

export const filterWorkers = createAsyncThunk(
  "workers/filterWorkers",
  async ({ location, profession, review, availability }, { getState }) => {
    const response = await fetch(
      `http://127.0.0.1:3001/filterworkers?${
        location ? `location=${location}` : ""
      }${profession ? `&&profession=${profession}` : ""}${
        review ? `&&review=${review}` : ""
      }${availability ? `&&availability=${availability}` : ""}`
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
  },
  reducers: {},
  extraReducers: {
    //getAllWorkers
    [getAllWorkers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // console.log(action.payload);

      state.workers = action.payload;
    },
    [getAllWorkers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllWorkers.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    //filter Workers
    [filterWorkers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // console.log(action.payload);
      state.workers = action.payload;
    },
    [filterWorkers.pending]: (state, action) => {
      state.status = "loading";
    },
    [filterWorkers.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
      // console.log(action.error.message);
      state.workers = null;
    },
    //get Worker
    [getWorker.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // console.log(action.payload);
      state.worker = action.payload;
    },
    [getWorker.pending]: (state) => {
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
