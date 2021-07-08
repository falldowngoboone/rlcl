import * as React from "react";

import { ListsStateProvider } from "./lists";

type AppProvidersProps = {
  children: React.ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return <ListsStateProvider>{children}</ListsStateProvider>;
}

export { AppProviders };
