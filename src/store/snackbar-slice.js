import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    severity: "success",
    message: "",
  },

  reducers: {
    setSnackbar(state, action) {
      state.open = action.payload.open;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;
