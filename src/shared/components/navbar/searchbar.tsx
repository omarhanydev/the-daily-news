import { useState, useRef } from "react";
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
} from "@mui/material";
import { useSelector } from "react-redux";
import TuneIcon from "@mui/icons-material/Tune";
import SearchIcon from "@mui/icons-material/Search";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { RootState } from "@/shared/stores";
import { SearchbarSave } from "./searchbar-save";

const testData = [
  { label: "Item 1", id: 94 },
  { label: "Item 2", id: 95 },
  { label: "Item 3", id: 96 },
  { label: "Item 4", id: 97 },
  { label: "Item 5", id: 98 },
  { label: "Item 6", id: 99 },
];

const Searchbar = () => {
  // Get values from the searchbar slice of the Redux store
  const { showSearchBar } = useSelector((state: RootState) => state.searchbar);

  // Get the theme and check if the screen is lower than 'md' breakpoint
  const theme = useTheme();
  const mdAndLowerScreens = useMediaQuery(theme.breakpoints.down("md"));

  // Initialize the popover anchor element and the searchbar ref
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const searchbarRef = useRef<HTMLFormElement>(null);

  // Don't render the component if the showSearchBar's value is false
  if (!showSearchBar) return null;

  // Computed value to check if the popover is open
  const open = Boolean(popoverAnchorEl);

  // Methods

  return (
    <Paper
      component="form"
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
                  disabled={true}
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
                  value="latest"
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
                multiple
                options={testData}
                disableCloseOnSelect
                clearOnBlur
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
                multiple
                options={testData}
                disableCloseOnSelect
                freeSolo
                clearOnBlur
                filterOptions={(options, params) => {
                  const filter = createFilterOptions<{
                    label: string;
                    id: number;
                  }>();
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.label
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      label: inputValue,
                      id: -1,
                    });
                  }
                  return filtered;
                }}
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
                  <TextField {...params} label="Categories" placeholder="" />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Autocomplete
                multiple
                options={testData}
                disableCloseOnSelect
                freeSolo
                clearOnBlur
                filterOptions={(options, params) => {
                  const filter = createFilterOptions<{
                    label: string;
                    id: number;
                  }>();
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.label
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      label: inputValue,
                      id: -1,
                    });
                  }
                  return filtered;
                }}
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
                  <TextField {...params} label="Authors" placeholder="" />
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
