import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getChatList = createAsyncThunk(
  "chat/getChatList",
  async ({ userId, role }, { getState }) => {
    const response = await fetch(
      `http://127.0.0.1:3001/getchatlist/${userId}?role=${role}`
    );

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);

export const addToChatList = createAsyncThunk(
  "chat/addToChatList",
  async ({ userId, role, receiverId }, { getState }) => {
    const response = await fetch(
      `http://127.0.0.1:3001/addtochatlist/${userId}?role=${role}&&id=${receiverId}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    return data;
  }
);
export const getChats = createAsyncThunk(
  "chat/getChats",
  async ({ userId, role, receiverId }, { getState }) => {
    const response = await fetch(
      `http://127.0.0.1:3001/getchats/${userId}?role=${role}&&id=${receiverId}`
    );

    const data = await response.json();
    if (response.ok === false) {
      throw new Error(data.Error);
    }
    const op = role === "user" ? "worker" : "user";
    return { data, op };
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    status: "idle",
    errorMessage: "",
    chatList: null,
    chats: null,
    chatsOwner: "",
  },
  reducers: {
    setChat(state, action) {
      state.chats.push(action.payload.message);
    },
    setStatus(state, action) {
      const index = state.chats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      // console.log(index);
      state.chats[index].status = action.payload.status;
    },
  },
  extraReducers: {
    [getChatList.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.chatList = action.payload;
    },
    [getChatList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getChatList.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [addToChatList.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [addToChatList.pending]: (state, action) => {
      state.status = "loading";
    },
    [addToChatList.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
    [getChats.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.chats = action.payload.data.chats;
      state.chatsOwner = action.payload.data[action.payload.op];
    },
    [getChats.pending]: (state, action) => {
      state.status = "loading";
    },
    [getChats.rejected]: (state, action) => {
      state.status = "failed";
      state.errorMessage = action.error.message;
    },
  },
});
export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
