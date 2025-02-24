import { useEffect, useCallback } from "react";
import { Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeWelcome,
  HomeArticles,
  HomeNavbar,
} from "@/features/home/components";
import { AppDispatch, RootState } from "@/shared/stores";
import {
  setActiveFilters,
  setFeedSaved,
  setShowSearchBar,
} from "@/shared/stores/searchbar-slice";
import { useNewsService } from "@/shared/hooks";
import { getFeedSavedFilters } from "@/shared/utils/get-check-feed-saved-filters";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeFilters } = useSelector((state: RootState) => state.searchbar);
  const { updateNews } = useNewsService();

  // Handle feed saved filters from local storage
  // const checkFeedSaved = useCallback(() => {
  //   const feedSavedFilters = getFeedSavedFilters();
  //   if (feedSavedFilters) {
  //     dispatch(setActiveFilters({ ...activeFilters, ...feedSavedFilters }));
  //   }
  //   return feedSavedFilters;
  // }, [dispatch, activeFilters]);

  // Show search bar and update news based on feed saved filters or update latest news
  useEffect(() => {
    dispatch(setShowSearchBar(true));
    // const feedSavedFilters = checkFeedSaved();
    // if (feedSavedFilters) {
    //   updateNews(feedSavedFilters);
    // } else {
    //   updateNews();
    // }
  }, [dispatch]);
  // }, [dispatch, checkFeedSaved, updateNews]);

  useEffect(() => {
    console.log("activeFilters", activeFilters);
    updateNews(activeFilters);
  }, [dispatch, updateNews, activeFilters]);

  return (
    <>
      <HomeNavbar />
      <Container maxWidth="xl">
        <Stack gap={2} direction="column">
          <HomeWelcome />
          <HomeArticles />
        </Stack>
      </Container>
    </>
  );
};

export { Home };
