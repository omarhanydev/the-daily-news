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
  createFilterOptions,
  debounce,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AppDispatch, RootState, setFilteredArticles } from "@/shared/stores";
import { SearchbarSave } from "./searchbar-save";
import { newsService } from "@/shared/services/news/news-service";
import toast from "react-hot-toast";
import { Article, BaseAdapterFetchParams } from "@/shared/services/news/types";
import { Dayjs } from "dayjs";
import { useNewsService } from "@/shared/hooks";

const Searchbar = () => {
  // Get values from the searchbar slice of the Redux store
  const dispatch = useDispatch<AppDispatch>();
  const { showSearchBar, sources, categories, authors } = useSelector(
    (state: RootState) => state.searchbar
  );

  // Local state to store the searchbar filters
  const [searchbarFilters, setSearchbarFilters] = useState<{
    keyword: string;
    customDate: Dayjs | null;
    dateType: string;
    sources: { label: string; id: string }[];
    category: { label: string; id: string } | string | null;
    author: { label: string; id: string } | string | null;
  }>({
    keyword: "",
    customDate: null,
    dateType: "latest",
    sources,
    category: "",
    author: "",
  });

  // Get the theme and check if the screen is lower than 'md' breakpoint
  const theme = useTheme();
  const mdAndLowerScreens = useMediaQuery(theme.breakpoints.down("md"));

  // Initialize the popover anchor element and the searchbar ref
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const searchbarRef = useRef<HTMLFormElement>(null);

  // Computed value to check if the popover is open
  const open = Boolean(popoverAnchorEl);

  const { updateCategories, updateAuthors } = useNewsService();

  const filtersAreEmpty = (filters: BaseAdapterFetchParams) => {
    return (
      (filters.keyword === "" || null) &&
      (filters.fromDate === null || null) &&
      (filters.toDate === null || null) &&
      (filters.category === "" || null) &&
      (filters.categoryId === "" || null) &&
      (filters.author === "" || null) &&
      (filters.authorId === "" || null)
    );
  };
  // Methods
  const refreshNewsData = useMemo(
    () =>
      debounce(async (filters: BaseAdapterFetchParams) => {
        console.log("New Filters:", filters);
        const responses = await (filtersAreEmpty(filters)
          ? newsService.fetchLatestNews()
          : newsService.fetchFilteredNews(filters));
        responses.map((r) => {
          if (r.status === "rejected") {
            toast.error(
              `Error fetching news from ${r.reason.adapter.name}, ${r.reason.statusText}`
            );
          }
        });
        if (responses.every((r) => r.status === "fulfilled")) {
          toast.success("News fetched successfully");
        }
        const filteredArticles: Article[] = responses
          .filter((r) => r.status === "fulfilled")
          .reduce((acc, curr) => [...acc, ...curr.value], [] as Article[])
          .sort((a, b) => {
            return (
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
            );
          });
        dispatch(setFilteredArticles(filteredArticles));
      }, 500),
    [dispatch]
  );

  // Create a debounced function for handling filter changes
  const debouncedHandleFilters = useMemo(
    () =>
      debounce((filters: typeof searchbarFilters) => {
        const params: BaseAdapterFetchParams = {
          keyword: filters.keyword,
          // TODO: handle date type
          fromDate: filters.customDate?.toDate(),
          toDate: filters.customDate?.toDate(),
          category:
            filters?.category?.id === filters?.category?.label
              ? filters?.category?.label
              : null,
          categoryId:
            filters?.category?.id !== filters?.category?.label
              ? filters?.category?.id
              : null,
          author:
            filters?.author?.id === filters?.author?.label
              ? filters?.author?.label
              : null,
          authorId:
            filters?.author?.id !== filters?.author?.label
              ? filters?.author?.id
              : null,
        };
        refreshNewsData(params);
        console.log(filters);
      }, 500),
    [refreshNewsData]
  );

  // Effect to handle filter changes
  useEffect(() => {
    debouncedHandleFilters(searchbarFilters);
  }, [searchbarFilters, debouncedHandleFilters]);

  // const updateFilters = (newFilters: BaseAdapterFetchParams) => {
  //   const updatedFilters = {
  //     ...filters,
  //     ...newFilters,
  //   };
  //   setFilters(updatedFilters);
  //   refreshNewsData({});
  // };

  const updateSearchbarFilters = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchbarFilters({
      ...searchbarFilters,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    updateCategories();
    updateAuthors();
  }, []);

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
        value={searchbarFilters.keyword}
        name="keyword"
        onChange={updateSearchbarFilters}
        sx={{ ml: 1, flex: 1 }}
        fullWidth
        placeholder={
          mdAndLowerScreens ? "Search..." : "Search for news, articles & topics"
        }
      />
      <Tooltip title="Search">
        <IconButton
          type="button"
          sx={{ p: "10px", display: { xs: "none", md: "flex" } }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
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
                  value={searchbarFilters.customDate}
                  onChange={(date) => {
                    setSearchbarFilters({
                      ...searchbarFilters,
                      customDate: date,
                    });
                  }}
                  disabled={searchbarFilters.dateType !== "custom"}
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
                  value={searchbarFilters.dateType}
                  onChange={(e) => {
                    setSearchbarFilters({
                      ...searchbarFilters,
                      ...(searchbarFilters.customDate
                        ? { customDate: null }
                        : {}),
                      dateType: e.target.value,
                    });
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
                value={searchbarFilters.sources}
                onChange={(
                  _e: React.SyntheticEvent,
                  value: { label: string; id: string }[]
                ) => {
                  if (value.length < 1) {
                    toast.error("You must select at least one source");
                    return;
                  }
                  setSearchbarFilters({
                    ...searchbarFilters,
                    sources: value,
                  });
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
                value={searchbarFilters.category}
                onChange={(
                  _e: React.SyntheticEvent,
                  value: { label: string; id: string } | string | null
                ) => {
                  if (
                    typeof searchbarFilters.category === "object" &&
                    searchbarFilters.category?.label === value
                  ) {
                    return;
                  }
                  if (typeof value === "string") {
                    setSearchbarFilters({
                      ...searchbarFilters,
                      category: {
                        label: value,
                        id: value,
                      },
                    });
                    return;
                  }
                  setSearchbarFilters({
                    ...searchbarFilters,
                    category: value,
                  });
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
                value={searchbarFilters.author}
                onChange={(
                  _e: React.SyntheticEvent,
                  value: { label: string; id: string } | string | null
                ) => {
                  if (
                    typeof searchbarFilters.author === "object" &&
                    searchbarFilters.author?.label === value
                  ) {
                    return;
                  }
                  if (typeof value === "string") {
                    setSearchbarFilters({
                      ...searchbarFilters,
                      author: {
                        label: value,
                        id: value,
                      },
                    });
                    return;
                  }
                  setSearchbarFilters({
                    ...searchbarFilters,
                    author: value,
                  });
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
