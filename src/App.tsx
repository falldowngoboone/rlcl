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
        padding: 0.5em;
        max-width: 40em;
        margin: 0 auto;
        background-color: white;

        @media screen and (min-width: 500px) {
          padding: 1.5em;
        }
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
        <Button onClick={handleAddItem} type="button">
          + Add Item
        </Button>
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
    <Form
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
        aria-label={`Mark ${item.value} as ${
          item.done ? 'unpacked' : 'packed'
        }`}
      />
      <Input
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
        aria-label="item"
      />
      <Button
        type="button"
        onClick={() => onReorder(index, index - 1)}
        aria-label={`Move ${item.value} up a position`}
      >
        ⬆︎
      </Button>{' '}
      <Button
        type="button"
        onClick={() => onReorder(index, index + 1)}
        aria-label={`Move ${item.value} down a position`}
      >
        ⬇︎
      </Button>
    </Form>
  );
}

export default App;

const List = styled.ol`
  font-size: 1.25em;
  list-style-type: none;
  padding: 0;

  & > * + * {
    margin-top: 0.25em;
  }

  @media screen and (min-width: 500px) {
    font-size: 1.5em;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  font-size: 1em;
  font-family: inherit;
  border: none;
  flex: 1 1 auto;
  min-width: 0px;
  border-radius: 6px;
  padding: 0.25em 0.5em;
  line-height: 1;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    background-color: #eee;
  }

  &:active {
    background-color: #ddd;
  }

  @media screen and (pointer: fine) {
    &:hover {
      background-color: #eee;
    }

    &:active {
      background-color: #ddd;
    }
  }
`;

const Button = styled.button.attrs({ type: 'button' })`
  font-size: 1em;
  font-family: inherit;
  appearance: none;
  display: inline-block;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 6px;
  padding: 0.25em 0.5em;
  line-height: 1;
  transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    background-color: #eee;
  }

  &:active {
    background-color: #ddd;
    color: inherit;
    transition-duration: 0.1s;
  }

  &::-moz-focus-inner {
    border: none;
  }

  @media screen and (pointer: fine) {
    &:hover {
      background-color: #eee;
    }

    &:active {
      background-color: #ddd;
      color: inherit;
    }
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  height: 1em;
  width: 1em;
  display: inline-block;
  font-size: inherit;
  line-height: inherit;
  vertical-align: text-bottom;
  flex: 0 0 auto;
`;
