import {
  Link,
  Typography,
  Button,
  CardActions,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import dayjs from "dayjs";
import { Article } from "@/shared/services/news/types";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        height: "100%",
        borderRadius: "16px",
        boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.02)",
        "&:hover": {
          boxShadow: "0 0 0 2px #1989fa, 0 0 12px 3px rgba(0, 0, 0, 0.1)",
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
        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
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
  );
};

export { ArticleCard };
