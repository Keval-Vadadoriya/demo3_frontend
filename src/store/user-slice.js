import { createSlice } from "@reduxjs/toolkit";

let data = localStorage.getItem("userInfo");
data = JSON.parse(data);
const userSlice = createSlice({
  name: "login",
  initialState: {
    ...data,
  },

  reducers: {
    setLoggedInUser(state, action) {
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state._id = action.payload._id;
      state.avatar = action.payload.avatar;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
