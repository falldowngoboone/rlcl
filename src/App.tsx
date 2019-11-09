import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import 'styled-components/macro';
import {
  useItemsState,
  useItemsDispatch,
  addItem,
  removeItem,
  updateItem,
} from './store';
import { Item } from './models';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: #eee;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

function App() {
  const { items } = useItemsState();
  const dispatch = useItemsDispatch();

  function handleAddItem() {
    addItem(dispatch, 'New item');
  }

  function handleChangeItem(item: Item) {
    const index = items.findIndex(i => i.id === item.id);

    if (index === -1) {
      return;
    }

    if (!item.value) {
      removeItem(dispatch, item);
      return;
    }

    updateItem(dispatch, item);
  }

  return (
    <div
      css={css`
        padding: 1.5em;
        max-width: 40em;
        margin: 0 auto;
        background-color: white;
      `}
    >
      <GlobalStyle />
      <header>
        <h1>rlcl</h1>
        <p>A personal roll call for all your things.</p>
      </header>
      <main>
        {Boolean(items.length) && (
          <List>
            {items.map(item => (
              <li key={item.id}>
                <ListItem onUpdate={handleChangeItem} item={item} {...item} />
              </li>
            ))}
          </List>
        )}
        <button onClick={handleAddItem}>Add Item</button>
      </main>
    </div>
  );
}

type ListItemProps = {
  item: Item;
  onUpdate: (item: Item) => void;
};

function ListItem({ item, onUpdate }: ListItemProps) {
  const [inputVal, setInputVal] = React.useState(item.value);

  return (
    <form
      onSubmit={event => {
        const { doneInput, valueInput } = event.currentTarget;
        onUpdate({
          ...item,
          done: doneInput.checked,
          value: valueInput.value.trim(),
        });
        event.preventDefault();
      }}
    >
      <input
        checked={item.done}
        id={`item-${item.id}-checked`}
        name="itemDone"
        onChange={event => {
          onUpdate({ ...item, done: event.currentTarget.checked });
        }}
        type="checkbox"
      />
      <StyledInput
        id={`item-${item.id}-value`}
        name="itemValue"
        onBlur={event => {
          onUpdate({ ...item, value: event.currentTarget.value.trim() });
        }}
        onChange={e => setInputVal(e.currentTarget.value)}
        onFocus={e => e.currentTarget.select()}
        value={inputVal}
      />
    </form>
  );
}

export default App;

const List = styled.ol`
  font-size: 1.5em;
  list-style-type: none;
  padding: 0;
`;

const StyledInput = styled.input`
  font-size: 1em;
  font-family: inherit;
  border: none;
`;
