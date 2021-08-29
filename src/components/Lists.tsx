/** @jsxImportSource @emotion/react */

import Link from "next/link";
import { css } from "@emotion/react";
import { List } from "../model";
import { useRemoveList } from "../context/lists";
import IconButton from "./IconButton";

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
            margin: 0;
          `}
        >
          {lists.map(({ name, id }) => (
            <li
              key={id}
              css={[
                css`
                  padding: 8px 24px;
                  position: relative;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  &:hover,
                  &:focus-within {
                    background-color: #e0dbff;
                  }
                `,
                selectedId === id &&
                  css`
                    background-color: #8b79f9;
                    color: #ffffff;

                    &:hover,
                    &:focus-within {
                      background-color: #8b79f9;
                    }
                  `,
              ]}
            >
              <Link href={`/lists/${id}`} passHref>
                <a
                  css={css`
                    text-decoration: none;

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
              <IconButton
                css={css`
                  position: relative;
                  z-index: 1;
                  align-self: flex-start;
                  opacity: 0;

                  *:hover > &,
                  &:focus-within {
                    opacity: 1;
                  }
                `}
                variant="trash"
                label="Delete"
                onClick={() => removeList({ id })}
              />
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
