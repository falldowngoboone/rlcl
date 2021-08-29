/** @jsxImportSource @emotion/react */

import * as React from "react";
import Head from "next/head";
import { css } from "@emotion/react";

import Lists from "../components/Lists";
import Detail from "../components/Detail";
import { useCreateList, useLists } from "../context/lists";

function App() {
  const [lists] = useLists();
  const [selectedListId, setSelectedListId] = React.useState<string>();
  const { mutate: createList } = useCreateList();

  const selectedList = lists.find((list) => list.id === selectedListId);

  return (
    <div
      css={css`
        display: flex;
        height: 100vh;
      `}
    >
      <Head>
        <title>Roll Call</title>
        <meta name="description" content="Yet another packing list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        css={css`
          flex: 0 0 300px;
          overflow-y: auto;
          background-color: #f4f3fa;
        `}
      >
        <div
          css={css`
            position: sticky;
            top: 0;
            padding: 40px 24px 16px;
            background-color: #f4f3fa;
            z-index: 2;
          `}
        >
          <h2
            css={css`
              margin: 0;
            `}
          >
            Your Lists
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              createList(
                { name: "New List" },
                {
                  onSuccess(newItem) {
                    setSelectedListId(newItem.id);
                  },
                }
              );
            }}
          >
            New
          </button>
        </div>
        <Lists
          lists={lists}
          onListSelect={(id) => {
            setSelectedListId(id);
          }}
          selectedId={selectedListId}
        />
      </section>
      <div
        css={css`
          width: 100%;
          overflow-y: auto;

          & > * {
            max-width: 436px;
            margin: auto;
          }
        `}
      >
        {selectedList ? <Detail list={selectedList} /> : "Select a list!"}
      </div>
      <footer
        css={css`
          padding: 1rem;
          position: fixed;
          bottom: 1rem;
          right: 1rem;
        `}
      >
        ©2021 Ryan Boone
      </footer>
    </div>
  );
}

export default App;
