import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");
const parsedCart = storedCart ? JSON.parse(storedCart) : [];

const initialState = {
  cart: Array.isArray(parsedCart) ? parsedCart : [],
  totalItems: Array.isArray(parsedCart) ? parsedCart.length : 0,
};

const persistCart = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.cart = Array.isArray(action.payload) ? action.payload : [];
      state.totalItems = state.cart.length;
      persistCart(state.cart);
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.totalItems = state.cart.length;
      persistCart(state.cart);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((course) => course._id !== action.payload);
      state.totalItems = state.cart.length;
      persistCart(state.cart);
    },
    resetCart(state) {
      state.cart = [];
      state.totalItems = 0;
      persistCart(state.cart);
    },
  },
});

export const { setCart, addToCart, removeFromCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
