import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  quantityTotal: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          id: action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload);

      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
      }
    },
    increaseQuantityTotal: (state) => {
      state.quantityTotal += 1;
    },
    decreaseQuantityTotal: (state) => {
      if (state.quantityTotal > 0) {
        state.quantityTotal -= 1;
      }
    },
  },
});

export const selectCartItems = (state) => state.cart.cartItems;
export const selectQuantityItems = (state) => state.cart.quantityTotal;
export const { addToCart, removeFromCart, increaseQuantityTotal, decreaseQuantityTotal } = cartSlice.actions;
export default cartSlice.reducer;
