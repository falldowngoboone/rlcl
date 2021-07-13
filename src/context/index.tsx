import * as React from "react";

import { ListsStateProvider } from "./lists";
import { ItemsStateProvider } from "./items";

type AppProvidersProps = {
  children: React.ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ListsStateProvider>
      <ItemsStateProvider>{children}</ItemsStateProvider>
    </ListsStateProvider>
  );
}

export { AppProviders };
