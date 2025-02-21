import { Provider } from "react-redux";
import { WrapperComponentProps } from "@/shared/types";
import { store } from "@/shared/stores";

const ReduxStoreProvider = ({ children }: WrapperComponentProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export { ReduxStoreProvider };
