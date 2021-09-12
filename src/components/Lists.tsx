/** @jsxImportSource @emotion/react */

import Link from "next/link";
import { css, useTheme } from "@emotion/react";
import { List } from "../model";
import ListActions from "./ListActions";

type ListsProps = {
  lists: Pick<List, "id" | "name">[];
  onListSelect: (id: string) => void;
  selectedId?: string;
};

function Lists({ lists, onListSelect, selectedId }: ListsProps) {
  const theme = useTheme();

  return (
    <>
      {lists.length ? (
        <ol
          css={css`
            list-style-type: none;
            margin: 0;
            padding: 0 0 ${theme.space[3]};

            & > * + * {
              margin-top: 0.5rem;
            }
          `}
        >
          {lists.map(({ name, id }) => (
            <li
              key={id}
              css={[
                css`
                  padding: 8px 16px;
                  position: relative;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-radius: ${theme.radius.large};

                  &:hover,
                  &:focus-within {
                    background-color: ${theme.color.surfaceSecondary};
                  }
                `,
                selectedId === id &&
                  css`
                    background-color: ${theme.color.surfaceSecondary};
                    font-weight: 700;
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
              <ListActions id={id} />
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
