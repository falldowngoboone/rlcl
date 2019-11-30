import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Button } from './Button';

type LayoutProps = {
  children: React.ReactNode;
  isEditable: boolean;
  onToggleEdit: () => void;
};

export function Layout({ children, isEditable, onToggleEdit }: LayoutProps) {
  return (
    <Page>
      <GlobalStyle />
      <header>
        <h1>rlcl</h1>
      </header>
      <Main>{children}</Main>
      <Footer>
        <Button onClick={onToggleEdit}>{isEditable ? 'Done' : 'Edit'}</Button>
      </Footer>
    </Page>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  html {
    font-size: 125%;
    text-size-adjust: none;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* background-color: #eee; */
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

const Container = styled.div`
  padding: 0.5em;
  max-width: 40em;
  margin: 0 auto;
  box-sizing: border-box;

  @media screen and (min-width: 500px) {
    padding: 1.5em;
  }
`;

const Page = styled(Container)`
  padding-bottom: 5em;
  background-color: white;
  min-height: 100%;

  & > * {
    margin: 0;
  }

  & > * + * {
    margin-top: 1.5em;
  }

  @media screen and (min-width: 500px) {
    padding-bottom: 5em;
  }
`;

const Main = styled.main`
  & > * {
    margin: 0;
  }

  & > * + * {
    margin-top: 1.5em;
  }
`;

const Footer = styled(Container).attrs({ as: 'footer' })`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
`;
