import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip, Box, Typography, Theme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-hot-toast";
import { RootState, AppDispatch } from "@/shared/stores";
import { setFeedSaved } from "@/shared/stores/searchbar-slice";
import { useEffect, useRef } from "react";

const SearchbarSave = () => {
  // Use ref to check if the feed is being loaded for the first time
  const firstInitialLoad = useRef(true);

  // Get values from the searchbar slice of the Redux store
  const { feedSaved, activeFilters } = useSelector(
    (state: RootState) => state.searchbar
  );

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Toggle feed save
  const toggleFeedSave = () => {
    if (feedSaved) {
      localStorage?.removeItem("feedSaved");
      toast.success(
        <Box>
          <Typography variant="h6" sx={{ fontSize: "18px" }}>
            Personalized feed removed
          </Typography>
          <Typography variant="body2">
            Next time you open the app, you will be able to create a new
            personalized feed
          </Typography>
        </Box>
      );
    }
    dispatch(setFeedSaved(!feedSaved));
  };

  // Save feed to local storage when filters are updated
  useEffect(() => {
    if (feedSaved) {
      localStorage?.setItem("feedSaved", JSON.stringify(activeFilters));
      toast.success(
        firstInitialLoad.current ? (
          "Personalized feed loaded"
        ) : (
          <Box>
            <Typography variant="h6" sx={{ fontSize: "18px" }}>
              Personalized feed saved
            </Typography>
            <Typography variant="body2">
              Next time you open the app, your saved feed will be loaded
              automatically
            </Typography>
          </Box>
        )
      );
    }
    firstInitialLoad.current = false;
  }, [activeFilters, feedSaved]);

  return (
    <Tooltip title="Save feed">
      <IconButton
        onClick={toggleFeedSave}
        sx={(theme: Theme) => ({
          p: "10px",
          position: { xs: "fixed", md: "relative" },
          bottom: {
            xs: "16px",
            md: 0,
          },
          right: {
            xs: "16px",
            md: 0,
          },
          opacity: {
            xs: 1,
            md: 0.4,
          },
          backgroundColor: {
            xs: theme.palette.grey[300],
            md: "initial",
          },
          boxShadow: {
            xs: "3px 3px 5px -3px rgba(0, 0, 0, 0.3), -3px 3px 5px -3px rgba(0, 0, 0, 0.3)",
            md: "none",
          },
          "&:hover": {
            [theme.breakpoints.down("md")]: {
              backgroundColor: theme.palette.warning.main,
            },
          },
          ...(feedSaved
            ? {
                opacity: {
                  xs: 1,
                  md: 1,
                },
                backgroundColor: {
                  xs: theme.palette.warning.main,
                  md: "initial",
                },
                color: {
                  xs: "#fff",
                  md: theme.palette.warning.main,
                },
              }
            : {}),
        })}
      >
        <StarIcon />
      </IconButton>
    </Tooltip>
  );
};

export { SearchbarSave };
