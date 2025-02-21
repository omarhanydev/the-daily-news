import { Navbar } from "@/shared/components/navbar";
import { WrapperComponentProps } from "@/shared/types";
import { ReactHotToast } from "@/shared/components/toast";

const BaseLayout = ({ children }: WrapperComponentProps) => {
  return (
    <>
      <Navbar />
      {children}
      <ReactHotToast />
    </>
  );
};

export { BaseLayout };
