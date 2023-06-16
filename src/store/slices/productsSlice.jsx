import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
     setProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
  },
});


export const selectIsLoading = (state) => state.products.isLoading;
export const selectProducts = (state) => state.products.data;
export const { setProductsSuccess } = productsSlice.actions;

export default productsSlice.reducer;