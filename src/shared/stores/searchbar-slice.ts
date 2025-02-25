import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "@/shared/services/news/types";
import { Dayjs } from "dayjs";
import { getFeedSavedFiltersFromLocalStorage } from "../utils";

interface SearchbarInitialState {
  isLoading: boolean;
  showSearchBar: boolean;
  feedSaved: boolean;
  categories: { label: string; id: string }[];
  sources: { label: string; id: string }[];
  authors: { label: string; id: string }[];
  filteredArticles: Article[];
  quickFilterCategoryName: string;
  activeFilters: ActiveFilters;
}

export type ActiveFilters = {
  keyword: string | null;
  customDate: Dayjs | null | string | undefined;
  dateType: string | null;
  sources: { label: string; id: string }[];
  category: { label: string; id: string } | string | null;
  author: { label: string; id: string } | string | null;
};

export const defaultActiveFilters: ActiveFilters = {
  keyword: "",
  customDate: null,
  dateType: "latest",
  sources: [
    { label: "The Guardian", id: "the-guardian" },
    { label: "NY Times", id: "ny-times" },
    { label: "News API", id: "news-api" },
  ],
  category: "",
  author: "",
};

const feedSavedFiltersInLocalStorage = getFeedSavedFiltersFromLocalStorage();

const initialState: SearchbarInitialState = {
  isLoading: false,
  showSearchBar: false,
  feedSaved: feedSavedFiltersInLocalStorage ? true : false,
  categories: [],
  sources: [
    { label: "The Guardian", id: "the-guardian" },
    { label: "NY Times", id: "ny-times" },
    { label: "News API", id: "news-api" },
  ],
  authors: [],
  filteredArticles: [],
  quickFilterCategoryName: "",
  activeFilters: feedSavedFiltersInLocalStorage || defaultActiveFilters,
};

const searchbarSlice = createSlice({
  name: "searchbar",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
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
  setIsLoading,
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
