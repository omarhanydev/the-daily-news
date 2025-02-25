import { useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeWelcome,
  HomeArticles,
  HomeNavbar,
} from "@/features/home/components";
import {
  AppDispatch,
  RootState,
  ActiveFilters,
  setShowSearchBar,
} from "@/shared/stores";
import { useNewsService } from "@/shared/hooks";

const Home = () => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { activeFilters } = useSelector((state: RootState) => state.searchbar);

  // News custom hook for updating news based on active filters
  const { updateNews } = useNewsService();

  // Show search bar (on load)
  useEffect(() => {
    dispatch(setShowSearchBar(true));
  }, [dispatch]);

  // Update news (on load & when active filters change)
  useEffect(() => {
    updateNews(activeFilters as ActiveFilters);
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
