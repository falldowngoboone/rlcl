import * as React from "react";
import AddItemForm from "./AddItemForm";
import ListItem from "./ListItem";
import { List } from "../model";
import { useUpdateList } from "../context/lists";
import { useListItems } from "../context/items";

type DetailProps = {
  list: List;
};

function Detail({ list }: DetailProps) {
  const { mutate: updateList } = useUpdateList();
  const listItems = useListItems(list.id);

  const handleToggle = React.useCallback(
    (itemId: string, checked: boolean) => {
      if (checked) {
        updateList({ id: list.id, checked: list.checked.concat(itemId) });
      } else {
        updateList({
          id: list.id,
          checked: list.checked.filter((id) => id !== itemId),
        });
      }
    },
    [updateList, list.checked, list.id]
  );

  const handleAddItem = React.useCallback(
    ({ id }: { id: string }) => {
      updateList({ id: list.id, items: [id].concat(list.items) });
    },
    [list.items, updateList, list.id]
  );

  return (
    <main>
      <h1>
        <input
          style={{
            font: "inherit",
            padding: ".25em",
            marginLeft: "-.25em",
            marginRight: "-.25em",
            WebkitAppearance: "none",
            border: "none",
            borderRadius: "0.25rem",
          }}
          type="text"
          value={list.name}
          onChange={(event) =>
            updateList({ id: list.id, name: event.target.value })
          }
        />
      </h1>
      <div>
        <AddItemForm
          list={list}
          onSubmit={(item) => {
            handleAddItem(item);
          }}
        />
        <ul>
          {listItems.map((item) => (
            <li key={item.id}>
              <ListItem
                item={item}
                onToggle={(checked) => handleToggle(item.id, checked)}
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
