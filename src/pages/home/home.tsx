import { useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeWelcome,
  HomeArticles,
  HomeNavbar,
} from "@/features/home/components";
import { AppDispatch, RootState } from "@/shared/stores";
import { setShowSearchBar } from "@/shared/stores/searchbar-slice";
import { useNewsService } from "@/shared/hooks";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { feedSaved } = useSelector((state: RootState) => state.searchbar);
  const { updateNews } = useNewsService();
  useEffect(() => {
    dispatch(setShowSearchBar(true));
    if (!feedSaved) {
      updateNews();
    }
  }, [dispatch, feedSaved, updateNews]);

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
