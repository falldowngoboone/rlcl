import * as React from "react";
import { useCreateItem } from "../context/items";
import { List } from "../model";

type AddItemFormProps = {
  list: List;
  onSubmit: (item: { id: string }) => void;
};

function AddItemForm({ list, onSubmit }: AddItemFormProps) {
  const [itemName, setItemName] = React.useState("");
  const { mutate: createItem } = useCreateItem();

  return (
    <form
      action={`lists/${list.id}/items`}
      method="POST"
      onSubmit={(event) => {
        event.preventDefault();
        if (itemName.trim()) {
          createItem(
            { name: itemName },
            {
              onSuccess(item) {
                console.log("new item:", item);
                onSubmit({ id: item.id });
              },
            }
          );
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
