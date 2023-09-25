import { createSlice } from "@reduxjs/toolkit";

type AlertState = {
  message: string;
  type: string;
};

const initialState: AlertState = {
  message: "",
  type: "success",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action){
                
    }
  },
});
