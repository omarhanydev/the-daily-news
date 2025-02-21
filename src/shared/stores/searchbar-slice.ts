import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchbarInitialState {
  showSearchBar: boolean;
  feedSaved: boolean;
  categories: string[];
  sources: string[];
  authors: string[];
  filteredArticles: string[];
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
    sources: [],
    authors: [],
    filteredArticles: [],
    activeFilters: {
        keyword: null,
        date: null,
        category: null,
        source: null,
        author: null,
    },
};

const searchbarSlice = createSlice({
    name: 'searchbar',
    initialState,
    reducers: {
        setShowSearchBar: (state, action: PayloadAction<boolean>) => {
            state.showSearchBar = action.payload;
        },
        setCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = action.payload;
        },
        setSources: (state, action: PayloadAction<string[]>) => {
            state.sources = action.payload;
        },
        setAuthors: (state, action: PayloadAction<string[]>) => {
            state.authors = action.payload;
        },
        setFilteredArticles: (state, action: PayloadAction<string[]>) => {
            state.filteredArticles = action.payload;
        },
        setActiveFilters: (state, action: PayloadAction<SearchbarInitialState['activeFilters']>) => {
            state.activeFilters = action.payload;
        },
        setFeedSaved: (state, action: PayloadAction<boolean>) => {
            state.feedSaved = action.payload;
        },
    },
});

export const { setShowSearchBar, setCategories, setSources, setAuthors, setFilteredArticles, setActiveFilters, setFeedSaved } = searchbarSlice.actions;

export default searchbarSlice.reducer;
