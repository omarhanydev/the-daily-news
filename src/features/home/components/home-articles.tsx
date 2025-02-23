import {
  Box,
  Typography,
  Grid2,
  Card,
  CardContent,
  Link,
  CardMedia,
  CardActions,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/stores";
import dayjs from "dayjs";

const HomeArticles = () => {
  const { filteredArticles } = useSelector(
    (state: RootState) => state.searchbar
  );

  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Grid2 container spacing={2}>
          {filteredArticles.map((article, index) => (
            <Grid2 size={{ xs: 12, md: index < 3 ? 4 : 3 }} key={article.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  height: "100%",
                  borderRadius: "16px",
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
                <CardActions sx={{ marginTop: "auto", padding: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    {dayjs(article.publishedAt).fromNow()} • {article.source}
                    {article.author && ` • By ${article.author}`}
                  </Typography>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export { HomeArticles };
