import * as React from "react";

import { Item } from "../model";

type ListItemProps = {
  item: Item;
  onUpdate: (updates: Partial<Item>) => void;
};

function ListItem({ item, onUpdate }: ListItemProps) {
  const [editView, setEditView] = React.useState(false);
  const [itemName, setItemName] = React.useState(item.name);
  const nameEditInput = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (editView && nameEditInput.current) {
      nameEditInput.current.select();
    }
  }, [editView]);

  const handleUpdateName = React.useCallback(
    (event: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
      const newName = itemName.trim();

      if (newName && newName !== item.name) {
        onUpdate({ name: newName });
      } else {
        setItemName(item.name);
      }

      setEditView(false);

      event.preventDefault();
    },
    [item.name, itemName, onUpdate]
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
          checked={item.checked}
          onChange={(event) => {
            onUpdate({ checked: event.target.checked });
          }}
        />{" "}
        {item.name}
      </label>
      <button onClick={() => setEditView(true)}>Edit</button>
    </div>
  );
}

export default ListItem;
