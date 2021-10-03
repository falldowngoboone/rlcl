import * as React from "react";
import { ThemeProvider } from "@emotion/react";

import theme from "../utils/theme";

import { SessionProvider } from "./auth-context";
import { ListsStateProvider } from "./lists";
import { ItemsStateProvider } from "./items";

import type { Session } from "next-auth";

type AppProvidersProps = {
  session?: Session;
  children: React.ReactNode;
};

function AppProviders({ session, children }: AppProvidersProps) {
  return (
    <SessionProvider session={session}>
      <ListsStateProvider>
        <ItemsStateProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ItemsStateProvider>
      </ListsStateProvider>
    </SessionProvider>
  );
}

export { AppProviders };
