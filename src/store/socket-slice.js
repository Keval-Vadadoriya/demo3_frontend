import { createSlice } from "@reduxjs/toolkit";
import socketIOClient from "socket.io-client";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: socketIOClient("http://192.168.200.175:3001"),
    rId: "",
  },
  reducers: {
    setSocket(state) {
      state.socket = socketIOClient("http://192.168.200.175:3001");
    },
    setRId(state, action) {
      state.rId = action.payload.rId;
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
