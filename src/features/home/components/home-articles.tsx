import {
  Box,
  Typography,
  Grid2,
  Card,
  CardContent,
  Link,
  CardMedia,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/stores";
import dayjs from "dayjs";
import { useMemo } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { useNewsService } from "@/shared/hooks/useNewsService";
const HomeArticles = () => {
  const {
    filteredArticles,
    quickFilterCategoryName,
    activeFilters,
    isLoading,
  } = useSelector((state: RootState) => state.searchbar);

  const { updateNews } = useNewsService();

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
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  height: "100%",
                  borderRadius: "16px",
                  boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.02)",
                  "&:hover": {
                    boxShadow:
                      "0 0 0 2px #1989fa, 0 0 12px 3px rgba(0, 0, 0, 0.1)",
                  },
                }}
                elevation={0}
                component={Link}
                target="_blank"
                href={article.url}
              >
                {article.image && (
                  <CardMedia
                    sx={{
                      paddingTop: "56.25%",
                    }}
                    image={article.image}
                    title={article.title}
                  />
                )}
                <CardContent
                  {...(!article.description
                    ? {
                        sx: {
                          marginTop: "auto",
                        },
                      }
                    : {})}
                >
                  <Typography
                    gutterBottom
                    {...(!article.description
                      ? {
                          variant: "h4",
                          ...(!article.image && {
                            sx: {
                              textAlign: "center",
                            },
                          }),
                        }
                      : {
                          variant: "h6",
                        })}
                  >
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    marginTop: "auto",
                    padding: 2,
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {dayjs(article.publishedAt).fromNow()} • {article.source}
                    {article.author && ` • By ${article.author}`}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ flexShrink: 0, textTransform: "none" }}
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
          {computedFilteredArticles.length === 0 && !isLoading && (
            <Grid2 size={{ xs: 12 }}>
              <Box
                sx={{
                  textAlign: "center",
                  background: "white",
                  maxWidth: "400px",
                  padding: 4,
                  borderRadius: "16px",
                  margin: "0 auto",
                  color: "text.secondary",
                }}
              >
                <ErrorIcon sx={{ fontSize: 48 }} />
                <Typography variant="h6">No articles found</Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, textTransform: "none" }}
                  color="primary"
                  onClick={() => {
                    updateNews(activeFilters);
                  }}
                >
                  Try again
                </Button>
              </Box>
            </Grid2>
          )}
          {isLoading && (
            <Grid2 size={{ xs: 12 }}>
              <Box
                sx={{
                  textAlign: "center",
                  background: "white",
                  maxWidth: "400px",
                  padding: 4,
                  borderRadius: "16px",
                  margin: "0 auto",
                  color: "text.secondary",
                }}
              >
                <CircularProgress />
              </Box>
            </Grid2>
          )}
        </Grid2>
      </Box>
    </>
  );
};

export { HomeArticles };
