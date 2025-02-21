import { Toolbar, Tab, Tabs, Container, AppBar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const HomeNavbar = () => {
  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        background: "#fff",
        boxShadow: "0 12px 26px 1px rgba(0,0,0,0.12)",
      }}
    >
      <Container maxWidth="xl" sx={{ paddingX: { xs: 0, md: "24px" } }}>
        <Toolbar variant="dense" disableGutters sx={{ minHeight: "unset" }}>
          <Tabs
            value={0}
            variant="scrollable"
            scrollButtons="auto"
            TabScrollButtonProps={{
              sx: {
                position: "absolute",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "30px",
                height: "30px",
                background: "#fff",
                opacity: 1,
                zIndex: 1,
                borderRadius: "50%",
                boxShadow: "0 0 5px 1px rgba(0,0,0, 0.2)",
                "&:first-of-type": {
                  left: {
                    xs: "30px",
                    md: "0",
                  },
                },
                "&:last-of-type": {
                  right: {
                    xs: "0",
                    md: "-30px",
                  },
                },
              },
            }}
            sx={{ width: "100%", minHeight: "unset" }}
            TabIndicatorProps={{ sx: { backgroundColor: "#f15008" } }}
          >
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              icon={<HomeIcon />}
              iconPosition="start"
              label="Home"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Two"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Three"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Four"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Five"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Six"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Seven"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Two"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Three"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Four"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Five"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Six"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Seven"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Two"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Three"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Four"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Five"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Six"
            />
            <Tab
              sx={{
                minHeight: "unset",
                textTransform: "none",
                "&.Mui-selected": { color: "#f15008" },
              }}
              label="Item Seven"
            />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { HomeNavbar };
