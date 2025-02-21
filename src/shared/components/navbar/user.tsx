import { Avatar, IconButton } from "@mui/material";

const User = () => {
  return (
    <IconButton sx={{ p: 0 }}>
      <Avatar alt="John Doe" src="https://i.pravatar.cc/40" />
    </IconButton>
  );
};

export { User };
