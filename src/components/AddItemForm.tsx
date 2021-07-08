import * as React from "react";
import { Item, List } from "../model";

type AddItemFormProps = {
  list: List;
  items: Item[];
  onSubmit: (item: Item) => void;
};

function AddItemForm({ list, items, onSubmit }: AddItemFormProps) {
  const [itemName, setItemName] = React.useState("");

  return (
    <form
      action="/list"
      onSubmit={(event) => {
        event.preventDefault();
        if (itemName.trim()) {
          onSubmit(new Item(itemName));
          setItemName("");
        }
      }}
    >
      <input type="hidden" name="list-id" value={list.id} />
      <input type="hidden" name="item-id" value="" />
      <input
        type="text"
        name="item-name"
        value={itemName}
        onChange={(event) => {
          setItemName(event.target.value);
        }}
      />
    </form>
  );
}

export default AddItemForm;
