import { MuiDateLocalizationProvider } from "@/shared/providers/mui-date-localization-provider";
import { MuiThemeProvider } from "@/shared/providers/mui-theme-provider";
import { ReduxStoreProvider } from "./redux-store-provider";
import { WrapperComponentProps } from "@/shared/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Providers = ({ children }: WrapperComponentProps) => {
  return (
    <MuiThemeProvider>
      <MuiDateLocalizationProvider>
        <ReduxStoreProvider>{children}</ReduxStoreProvider>
      </MuiDateLocalizationProvider>
    </MuiThemeProvider>
  );
};

export { Providers };
