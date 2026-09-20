import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",

  initialState,

  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setNews, setLoading, setError } = newsSlice.actions;

export default newsSlice.reducer;
