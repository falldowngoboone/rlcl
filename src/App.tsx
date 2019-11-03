import React from 'react';

import { Item } from './models';

type AppProps = {
  initialItems: Item[];
};

function App({ initialItems = [] }: AppProps) {
  const [items, setItems] = React.useState<Item[]>(initialItems);

  React.useEffect(() => {
    saveItems(items);
  }, [items]);

  function handleAddItem() {
    setItems([...items, new Item('New item')]);
  }

  function handleChangeItem(e: React.FormEvent<HTMLInputElement>) {
    const target = e.currentTarget;
    const [, id, prop] = target.name.split('-');

    if (prop === 'value' && target.value.trim() === '') {
      setItems(items.filter(i => i.id !== id));
      return;
    }

    const index = items.findIndex(i => i.id === id);
    const newItems = [...items];

    if (target.type === 'checkbox') {
      newItems[index].done = target.checked;
    } else {
      newItems[index].value = target.value;
    }

    setItems(newItems);
  }

  return (
    <main className="page">
      <h1>rlcl</h1>
      <p>A personal roll call for all your things.</p>
      <ol>
        {items.map(item => (
          <li key={item.id}>
            <ListItem id={item.id} onChange={handleChangeItem} {...item} />
          </li>
        ))}
      </ol>
      <button onClick={handleAddItem}>Add Item</button>
    </main>
  );
}

type ListItemProps = {
  id: string;
  value: string;
  done: boolean;
  onChange: React.FormEventHandler<HTMLInputElement>;
};

function ListItem({ id, value, done, onChange }: ListItemProps) {
  return (
    <span>
      <input
        name={`item-${id}-checked`}
        type="checkbox"
        checked={done}
        onChange={onChange}
      />
      <input name={`item-${id}-value`} value={value} onChange={onChange} />
    </span>
  );
}

export default App;

function saveItems(items: Item[]): void {
  localStorage.setItem('rlcl-items', JSON.stringify(items));
}
