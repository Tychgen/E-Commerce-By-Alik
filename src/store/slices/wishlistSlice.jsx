import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const id = action.payload;
      const existingItem = state.wishlistItems.find((item) => item.id === id);

      if (existingItem) {
        existingItem.isWished = true;
      } else {
        state.wishlistItems.push({
          id,
          isWished: true,
        });
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      const existingItem = state.wishlistItems.find((item) => item.id === action.payload);

      if (existingItem) {
        existingItem.isWished = false;
      } else {
        state.wishlistItems.push({
          id,
          isWished: false,
        });
      }
    },
  },
});

export const selectWishlist = (state) => state.wishlist.wishlistItems;
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;