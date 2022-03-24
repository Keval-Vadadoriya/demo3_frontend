import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async ({ token, workerId }, { getState }) => {
    const response = await fetch(
      `http://192.168.200.175:3001/getreview/${workerId}`,
      {
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

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ token, description, review, owner, workerId }, { getState }) => {
    const response = await fetch(
      `http://192.168.200.175:3001/review/${workerId}`,
      {
        method: "POST",
        body: JSON.stringify({
          description,
          review,
          owner,
        }),
        headers: {
          Authorization: token,

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
