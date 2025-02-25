import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/stores";
import {
  setCategories,
  setAuthors,
  setFilteredArticles,
  setIsLoading,
  ActiveFilters,
} from "@/shared/stores/searchbar-slice";
import { newsService } from "@/shared/services/news/news-service";
import { Article } from "@/shared/services/news/types";
import toast from "react-hot-toast";
import { processFiltersToServiceFilters } from "../utils";

const useNewsService = () => {
  const dispatch = useDispatch<AppDispatch>();

  const updateNews = useCallback(
    async (filters: ActiveFilters) => {
      dispatch(setIsLoading(true));
      const filtersAreEmpty = (filters: ActiveFilters) => {
        return (
          JSON.stringify(filters) ===
          JSON.stringify({
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
          })
        );
      };

      const responses = await (filtersAreEmpty(filters)
        ? newsService.fetchLatestNews(filters.sources.map((s) => s.id))
        : newsService.fetchFilteredNews(
            processFiltersToServiceFilters(filters),
            filters.sources.map((s) => s.id)
          ));

      responses.map((r) => {
        if (r.status === "rejected") {
          toast.error(
            `Error fetching news from ${r.reason.adapter.name}, ${
              r.reason.statusText || r.reason?.data?.message
            }`
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

      dispatch(setIsLoading(false));
      dispatch(setFilteredArticles(filteredArticles));
    },
    [dispatch]
  );

  const updateCategories = useCallback(
    async (filters?: ActiveFilters) => {
      const responses = await newsService.fetchCategories(
        filters?.sources.map((s) => s.id)
      );

      responses.map((r) => {
        if (r.status === "rejected") {
          toast.error(
            `Error fetching categories from ${r.reason.adapter.name}, ${
              r.reason.statusText || r.reason?.data?.message
            }`
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
            .reduce(
              (acc: { id: string; label: string }[], curr) => [
                ...acc,
                ...curr.value,
              ],
              []
            )
            .map((item) => [item.id, item])
        ).values(),
      ];

      dispatch(setCategories(mergedCategories));
    },
    [dispatch]
  );

  const updateAuthors = useCallback(
    async (filters?: ActiveFilters) => {
      const responses = await newsService.fetchAuthors(
        filters?.sources.map((s) => s.id)
      );

      responses.map((r) => {
        if (r.status === "rejected") {
          toast.error(
            `Error fetching authors from ${r.reason.adapter.name}, ${
              r.reason.statusText || r.reason?.data?.message
            }`
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
            .reduce(
              (acc: { id: string; label: string }[], curr) => [
                ...acc,
                ...curr.value,
              ],
              []
            )
            .map((item) => [item.id, item])
        ).values(),
      ];

      dispatch(setAuthors(mergedAuthors));
    },
    [dispatch]
  );

  return { updateNews, updateCategories, updateAuthors };
};

export { useNewsService };
