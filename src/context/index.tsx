import * as React from "react";
import { ThemeProvider } from "@emotion/react";

import theme from "../utils/theme";
import { ListsStateProvider } from "./lists";
import { ItemsStateProvider } from "./items";

type AppProvidersProps = {
  children: React.ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ListsStateProvider>
      <ItemsStateProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ItemsStateProvider>
    </ListsStateProvider>
  );
}

export { AppProviders };
