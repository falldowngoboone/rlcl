/** @jsxImportSource @emotion/react */

import * as React from "react";
import { css } from "@emotion/react";
import AddItemForm from "./AddItemForm";
import ListItem from "./ListItem";
import { List } from "../model";
import { useUpdateList } from "../context/lists";
import { useListItems } from "../context/items";
import ContentEditable from "./ContentEditable";

type DetailProps = {
  list: List;
};

function Detail({ list }: DetailProps) {
  const { mutate: updateList } = useUpdateList();
  const listItems = useListItems(list.id);

  const handleToggle = React.useCallback(
    (itemId: string, checked: boolean) => {
      if (checked) {
        updateList({ ...list, checked: list.checked.concat(itemId) });
      } else {
        updateList({
          ...list,
          checked: list.checked.filter((id) => id !== itemId),
        });
      }
    },
    [updateList, list]
  );

  const handleAddItem = React.useCallback(
    ({ id }: { id: string }) => {
      updateList({ ...list, items: [id].concat(list.items) });
    },
    [updateList, list]
  );

  const handleRemoveItem = React.useCallback(
    (id: string) => {
      updateList({
        ...list,
        items: list.items.filter((itemId) => itemId !== id),
      });
    },
    [updateList, list]
  );

  return (
    <main>
      <ContentEditable
        as="h1"
        initialValue={list.name}
        onChange={(name) => {
          name && updateList({ id: list.id, name });
        }}
      />
      <div>
        <AddItemForm list={list} onSubmit={handleAddItem} />
        <ul
          css={css`
            list-style-type: none;
            padding: 0;

            & > * + * {
              margin-top: 8px;
            }
          `}
        >
          {listItems.map((item) => (
            <li
              key={item.id}
              css={css`
                display: flex;
                justify-content: space-between;
                padding: 8px;
                margin-left: -8px;
                margin-right: -8px;

                &:hover,
                &:focus-within {
                  background-color: #f9f9fc;
                }
              `}
            >
              <ListItem
                item={item}
                onToggle={(checked) => handleToggle(item.id, checked)}
                onRemove={() => handleRemoveItem(item.id)}
                checked={list.checked.includes(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Detail;
