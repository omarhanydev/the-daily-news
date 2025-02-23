import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "@/shared/services/news/types";
interface SearchbarInitialState {
  showSearchBar: boolean;
  feedSaved: boolean;
  categories: { label: string; id: string }[];
  sources: { label: string; id: string }[];
  authors: { label: string; id: string }[];
  filteredArticles: Article[];
  quickFilterCategoryName: string;
  activeFilters: {
    keyword: string | null;
    date: string | null;
    category: string | null;
    source: string | null;
    author: string | null;
  };
}

const initialState: SearchbarInitialState = {
  showSearchBar: false,
  feedSaved: false,
  categories: [],
  sources: [
    { label: "The Guardian", id: "the-guardian" },
    { label: "NY Times", id: "ny-times" },
    { label: "News API", id: "news-api" },
  ],
  authors: [],
  filteredArticles: [],
  quickFilterCategoryName: "",
  activeFilters: {
    keyword: null,
    date: null,
    category: null,
    source: null,
    author: null,
  },
};

const searchbarSlice = createSlice({
  name: "searchbar",
  initialState,
  reducers: {
    setShowSearchBar: (state, action: PayloadAction<boolean>) => {
      state.showSearchBar = action.payload;
    },
    setCategories: (
      state,
      action: PayloadAction<SearchbarInitialState["categories"]>
    ) => {
      state.categories = action.payload;
    },
    setSources: (
      state,
      action: PayloadAction<SearchbarInitialState["sources"]>
    ) => {
      state.sources = action.payload;
    },
    setAuthors: (
      state,
      action: PayloadAction<SearchbarInitialState["authors"]>
    ) => {
      state.authors = action.payload;
    },
    setFilteredArticles: (state, action: PayloadAction<Article[]>) => {
      state.filteredArticles = action.payload;
    },
    setActiveFilters: (
      state,
      action: PayloadAction<SearchbarInitialState["activeFilters"]>
    ) => {
      state.activeFilters = action.payload;
    },
    setFeedSaved: (state, action: PayloadAction<boolean>) => {
      state.feedSaved = action.payload;
    },
    setQuickFilterCategoryName: (state, action: PayloadAction<string>) => {
      state.quickFilterCategoryName = action.payload;
    },
  },
});

export const {
  setShowSearchBar,
  setCategories,
  setSources,
  setAuthors,
  setFilteredArticles,
  setActiveFilters,
  setFeedSaved,
  setQuickFilterCategoryName,
} = searchbarSlice.actions;

export default searchbarSlice.reducer;
