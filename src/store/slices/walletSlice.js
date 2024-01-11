import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    updateWallet: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { increment, decrement, updateWallet } = walletSlice.actions;

export default walletSlice.reducer;
