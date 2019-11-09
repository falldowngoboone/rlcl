import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import 'styled-components/macro';
import {
  useItemsState,
  useItemsDispatch,
  addItem,
  removeItem,
  updateItem,
  reorderItems,
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
    addItem(dispatch, '');
  }

  function handleChangeItem(item: Item) {
    if (!item.value) {
      removeItem(dispatch, item);
      return;
    }

    updateItem(dispatch, item);
  }

  function handleReorderItems(from: number, to: number) {
    reorderItems(dispatch, from, to);
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
            {items.map((item, index) => (
              <li key={item.id}>
                <ListItem
                  onUpdate={handleChangeItem}
                  onReorder={handleReorderItems}
                  item={item}
                  index={index}
                  {...item}
                />
              </li>
            ))}
          </List>
        )}
        <button onClick={handleAddItem} type="button">
          Add Item
        </button>
      </main>
    </div>
  );
}

type ListItemProps = {
  item: Item;
  index: number;
  onUpdate: (item: Item) => void;
  onReorder: (from: number, to: number) => void;
};

function ListItem({ item, index, onUpdate, onReorder }: ListItemProps) {
  const [inputVal, setInputVal] = React.useState(item.value);
  const input = React.useRef<HTMLInputElement | null>(null);
  const checkbox = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (input.current && !input.current.value) {
      input.current.focus();
    }
  }, []);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onUpdate({
          ...item,
          done: checkbox.current ? checkbox.current.checked : false,
          value: input.current ? input.current.value.trim() : '',
        });
        input.current && input.current.blur();
      }}
    >
      <Checkbox
        checked={item.done}
        id={`item-${item.id}-checked`}
        name="itemDone"
        onChange={event => {
          onUpdate({ ...item, done: event.currentTarget.checked });
        }}
        ref={checkbox}
      />
      <StyledInput
        id={`item-${item.id}-value`}
        name="itemValue"
        onBlur={event => {
          onUpdate({ ...item, value: event.currentTarget.value.trim() });
        }}
        onChange={e => setInputVal(e.currentTarget.value)}
        onClick={e => e.currentTarget.select()}
        value={inputVal}
        placeholder="New Item"
        ref={input}
      />
      <button type="button" onClick={() => onReorder(index, index - 1)}>
        ⬆︎
      </button>{' '}
      <button type="button" onClick={() => onReorder(index, index + 1)}>
        ⬇︎
      </button>
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

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  height: 1em;
  width: 1em;
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  vertical-align: text-bottom;
`;
