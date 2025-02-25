import { CircularProgress, Box, Grid2 } from "@mui/material";

const HomeArticlesLoading = () => {
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
        <CircularProgress />
      </Box>
    </Grid2>
  );
};

export { HomeArticlesLoading };
