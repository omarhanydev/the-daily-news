import { Box, Typography, Grid2, Card, CardContent } from "@mui/material";

const HomeArticles = () => {
  return (
    <>
      <Box sx={{ pb: 3 }}>
        <Grid2 container spacing={2}>
          {[...Array(10)].map((article) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={article}>
              <Card sx={{ borderRadius: "16px" }} elevation={0}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sample News Headline dasd
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ mt: 1, display: "block" }}
                  >
                    2 hours ago • News Source • By John Doe
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </>
  );
};

export { HomeArticles };
