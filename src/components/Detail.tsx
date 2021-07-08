import * as React from "react";
import AddItemForm from "./AddItemForm";
import ListItem from "./ListItem";
import { List, Item } from "../model";

type DetailProps = {
  list: List;
  onItemAdd: (item: Item) => void;
  onItemUpdate: (id: string, updates: Partial<Item>) => void;
};

function Detail({ list, onItemAdd, onItemUpdate }: DetailProps) {
  return (
    <main>
      <h1>{list.name}</h1>
      <div>
        <AddItemForm
          list={list}
          items={[]}
          onSubmit={(item) => {
            onItemAdd(item);
          }}
        />
        <ul>
          {list.items.map((item) => (
            <li key={item.id}>
              <ListItem
                item={item}
                onUpdate={(updates) => onItemUpdate(item.id, updates)}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Detail;
