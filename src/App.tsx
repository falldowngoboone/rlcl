import React from 'react';
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import styled, { css, createGlobalStyle } from 'styled-components';
import 'styled-components/macro';

import { ActionableItem } from './service/actionable-items';
import {
  useActionableItemsState,
  useActionableItemsDispatch,
  addActionableItem,
  removeActionableItem,
  updateActionableItem,
  reorderActionableItems,
  useActionableItemsService,
} from './store/actionable-items';

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
  const itemsService = useActionableItemsService();
  const itemsState = useActionableItemsState();
  const dispatch = useActionableItemsDispatch();
  const [items, setItems] = React.useState(itemsState.items);
  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    setItems(itemsState.items);
  }, [itemsState.items]);

  function handleAddItem() {
    addActionableItem(dispatch, itemsService, '');
  }

  function handleChangeItem(item: ActionableItem) {
    if (!item.value) {
      removeActionableItem(dispatch, itemsService, item);
      return;
    }

    updateActionableItem(dispatch, itemsService, item);
  }

  function onDragStart() {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  function onDragEnd(result: DropResult) {
    // combining item
    if (result.combine) {
      // super simple: just removing the dragging item
      const newItems: ActionableItem[] = [...items];
      newItems.splice(result.source.index, 1);
      setItems(newItems);
      return;
    }

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    reorderActionableItems(
      dispatch,
      itemsService,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
          <div
            css={css`
              display: flex;
              align-items: baseline;
              justify-content: space-between;
            `}
          >
            <p
              css={css`
                margin: 0;
              `}
            >
              A personal roll call for all your things.
            </p>
            <Button
              onClick={() => {
                setIsEditable(b => !b);
              }}
            >
              {isEditable ? 'Done' : 'Edit'}
            </Button>
          </div>
        </header>
        <main>
          {Boolean(items.length) && (
            <Droppable droppableId="item">
              {(provided: DroppableProvided) => (
                <List ref={provided.innerRef} {...provided.droppableProps}>
                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(
                        provided: DraggableProvided,
                        snapshot: DraggableStateSnapshot
                      ) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: snapshot.isDragging
                              ? '0 5px 15px 0 rgba(0, 0, 0, 0.2)'
                              : 'none',
                            boxSizing: 'border-box',
                            display: 'block',
                            padding: isEditable ? '5px' : '0',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <ListItem
                            onUpdate={handleChangeItem}
                            item={item}
                            handleProps={provided.dragHandleProps}
                            isEditable={isEditable}
                            {...item}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          )}
          <Button onClick={handleAddItem} type="button">
            + Add Item
          </Button>
        </main>
      </div>
    </DragDropContext>
  );
}

type ListItemProps = {
  item: ActionableItem;
  onUpdate: (item: ActionableItem) => void;
  handleProps: DraggableProvidedDragHandleProps | null;
  isEditable: boolean;
};

function ListItem({ item, onUpdate, handleProps, isEditable }: ListItemProps) {
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
      {isEditable && <DragHandle {...handleProps}>☰</DragHandle>}
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
    </Form>
  );
}

export default App;

const List = styled.ol`
  font-size: 1.25em;
  list-style-type: none;
  padding: 0;

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
    outline: none;
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
    outline: none;
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

const DragHandle = styled(Button).attrs({ as: 'div' })`
  color: #ccc;

  @media screen and (pointer: fine) {
    &:hover {
      color: inherit;
    }

    &:active {
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

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
