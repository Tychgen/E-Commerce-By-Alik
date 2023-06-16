import { configureStore } from '@reduxjs/toolkit';
import searchSlice, { setSearchTerm, selectSearchTerm } from './slices/searchSlice';
import cartSlice, { addToCart, removeFromCart, selectCartItems, selectQuantityItems, increaseQuantityTotal, decreaseQuantityTotal } from './slices/cartSlice';
import wishlistSlice, { addToWishlist, removeFromWishlist, selectWishlist } from './slices/wishlistSlice';
import productSlice, { setProductsSuccess, selectIsLoading, selectProducts } from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    search: searchSlice,
    wishlist: wishlistSlice,
    product: productSlice,
  },
  devTools: true, 
});

export {addToCart, removeFromCart, addToWishlist, removeFromWishlist, selectCartItems, selectWishlist, setSearchTerm, selectSearchTerm,selectQuantityItems, setProductsSuccess, selectIsLoading, selectProducts,  increaseQuantityTotal, decreaseQuantityTotal };