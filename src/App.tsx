import { Home } from "@/pages/home";
import { BaseLayout } from "@/shared/components/layout";
import { Providers } from "@/shared/providers";
import { CssReset } from "@/shared/components/global-styles";
import "./App.scss";

function App() {
  return (
    <>
      <Providers>
        <CssReset />
        <BaseLayout>
          <Home />
        </BaseLayout>
      </Providers>
    </>
  );
}

export default App;
