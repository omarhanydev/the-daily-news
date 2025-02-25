import { useMemo } from "react";
import { Box, Grid2 } from "@mui/material";
import { useSelector } from "react-redux";
import { ArticleCard } from "@/features/articles/components/article-card";
import { RootState } from "@/shared/stores";
import { useNewsService } from "@/shared/hooks/useNewsService";
import { HomeArticlesEmpty } from "@/features/home/components/home-articles/home-articles-empty";
import { HomeArticlesLoading } from "@/features/home/components/home-articles/home-articles-loading";

const HomeArticles = () => {
  // Redux
  const {
    filteredArticles,
    quickFilterCategoryName,
    activeFilters,
    isLoading,
  } = useSelector((state: RootState) => state.searchbar);

  // News custom hook (updating news based on active filters)
  const { updateNews } = useNewsService();

  // Computed filtered articles (based on quick filter category name tabs)
  const computedFilteredArticles = useMemo(() => {
    return filteredArticles.filter((article) => {
      if (quickFilterCategoryName === "") {
        return true;
      }
      if (quickFilterCategoryName === "Other") {
        return !article?.category;
      }
      return article?.category === quickFilterCategoryName;
    });
  }, [filteredArticles, quickFilterCategoryName]);

  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Grid2 container spacing={2}>
          {computedFilteredArticles.map((article, index) => (
            <Grid2
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: index == 0 && quickFilterCategoryName === "" ? 6 : 3,
              }}
              key={article.id}
            >
              <ArticleCard article={article} />
            </Grid2>
          ))}
          {computedFilteredArticles.length === 0 && !isLoading && (
            <HomeArticlesEmpty
              tryAgainBtnOnClick={() => updateNews(activeFilters)}
            />
          )}
          {isLoading && <HomeArticlesLoading />}
        </Grid2>
      </Box>
    </>
  );
};

export { HomeArticles };
