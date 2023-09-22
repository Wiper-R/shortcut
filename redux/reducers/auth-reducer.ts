import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "@prisma/client";

export interface AuthUser extends Omit<User, "password"> {}

type AuthState = {
  isLoggedIn: boolean;
  user: AuthUser | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (thunkApi, { rejectWithValue }) => {
    const resp = await fetch("/api/auth/user");
    if (!resp.ok) return rejectWithValue(null);
    return await resp.json();
  }
);

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    loginSuccess(state, action) {},
    loginFailed(state, action) {},
  },

  extraReducers: (builder) => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      const data = action.payload;
      delete data.password;
      state.user = data;
      state.isLoggedIn = true;

      return state;
    });
  },
});

export const { loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;1
