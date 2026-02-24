import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "https://apicxotv.techplusmedia.com";

const initialState = {
  singleNewsItem: null,
  isLoading: false,
  isError: false,
};

export const fetchSingleNewsByTitle = createAsyncThunk(
  "singleNews/fetchByTitle",
  async ({ title, categoryName }) => {

    try {
      // Build the base URL with slug filter
      let url = `${apiUrl}/api/news?populate=*&filters[slug][$eq]=${title}`;

      // If categoryName is provided, add category/subcategory filter to prevent slug conflicts
      // This ensures we fetch the correct post when multiple posts share the same slug
      if (categoryName) {
        // Try both subcategory and category filters (Strapi will match whichever exists)
        // Using $or to match either subcategories.name or categories.name
        url += `&filters[$or][0][subcategories][name][$eqi]=${encodeURIComponent(categoryName)}`;
        url += `&filters[$or][1][categories][name][$eqi]=${encodeURIComponent(categoryName)}`;
      }

      const response = await axios.get(url);

      return response.data.data; // Return the news item matching both slug AND category

    } catch (error) {
      throw error;
    }
  }
);

const singleNewsSlice = createSlice({
  name: "singleNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleNewsByTitle.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSingleNewsByTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.singleNewsItem = action.payload;
      })
      .addCase(fetchSingleNewsByTitle.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.singleNewsItem = null;
      });
  },
});

export default singleNewsSlice.reducer;

