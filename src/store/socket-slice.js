import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: socketIOClient("http://192.168.200.175:3001"),
    data: null,
  },
  reducers: {
    setSocket(state) {
      state.socket = socketIOClient("http://192.168.200.175:3001");
    },
    setData(state, action) {
      state.data = action.payload.data;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
