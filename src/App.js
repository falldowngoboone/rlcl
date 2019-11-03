import React from 'react';
import uniqid from 'uniqid';

function App({initialItems = []}) {
  const [items, setItems] = React.useState(initialItems);

  React.useEffect(() => {
    saveItems(items);
  }, [items]);

  function handleAddItem() {
    setItems([...items, createItem('New item')]);
  }

  function handleChangeItem(e) {
    const target = e.target;
    const [, id, prop] = target.name.split('-');

    if (prop === 'value' && target.value.trim() === '') {
      setItems(items.filter(i => i.id !== id));
      return;
    }

    const index = items.findIndex(i => i.id === id);
    const newItems = [...items];

    newItems[index][prop] = target.type === 'checkbox'
      ? target.checked : target.value;
    
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

function ListItem({ id, value, checked, onChange }) {
  return (
    <span>
      <input
        name={`item-${id}-checked`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <input
        name={`item-${id}-value`}
        value={value}
        onChange={onChange}
      />
    </span>
  )
}

export default App;

function createItem(value) {
  return { id: `${uniqid()}`, value, checked: false };
}

function saveItems(items) {
  localStorage.setItem('rlcl-items', JSON.stringify(items));
}