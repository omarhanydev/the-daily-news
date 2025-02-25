import ErrorIcon from "@mui/icons-material/Error";
import { Typography, Button, Box, Grid2 } from "@mui/material";

const HomeArticlesEmpty = ({ tryAgainBtnOnClick }: { tryAgainBtnOnClick: () => void }) => {
    return (
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
              tryAgainBtnOnClick();
            }}
          >
            Try again
          </Button>
        </Box>
      </Grid2>
    );
};

export { HomeArticlesEmpty };
