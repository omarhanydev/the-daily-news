import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/stores";
import {
  setCategories,
  setAuthors,
  setFilteredArticles,
} from "@/shared/stores/searchbar-slice";
import { newsService } from "@/shared/services/news/news-service";
import { Article, BaseAdapterFetchParams } from "@/shared/services/news/types";
import toast from "react-hot-toast";

const useNewsService = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updateNews = useCallback(
    async (filters?: BaseAdapterFetchParams) => {
      const responses = await (filters
        ? newsService.fetchFilteredNews(filters)
        : newsService.fetchLatestNews());

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
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        });

      dispatch(setFilteredArticles(filteredArticles));
    },
    [dispatch]
  );

  const updateCategories = useCallback(async () => {
    const responses = await newsService.fetchCategories();

    responses.map((r) => {
      if (r.status === "rejected") {
        toast.error(
          `Error fetching categories from ${r.reason.adapter.name}, ${r.reason.statusText}`
        );
      }
    });

    if (responses.every((r) => r.status === "fulfilled")) {
      toast.success("Categories fetched successfully");
    }

    const mergedCategories = [
      ...new Map(
        responses
          .filter((r) => r.status === "fulfilled")
          .reduce((acc, curr) => [...acc, ...curr.value], [])
          .map((item) => [item.id, item])
      ).values(),
    ];

    dispatch(setCategories(mergedCategories));
  }, [dispatch]);

  const updateAuthors = useCallback(async () => {
    const responses = await newsService.fetchAuthors();

    responses.map((r) => {
      if (r.status === "rejected") {
        toast.error(
          `Error fetching authors from ${r.reason.adapter.name}, ${r.reason.statusText}`
        );
      }
    });

    if (responses.every((r) => r.status === "fulfilled")) {
      toast.success("Authors fetched successfully");
    }

    const mergedAuthors = [
      ...new Map(
        responses
          .filter((r) => r.status === "fulfilled")
          .reduce((acc, curr) => [...acc, ...curr.value], [])
          .map((item) => [item.id, item])
      ).values(),
    ];

    dispatch(setAuthors(mergedAuthors));
  }, [dispatch]);

  return { updateNews, updateCategories, updateAuthors };
};

export { useNewsService };
