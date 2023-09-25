import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "@prisma/client";

export interface AuthUser extends Omit<User, "password"> {}

export type AuthState = {
  isLoggedIn: boolean;
  isPopulated: boolean;
  user: AuthUser | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  isPopulated: false,
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
      state.isPopulated = true;
      return state;
    });

    builder.addCase(loadUser.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isPopulated = true;
    });
  },
});

export const { loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
1;
