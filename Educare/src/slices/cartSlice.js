import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.cart = value.payload;
    },
  },
});

export const { setcart } = cartSlice.actions;
export default cartSlice.reducer;