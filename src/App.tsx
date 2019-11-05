import React from 'react';

import {
  useItemsState,
  useItemsDispatch,
  addItem,
  removeItem,
  updateItem,
} from './store';

function App() {
  const { items } = useItemsState();
  const dispatch = useItemsDispatch();

  function handleAddItem() {
    addItem(dispatch, 'New item');
  }

  function handleChangeItem(event: React.FormEvent<HTMLInputElement>) {
    const target = event.currentTarget;
    const [, id] = target.name.split('-');

    const changedItem = items.find(i => i.id === id);

    if (!changedItem) {
      return;
    }

    if (!target.value.trim()) {
      removeItem(dispatch, changedItem);
      return;
    }

    if (target.type === 'checkbox') {
      changedItem.done = target.checked;
    } else if (target.value.trim()) {
      changedItem.value = target.value;
    }

    updateItem(dispatch, changedItem);
  }

  return (
    <main className="page">
      <h1>rlcl</h1>
      <p>A personal roll call for all your things.</p>
      <ol>
        {items.map(item => (
          <li key={item.id}>
            <ListItem onUpdate={handleChangeItem} {...item} />
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
  onUpdate: React.FormEventHandler<HTMLInputElement>;
};

function ListItem({ id, value, done, onUpdate }: ListItemProps) {
  const [inputVal, setInputVal] = React.useState(value);
  return (
    <span>
      <input
        name={`item-${id}-checked`}
        type="checkbox"
        checked={done}
        onChange={onUpdate}
      />
      <input
        name={`item-${id}-value`}
        value={inputVal}
        onBlur={onUpdate}
        onChange={e => setInputVal(e.target.value)}
      />
    </span>
  );
}

export default App;
