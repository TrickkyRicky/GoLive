import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchSuggestions: [],
    searchResults: []
  },
  reducers: {
    setSearchSuggestions(state, action) {
      state.searchSuggestions = action.payload
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload
    }
  }
});

export const searchActions = searchSlice.actions;

export default searchSlice;