import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "success",
    message: "",
    page: true,
  },

  reducers: {
    setSnackbar(state, action) {
      state.open = action.payload.open;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    setPage(state, action) {
      state.page = action.payload.page;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;
