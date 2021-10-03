import "../styles/globals.css";
import type { AppProps } from "next/app";

import { AppProviders } from "../context/index";
import { Auth } from "../context/auth-context";
import type { NextComponentType, NextPageContext } from "next";

type AuthComponent = NextComponentType<NextPageContext, any, {}> & {
  authRequired?: boolean;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { Component: AuthComponent }) {
  return (
    <AppProviders session={session}>
      {Component.authRequired ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </AppProviders>
  );
}
export default MyApp;
