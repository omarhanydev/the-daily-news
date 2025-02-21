import { useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  HomeWelcome,
  HomeArticles,
  HomeNavbar,
} from "@/features/home/components";
import { AppDispatch } from "@/shared/stores";
import { setShowSearchBar } from "@/shared/stores/searchbar-slice";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setShowSearchBar(true));
  }, [dispatch]);

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
