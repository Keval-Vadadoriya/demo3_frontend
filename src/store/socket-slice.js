import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: socketIOClient("http://192.168.200.175:3001"),
  },
  reducers: {
    setSocket(state) {
      state.socket = socketIOClient("http://192.168.200.175:3001");
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
