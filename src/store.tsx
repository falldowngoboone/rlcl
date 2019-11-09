import React from 'react';

import { Item } from './models';
import * as itemsService from './service';

interface ItemsState {
  isPending: boolean;
  items: Item[];
}

const initialState: ItemsState = {
  isPending: false,
  items: [],
};

type ItemsAction =
  | { type: 'FETCH' }
  | { type: 'ADD' }
  | { type: 'REMOVE' }
  | { type: 'REORDER' }
  | { type: 'UPDATE' }
  | { type: 'FETCHED'; payload: Item[] }
  | { type: 'ADDED'; payload: Item[] }
  | { type: 'REMOVED'; payload: Item[] }
  | { type: 'REORDERED'; payload: Item[] }
  | { type: 'UPDATED'; payload: Item[] };

const ItemsStateContext = React.createContext<ItemsState | null>(null);
const ItemsDispatchContext = React.createContext<React.Dispatch<
  ItemsAction
> | null>(null);

export function useItemsState() {
  const context = React.useContext(ItemsStateContext);
  if (context === null) {
    throw new Error(
      `'useItemsState' must be used in a child of 'ItemsProvider'`
    );
  }
  return context;
}

export function useItemsDispatch() {
  const context = React.useContext(ItemsDispatchContext);
  if (context === null) {
    throw new Error(
      `'useItemsDispatch' must be used in a child of 'ItemsProvider'`
    );
  }
  return context;
}

type ItemsProviderProps = {
  children: React.ReactNode;
};

export function ItemsProvider({ children }: ItemsProviderProps) {
  const [itemsState, dispatch] = React.useReducer<
    React.Reducer<ItemsState, ItemsAction>
  >(statesReducer, initialState);

  React.useEffect(() => {
    getItems(dispatch);
  }, []);

  return (
    <ItemsStateContext.Provider value={itemsState}>
      <ItemsDispatchContext.Provider value={dispatch}>
        {children}
      </ItemsDispatchContext.Provider>
    </ItemsStateContext.Provider>
  );
}

function statesReducer(state: ItemsState, action: ItemsAction) {
  switch (action.type) {
    case 'FETCH':
    case 'ADD':
    case 'REMOVE':
    case 'REORDER':
    case 'UPDATE':
      return { ...state, isPending: true };
    case 'FETCHED':
    case 'ADDED':
    case 'REMOVED':
    case 'REORDERED':
    case 'UPDATED':
      return { ...state, isPending: false, items: action.payload };
    default:
      return state;
  }
}

export async function getItems(dispatch: React.Dispatch<ItemsAction>) {
  dispatch({ type: 'FETCH' });
  try {
    const items = await itemsService.fetch();
    dispatch({ type: 'FETCHED', payload: items });
    return items;
  } catch (e) {
    console.error(e);
  }
}

export async function addItem(
  dispatch: React.Dispatch<ItemsAction>,
  value: string
) {
  dispatch({ type: 'ADD' });
  try {
    const items = await itemsService.add(value);
    dispatch({ type: 'ADDED', payload: items });
    return items;
  } catch (e) {
    console.error(e);
  }
}

export async function removeItem(
  dispatch: React.Dispatch<ItemsAction>,
  item: Item
) {
  dispatch({ type: 'REMOVE' });
  try {
    const items = await itemsService.remove(item);
    dispatch({ type: 'REMOVED', payload: items });
    return items;
  } catch (e) {
    console.error(e);
  }
}

export async function updateItem(
  dispatch: React.Dispatch<ItemsAction>,
  item: Item
) {
  dispatch({ type: 'UPDATE' });
  try {
    const items = await itemsService.update(item);
    dispatch({ type: 'UPDATED', payload: items });
    return items;
  } catch (e) {
    console.error(e);
  }
}

export async function reorderItems(
  dispatch: React.Dispatch<ItemsAction>,
  from: number,
  to: number
) {
  dispatch({ type: 'REORDER' });
  try {
    const items = await itemsService.move(from, to);
    dispatch({ type: 'REORDERED', payload: items });
    return items;
  } catch (e) {
    console.error(e);
  }
}
