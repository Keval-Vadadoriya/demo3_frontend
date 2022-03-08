import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "login",
  initialState: {
    age: localStorage.getItem("age"),
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    _id: localStorage.getItem("_id"),
  },

  reducers: {
    setLoggedInUser(state, action) {
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state._id = action.payload._id;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
