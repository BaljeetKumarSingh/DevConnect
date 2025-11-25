import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    connections: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    removeConnections: (state, action) => {
      state.connections = null;
    },
  },
});
export const { addUser, removeUser, addConnections, removeConnections } =
  userSlice.actions;
export default userSlice.reducer;
