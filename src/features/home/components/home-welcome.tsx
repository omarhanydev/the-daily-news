import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const HomeWelcome = () => {
  const todayDate = dayjs().format("MMM D, YYYY");
  return (
    <>
      <Box sx={{ pt: 8, pb: 6, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{ marginBottom: "18px", fontWeight: "500", fontSize: "32px" }}
        >
          Your personalized news feed
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <CalendarMonthIcon />
          {todayDate}
        </Typography>
      </Box>
    </>
  );
};

export { HomeWelcome };
