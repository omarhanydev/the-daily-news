import { Toolbar, Tab, Tabs, Container, AppBar } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/stores";
import { useMemo } from "react";
const HomeNavbar = () => {
  const { filteredArticles } = useSelector(
    (state: RootState) => state.searchbar
  );

  const computedCategories = useMemo(() => {
    const categories = [
      ...new Set([
        ...filteredArticles
          .filter((article) => article.category)
          .map((article) => article.category),
      ]),
    ];
    return categories.map((category) => ({
      label: category,
      count: filteredArticles.filter((article) => article.category === category)
        .length,
    }));
  }, [filteredArticles]);

  console.log(computedCategories);

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
              icon={<AllInclusiveIcon />}
              iconPosition="start"
              label={`All (${filteredArticles.length})`}
            />
            {computedCategories.map((category) => (
              <Tab
                key={category.label}
                sx={{
                  minHeight: "unset",
                  textTransform: "none",
                  "&.Mui-selected": { color: "#f15008" },
                }}
                label={`${category.label} (${category.count})`}
              />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { HomeNavbar };
