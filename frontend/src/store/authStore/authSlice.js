import { createSlice } from "@reduxjs/toolkit";

const getUserData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: getUserData?.user || {},
    token: getUserData?.token || "",
  },
  reducers: {
    ADD_LOGIN_INFO: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    REMOVE_USER_INFO: (state, action) => {
      state.user = {};
      state.token = "";
    },
  },
});

export const authSliceReducer = authSlice.reducer;

export const { ADD_LOGIN_INFO, REMOVE_USER_INFO } = authSlice.actions;
