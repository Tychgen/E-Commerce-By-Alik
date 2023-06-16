import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const selectSearchTerm = (state) => state.search.searchTerm;
export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;