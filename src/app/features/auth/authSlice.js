import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for signup
export const signup = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://frontend-himart.onrender.com/users/signup",
        userData
      );
      return response.data; // Return user data if signup succeeds
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Network Error" }
      );
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://frontend-himart.onrender.com/users/login",
        userData
      );
      const expirationTime = Date.now() + 3600000; // 1 hour from now
      localStorage.setItem("expirationTime", expirationTime);
      localStorage.setItem("token", response.data.token); // Save token
      localStorage.setItem("userId", response.data.data._id); // Save user ID
      return response.data; // Return user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Network Error" }
      );
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup Thunks
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      // Login Thunks
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
