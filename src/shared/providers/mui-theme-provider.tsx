import { MuiDefaultTheme } from "@/shared/themes";
import { ThemeProvider } from "@mui/material";
import { WrapperComponentProps } from "@/shared/types";

const MuiThemeProvider = ({ children }: WrapperComponentProps) => (
  <ThemeProvider theme={MuiDefaultTheme}>{children}</ThemeProvider>
);

export { MuiThemeProvider };
