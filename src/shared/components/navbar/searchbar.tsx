import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Paper,
  Tooltip,
  InputBase,
  Divider,
  Grid2,
  Box,
  Popover,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Autocomplete,
  Checkbox,
  Select,
  MenuItem,
  Stack,
  debounce,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  AppDispatch,
  RootState,
  setActiveFilters,
  setFeedSaved,
} from "@/shared/stores";
import { SearchbarSave } from "./searchbar-save";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import {
  processSavedFeedForLocalStorage,
  getFeedSavedFiltersFromLocalStorage,
} from "@/shared/utils";
import { useNewsService } from "@/shared/hooks";

const Searchbar = () => {
  // Use ref to check if the feed is being loaded for the first time
  const firstInitialLoad = useRef(true);

  // Get the theme and check if the screen is lower than 'md' breakpoint
  const theme = useTheme();
  const mdAndLowerScreens = useMediaQuery(theme.breakpoints.down("md"));

  // Initialize the popover anchor element | the searchbar ref that will be used to open the popover full width | computed value to check if the popover is open
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const searchbarRef = useRef<HTMLFormElement>(null);
  const open = Boolean(popoverAnchorEl);

  // Get the values from the Redux store
  const {
    showSearchBar,
    activeFilters,
    sources,
    categories,
    authors,
    feedSaved,
  } = useSelector((state: RootState) => state.searchbar);
  const dispatch = useDispatch<AppDispatch>();

  // Local state to store the active filters
  const [localActiveFilters, setLocalActiveFilters] = useState(activeFilters);

  const { updateCategories, updateAuthors } = useNewsService();

  useEffect(() => {
    // const filters = getFeedSavedFiltersFromLocalStorage();
    // if (filters) {
    // dispatch(setFeedSaved(true));
    // dispatch(setActiveFilters(filters));
    // }
  }, []);

  useEffect(() => {
    updateCategories(activeFilters);
    updateAuthors(activeFilters);
  }, []);

  useEffect(() => {
    // On page load: Set the local active filters (from the local state) to the active filters (from the Redux store) if the feed is saved
    if (feedSaved && firstInitialLoad.current) {
      setLocalActiveFilters(activeFilters);
      // Set the firstInitialLoad to false after the first render
      if (firstInitialLoad.current) {
        firstInitialLoad.current = false;
      }
    }
  }, [feedSaved, activeFilters]);

  // useEffect(() => {
  // On every change: Debounce the filter changes
  // if (!firstInitialLoad.current) {
  //   debouncedHandleFilters(localActiveFilters);
  // }
  // Set the firstInitialLoad to false after the first render
  // }, [localActiveFilters, debouncedHandleFilters, feedSaved]);

  // Create a debounced function for handling filter changes
  const debouncedHandleFilters = useMemo(
    () =>
      debounce((filters) => {
        dispatch(setActiveFilters(processSavedFeedForLocalStorage(filters)));
      }, 500),
    [dispatch]
  );

  const updateSearchbarFilters = (
    name: string,
    value: string | { label: string; id: string } | Dayjs | null
  ) => {
    const updatedFilters = {
      ...localActiveFilters,
      [name]: value,
      ...(name === "dateType" && value !== "custom" && { customDate: null }),
    };
    setLocalActiveFilters(updatedFilters);
    debouncedHandleFilters(updatedFilters);
  };

  // Don't render the component if the showSearchBar's value is false
  if (!showSearchBar) return null;

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 700,
      }}
      ref={searchbarRef}
    >
      <SearchbarSave />
      <InputBase
        value={localActiveFilters.keyword}
        name="keyword"
        onChange={(event) =>
          updateSearchbarFilters(event.target.name, event.target.value)
        }
        sx={{ ml: 1, flex: 1 }}
        fullWidth
        placeholder={
          mdAndLowerScreens ? "Search..." : "Search for news, articles & topics"
        }
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Tooltip title="Filters">
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          onClick={() => setPopoverAnchorEl(searchbarRef.current)}
        >
          <TuneIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={open}
        anchorEl={popoverAnchorEl}
        onClose={() => setPopoverAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: "700px",
              marginTop: { xs: "11px", md: "-6px" },
              marginLeft: { xs: "16px", md: "initial" },
              boxShadow:
                "3px 3px 5px -3px rgba(0, 0, 0, 0.3), -3px 3px 5px -3px rgba(0, 0, 0, 0.3)",
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack direction="row">
                <DatePicker
                  value={
                    localActiveFilters.customDate
                      ? dayjs(localActiveFilters.customDate)
                      : null
                  }
                  onChange={(value) =>
                    updateSearchbarFilters("customDate", value)
                  }
                  disabled={localActiveFilters.dateType !== "custom"}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputProps: {
                        sx: {
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        },
                      },
                    },
                  }}
                  label="Date"
                />
                <Select
                  value={localActiveFilters.dateType}
                  onChange={(e) => {
                    updateSearchbarFilters("dateType", e.target.value);
                  }}
                  sx={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderLeft: "none",
                    },
                  }}
                >
                  <MenuItem value="latest">Latest</MenuItem>
                  <MenuItem value="past-hour">Past hour</MenuItem>
                  <MenuItem value="past-day">Past 24 hours</MenuItem>
                  <MenuItem value="past-week">Past week</MenuItem>
                  <MenuItem value="past-month">Past month</MenuItem>
                  <MenuItem value="past-year">Past year</MenuItem>
                  <MenuItem value="custom">Custom date</MenuItem>
                </Select>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Autocomplete
                value={localActiveFilters.sources}
                onChange={(
                  _e: React.SyntheticEvent,
                  value: { label: string; id: string }[]
                ) => {
                  if (value.length < 1) {
                    toast.error("You must select at least one source");
                    return;
                  }
                  updateSearchbarFilters("sources", value);
                }}
                multiple
                options={sources}
                disableCloseOnSelect
                clearOnBlur
                limitTags={1}
                getOptionKey={(option) => option.id}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option, { selected }) => {
                  const { key, ...optionProps } = props;
                  return (
                    <li key={key} {...optionProps}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        sx={{ marginRight: 1 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Sources" placeholder="" />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Autocomplete
                value={localActiveFilters.category}
                onChange={(
                  _e: React.SyntheticEvent,
                  value: { label: string; id: string } | string | null
                ) => {
                  if (
                    typeof localActiveFilters.category === "object" &&
                    localActiveFilters.category?.label === value
                  ) {
                    return;
                  }
                  if (typeof value === "string") {
                    updateSearchbarFilters("category", {
                      label: value,
                      id: value,
                    });
                    return;
                  }
                  updateSearchbarFilters("category", value);
                }}
                freeSolo
                autoSelect
                getOptionKey={(option) => option?.id || option}
                options={categories}
                renderInput={(params) => (
                  <TextField {...params} label="Category" />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Autocomplete
                value={localActiveFilters.author}
                onChange={(
                  _e: React.SyntheticEvent,
                  value: { label: string; id: string } | string | null
                ) => {
                  if (
                    typeof localActiveFilters.author === "object" &&
                    localActiveFilters.author?.label === value
                  ) {
                    return;
                  }
                  if (typeof value === "string") {
                    updateSearchbarFilters("author", {
                      label: value,
                      id: value,
                    });
                    return;
                  }
                  updateSearchbarFilters("author", value);
                }}
                freeSolo
                getOptionKey={(option) => option?.id || option}
                autoSelect
                options={authors}
                renderInput={(params) => (
                  <TextField {...params} label="Author" />
                )}
              />
            </Grid2>
          </Grid2>
        </Box>
      </Popover>
    </Paper>
  );
};

export { Searchbar };
