import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async ({ workerId }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/getreview/${workerId}`,
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

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ description, review, workerId }, getState) => {
    const states = getState.getState();

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/review/${workerId}`,
      {
        method: "POST",
        body: JSON.stringify({
          description,
          review,
          owner: states.user.user._id,
        }),
        headers: {
          Authorization: states.login.token,

          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    } else {
      getState.dispatch(getReviews({ workerId }));
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
      state.status = "succeeded";
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
