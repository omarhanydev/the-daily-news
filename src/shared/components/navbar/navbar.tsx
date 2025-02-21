import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Logo } from "./logo";
import { Searchbar } from "./searchbar";
import { User } from "./user";

const Navbar = () => {
  return (
    <>
      <AppBar
        position="static"
        color="default"
        sx={{ background: "#F0EDE2", boxShadow: "none" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Logo />

            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: "flex",
                mr: 2,
              }}
            >
              <Searchbar />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <User />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export { Navbar };
