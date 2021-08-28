/** @jsxImportSource @emotion/react */

import Link from "next/link";
import { css } from "@emotion/react";
import { List } from "../model";
import { useRemoveList } from "../context/lists";

type ListsProps = {
  lists: Pick<List, "id" | "name">[];
  onListSelect: (id: string) => void;
  selectedId?: string;
};

function Lists({ lists, onListSelect, selectedId }: ListsProps) {
  const { mutate: removeList } = useRemoveList();

  return (
    <>
      {lists.length ? (
        <ol
          css={css`
            list-style-type: none;
            padding: 0;

            & > * + * {
              margin-top: 8px;
            }
          `}
        >
          {lists.map(({ name, id }) => (
            <li
              key={id}
              css={[
                css`
                  padding: 16px;
                  position: relative;
                  border-radius: 8px;

                  &:hover {
                    background-color: #e0dbff;
                  }
                `,
                selectedId === id &&
                  css`
                    background-color: #8b79f9;
                    color: #ffffff;

                    &:hover {
                      background-color: #8b79f9;
                    }
                  `,
              ]}
            >
              <Link href={`/lists/${id}`}>
                <a
                  css={css`
                    &::before {
                      content: "";
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                    }
                  `}
                  onClick={(event) => {
                    onListSelect(id);
                    event.preventDefault();
                  }}
                >
                  {name}
                </a>
              </Link>
              <button
                css={css`
                  position: relative;
                  z-index: 1;
                `}
                onClick={() => removeList({ id })}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p>Get started by adding a trip!</p>
      )}
    </>
  );
}

export default Lists;
