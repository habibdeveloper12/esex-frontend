import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import counterReducer from "./slices/counterSlice";
import walletReducer from "./slices/walletSlice";

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    counter: counterReducer,
    wallet: walletReducer,
    // cart: cartReducer,
    // product: productReducer,
  },
});

export default store;
