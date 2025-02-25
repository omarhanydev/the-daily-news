import { useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeWelcome,
  HomeArticles,
  HomeNavbar,
} from "@/features/home/components";
import { AppDispatch, RootState, ActiveFilters } from "@/shared/stores";
import { setShowSearchBar } from "@/shared/stores/searchbar-slice";
import { useNewsService } from "@/shared/hooks";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeFilters } = useSelector((state: RootState) => state.searchbar);
  const { updateNews } = useNewsService();

  // Show search bar and update news based on feed saved filters or update latest news
  useEffect(() => {
    dispatch(setShowSearchBar(true));
  }, [dispatch]);

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
