import { MuiDateLocalizationProvider } from "@/shared/providers/mui-date-localization-provider";
import { MuiThemeProvider } from "@/shared/providers/mui-theme-provider";
import { ReduxStoreProvider } from "@/shared/providers/redux-store-provider";
import { WrapperComponentProps } from "@/shared/types";
import { dayjsInit } from "./dayjs-init";

dayjsInit();

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
