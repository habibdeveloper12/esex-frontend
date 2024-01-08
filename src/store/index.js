import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./formSlice";
import counterReducer from "./slices/counterSlice";

const store = configureStore({
  reducer: {
    form: formSlice.reducer,
    counter: counterReducer,
    // cart: cartReducer,
    // product: productReducer,
  },
});

export default store;
