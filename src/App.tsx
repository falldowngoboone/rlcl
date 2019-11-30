import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

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

import { Button } from './Button';
import { ItemList } from './ItemList';
import { Layout } from './Layout';

export default function App() {
  const itemsService = useActionableItemsService();
  const itemsState = useActionableItemsState();
  const dispatch = useActionableItemsDispatch();
  const [items, setItems] = React.useState(itemsState.items);
  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    setItems(itemsState.items);

    if (!itemsState.items.length && isEditable) {
      setIsEditable(false);
    }
  }, [isEditable, itemsState.items]);

  function handleAddItem(value: string) {
    addActionableItem(dispatch, itemsService, value);
  }

  function handleChangeItem(item: ActionableItem) {
    if (!item.value) {
      removeActionableItem(dispatch, itemsService, item);
      return;
    }

    updateActionableItem(dispatch, itemsService, item);
  }

  function handleRemoveItem(item: ActionableItem) {
    removeActionableItem(dispatch, itemsService, item);
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
      <Layout
        isEditable={isEditable}
        onToggleEdit={() => {
          setIsEditable(b => !b);
        }}
      >
        <ItemList
          items={items}
          isEditable={isEditable}
          onDoneToggle={handleChangeItem}
          onRemove={handleRemoveItem}
        />
        {!isEditable && (
          <AddForm
            onSubmit={event => {
              const newItemField = event.currentTarget.newItem;
              const newItemValue = newItemField.value.trim();

              if (newItemValue) {
                handleAddItem(newItemValue);
              }

              newItemField.value = '';

              event.preventDefault();
            }}
          >
            <Input name="newItem" />
            <Button type="submit">+</Button>
          </AddForm>
        )}
      </Layout>
    </DragDropContext>
  );
}

const Input = styled.input`
  font: inherit;
  border: 0.125em solid black;
  border-radius: 2em;
  padding: 0.25em 0.75em;
`;

const AddForm = styled.form`
  display: flex;

  & > ${Input} {
    flex: 1 1;
    min-width: 0;
  }
`;

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
