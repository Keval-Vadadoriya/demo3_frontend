import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (workerId, { getState }) => {
    const response = await fetch(`http://127.0.0.1:3001/getreview/${workerId}`);

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ description, review, owner, workerId }, { getState }) => {
    const response = await fetch(`http://127.0.0.1:3001/review/${workerId}`, {
      method: "POST",
      body: JSON.stringify({
        description,
        review,
        owner,
      }),
      headers: {
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

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    status: "idle",
    errorMessage: "",
    reviews: [],
  },
  reducers: {},
  extraReducers: {
    [getReviews.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.errorMessage = "";
      state.reviews = action.payload;
    },
    [getReviews.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [getReviews.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [addReview.fulfilled]: (state, action) => {
      state.status = "review added";
      state.errorMessage = "";
    },
    [addReview.pending]: (state, action) => {
      state.status = "loading";
      state.errorMessage = "";
    },
    [addReview.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});

export default reviewsSlice.reducer;
