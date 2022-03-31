import { createSlice } from "@reduxjs/toolkit";
// export const getChatList = createAsyncThunk(
//   "chat/getChatList",
//   async ({ userId, role }, { getState }) => {
//     const response = await fetch(
//       `http://192.168.200.175:3001/getchatlist/${userId}?role=${role}`
//     );

//     const data = await response.json();
//     if (response.ok === false) {
//       throw new Error(data.Error);
//     }
//     return data;
//   }
// );

// export const addToChatList = createAsyncThunk(
//   "chat/addToChatList",
//   async ({ userId, role, receiverId }, { getState }) => {
//     const response = await fetch(
//       `http://192.168.200.175:3001/addtochatlist/${userId}?role=${role}&&id=${receiverId}`,
//       {
//         method: "POST",
//       }
//     );

//     const data = await response.json();
//     if (response.ok === false) {
//       throw new Error(data.Error);
//     }
//     return data;
//   }
// );
// export const getChats = createAsyncThunk(
//   "chat/getChats",
//   async ({ userId, role, receiverId }, { getState }) => {
//     const response = await fetch(
//       `http://192.168.200.175:3001/getchats/${userId}?role=${role}&&id=${receiverId}`
//     );

//     const data = await response.json();
//     if (response.ok === false) {
//       throw new Error(data.Error);
//     }
//     const op = role === "user" ? "worker" : "user";

//     return { data, op };
//   }
// );

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    status: "idle",
    errorMessage: "",
    chatList: [],
    chats: {},
    chatsOwner: "",
  },
  reducers: {
    setChat(state, action) {
      if (state.chats) {
        state.chats[action.payload.receiverId].push(action.payload.message);
      } else {
        state.chats[action.payload.receiverId] = [action.payload.message];
      }
    },
    setChats(state, action) {
      state.chats[action.payload.receiverId] = action.payload.chats.chats;
      state.chatsOwner =
        action.payload.chats[
          action.payload.role === "user" ? "worker" : "user"
        ];
    },
    setStatus(state, action) {
      const index = state.chats[action.payload.receiverId].findIndex(
        (chat) => chat._id === action.payload._id
      );
      // console.log(state.chats[action.payload.receiverId][index]);
      state.chats[action.payload.receiverId][index].status =
        action.payload.status;
    },
    setChatList(state, action) {
      state.chatList = action.payload.list;
    },
  },
  // extraReducers: {
  //   [getChatList.fulfilled]: (state, action) => {
  //     state.status = "succeeded";

  //     state.chatList = action.payload;
  //   },
  //   [getChatList.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [getChatList.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.errorMessage = action.error.message;
  //   },
  //   [addToChatList.fulfilled]: (state, action) => {
  //     state.status = "succeeded";
  //   },
  //   [addToChatList.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [addToChatList.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.errorMessage = action.error.message;
  //   },
  //   [getChats.fulfilled]: (state, action) => {
  //     state.status = "succeeded";
  //     console.log(action.payload.op);
  //     state.chats = action.payload.data.chats;
  //     state.chatsOwner = action.payload.data[action.payload.op];
  //   },
  //   [getChats.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [getChats.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.errorMessage = action.error.message;
  //   },
  // },
});
export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
