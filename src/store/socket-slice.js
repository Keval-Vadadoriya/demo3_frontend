import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: socketIOClient("http://127.0.0.1:3001"),
  },
  reducers: {
    setSocket(state) {
      state.socket = socketIOClient("http://127.0.0.1:3001");
    },
    removeSocket(state) {
      state.socket = "";
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice;
