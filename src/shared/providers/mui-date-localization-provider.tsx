import { WrapperComponentProps } from "@/shared/types";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MuiDateLocalizationProvider = ({ children }: WrapperComponentProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
};

export { MuiDateLocalizationProvider };
