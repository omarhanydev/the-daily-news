import { configureStore } from "@reduxjs/toolkit";
import searchbarReducer from "@/shared/stores/searchbar-slice";

export const store = configureStore({
  reducer: {
    searchbar: searchbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
