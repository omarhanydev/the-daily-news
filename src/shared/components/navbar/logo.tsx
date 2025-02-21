import { Link, Box } from "@mui/material";
import logo from "/logo.png";

const Logo = () => {
  return (
    <Link
      href="/"
      sx={{
        mr: 2,
        display: "flex",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 70,
          width: "auto",
        }}
        alt="The Daily News"
        src={logo}
      />
    </Link>
  );
};

export { Logo };
