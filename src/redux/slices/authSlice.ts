import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  registerAsInstructor,
  loginAsInstructor,
} from "../../services/authService";

const initialState = {
  userData: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  status: false,
  loading: false,
};

export const registerInstructor = createAsyncThunk(
  "auth/registerInstructor",
  async (userInfo) => {
    return await registerAsInstructor(userInfo);
  }
);

export const loginInstructor = createAsyncThunk(
  "auth/loginInstructor",
  async (details) => {
    return await loginAsInstructor(details);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Register
    //   .addCase(registerInstructor.pending, (state) => {
    //     state.loading = true;
    //   })
      .addCase(registerInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        console.log("State is:", state.userData);
        state.status = true;
      })
    //   .addCase(registerInstructor.rejected, (state) => {
    //     state.loading = false;
    //     state.status = false;
    //   })

      // Login
      .addCase(loginInstructor.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.status = true;
      })
  },
});

export default authSlice.reducer;