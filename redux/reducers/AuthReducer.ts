import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    loginSuccess(state, action) {},
    loginFailed(state, action) {},
  },
});

export const { loginSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
