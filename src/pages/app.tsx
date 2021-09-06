/** @jsxImportSource @emotion/react */

import * as React from "react";
import Head from "next/head";
import { css, useTheme } from "@emotion/react";

import Lists from "../components/Lists";
import Detail from "../components/Detail";
import { useCreateList, useLists } from "../context/lists";

function App() {
  const [lists] = useLists();
  const [selectedListId, setSelectedListId] = React.useState<string>();
  const { mutate: createList } = useCreateList();
  const theme = useTheme();

  const selectedList = lists.find((list) => list.id === selectedListId);

  return (
    <div
      css={css`
        display: flex;
        height: 100vh;
        color: ${theme.color.textPrimary};
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
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;

          & > * + * {
            margin-top: ${theme.space[2]};
          }
        `}
      >
        <div
          css={css`
            padding-left: ${theme.space[3]};
            padding-right: ${theme.space[3]};
          `}
        >
          Account Information
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            padding-left: ${theme.space[3]};
            padding-right: ${theme.space[3]};
          `}
        >
          <h2
            css={css`
              margin: 0;
              font-size: 20px;
            `}
          >
            Your Lists
          </h2>
          <button
            css={css`
              appearance: none;
              color: ${theme.color.textCallout};
              background-color: ${theme.color.surfaceCallout};
              border: 0;
              border-radius: ${theme.radius.small};
              display: inline-block;
              padding: 0 8px;
            `}
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
        <div
          css={css`
            max-height: 100%;
            overflow-y: auto;
            padding-left: ${theme.space[3]};
            padding-right: ${theme.space[3]};
          `}
        >
          <Lists
            lists={lists}
            onListSelect={(id) => {
              setSelectedListId(id);
            }}
            selectedId={selectedListId}
          />
        </div>
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
