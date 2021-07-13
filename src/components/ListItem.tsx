import * as React from "react";
import { useUpdateItem } from "../context/items";

import { Item } from "../model";

type ListItemProps = {
  item: Item;
  onToggle: (checked: boolean) => void;
  checked: boolean;
};

function ListItem({ item, checked, onToggle }: ListItemProps) {
  const [editView, setEditView] = React.useState(false);
  const [itemName, setItemName] = React.useState(item.name);
  const nameEditInput = React.useRef<HTMLInputElement>(null);
  const { mutate: updateItem } = useUpdateItem();

  React.useEffect(() => {
    if (editView && nameEditInput.current) {
      nameEditInput.current.select();
    }
  }, [editView]);

  const handleUpdateName = React.useCallback(
    (event: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
      const newName = itemName.trim();

      if (newName && newName !== item.name) {
        updateItem({ id: item.id, name: newName });
      } else {
        setItemName(item.name);
      }

      setEditView(false);

      event.preventDefault();
    },
    [item.name, itemName, item.id, updateItem]
  );

  const handleFormKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          setItemName(item.name);
          setEditView(false);
          break;
        default:
          return;
      }

      event.preventDefault();
    },
    [item.name]
  );

  return editView ? (
    <form action="/" onSubmit={handleUpdateName} onKeyDown={handleFormKeyDown}>
      <input
        type="text"
        name="itemName"
        value={itemName}
        ref={nameEditInput}
        onChange={(event) => {
          setItemName(event.target.value);
        }}
        onBlur={handleUpdateName}
      />
    </form>
  ) : (
    <div>
      <label>
        <input
          type="checkbox"
          name="itemChecked"
          checked={checked}
          onChange={(event) => {
            console.log(event.target.checked);
            onToggle(event.target.checked);
          }}
        />{" "}
        {item.name}
      </label>
      <button onClick={() => setEditView(true)}>Edit</button>
    </div>
  );
}

export default ListItem;
