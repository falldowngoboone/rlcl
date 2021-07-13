import * as React from "react";
import Head from "next/head";
import styled from "@emotion/styled";

import Header from "../components/Header";
import Lists from "../components/Lists";
import Detail from "../components/Detail";
import { List } from "../model";
import { useLists } from "../context/lists";

type AppState = {
  lists: List[];
  selectedListId?: string;
};

function App() {
  const [lists] = useLists();
  const [selectedListId, setSelectedListId] = React.useState<string>();

  const { selectedList } = appState({
    lists,
    selectedListId,
  });

  return (
    <Page>
      <Head>
        <title>Roll Call</title>
        <meta name="description" content="Yet another packing list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div style={{ display: "flex" }}>
        <Lists
          lists={lists}
          onListSelect={(id) => {
            setSelectedListId(id);
          }}
        />
        {selectedList ? <Detail list={selectedList} /> : null}
      </div>
      <Footer>©2021 Ryan Boone</Footer>
    </Page>
  );
}

function appState({ lists, selectedListId }: AppState) {
  const selectedList = selectedListId
    ? lists.find((list) => list.id === selectedListId)
    : null;

  return {
    selectedList,
    selectedListIndex: lists.findIndex((list) => list === selectedList),
  };
}

const Page = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
`;

const Footer = styled.footer`
  padding: 1rem;
`;

export default App;
