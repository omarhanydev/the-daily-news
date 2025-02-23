import { useCallback, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeWelcome,
  HomeArticles,
  HomeNavbar,
} from "@/features/home/components";
import { AppDispatch, RootState } from "@/shared/stores";
import {
  setFilteredArticles,
  setShowSearchBar,
} from "@/shared/stores/searchbar-slice";
import { newsService } from "@/shared/services/news/news-service";
import toast from "react-hot-toast";
import { Article } from "@/shared/services/news/types";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { feedSaved } = useSelector((state: RootState) => state.searchbar);

  const fetchLatestNews = useCallback(async () => {
    const responses = await newsService.fetchLatestNews();
    responses.map((r) => {
      if (r.status === "rejected") {
        toast.error(
          `Error fetching news from ${r.reason.adapter.name}, ${r.reason.statusText}`
        );
      }
    });
    if (responses.every((r) => r.status === "fulfilled")) {
      toast.success("News fetched successfully");
    }
    const filteredArticles: Article[] = responses
      .filter((r) => r.status === "fulfilled")
      .reduce((acc, curr) => [...acc, ...curr.value], [] as Article[])
      .sort((a, b) => {
        return new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      });
    dispatch(setFilteredArticles(filteredArticles));
    console.log("filteredArticles", filteredArticles);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setShowSearchBar(true));
    if (!feedSaved) {
      fetchLatestNews();
    }
  }, [dispatch, feedSaved, fetchLatestNews]);

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
