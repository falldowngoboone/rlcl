import React from 'react';

import {
  itemsService,
  ActionableItem,
  ActionableItemService,
} from './service/items';

type ItemsState = {
  isPending: boolean;
  items: ActionableItem[];
};

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
  | { type: 'FETCHED'; payload: ActionableItem[] }
  | { type: 'ADDED'; payload: ActionableItem[] }
  | { type: 'REMOVED'; payload: ActionableItem[] }
  | { type: 'REORDERED'; payload: ActionableItem[] }
  | { type: 'UPDATED'; payload: ActionableItem[] };

const ItemsServiceContext = React.createContext<ActionableItemService>(
  itemsService
);
const ItemsStateContext = React.createContext<ItemsState | null>(null);
const ItemsDispatchContext = React.createContext<React.Dispatch<
  ItemsAction
> | null>(null);

export function useItemsService() {
  return React.useContext(ItemsServiceContext);
}

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
  initialState?: Partial<ItemsState>;
  service?: Partial<ActionableItemService>;
};

export function ItemsProvider({
  children,
  initialState: stateOverrides = {},
  service: serviceOverrides = {},
}: ItemsProviderProps) {
  const [itemsState, dispatch] = React.useReducer<
    React.Reducer<ItemsState, ItemsAction>
  >(statesReducer, { ...initialState, ...stateOverrides });

  const service = React.useMemo(
    () => ({ ...itemsService, ...serviceOverrides }),
    [serviceOverrides]
  );

  React.useEffect(() => {
    getItems(dispatch, service);
  }, [service]);

  return (
    <ItemsServiceContext.Provider value={service}>
      <ItemsStateContext.Provider value={itemsState}>
        <ItemsDispatchContext.Provider value={dispatch}>
          {children}
        </ItemsDispatchContext.Provider>
      </ItemsStateContext.Provider>
    </ItemsServiceContext.Provider>
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

export async function getItems(
  dispatch: React.Dispatch<ItemsAction>,
  itemsService: Pick<ActionableItemService, 'fetch'>
) {
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
  itemsService: Pick<ActionableItemService, 'add'>,
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
  itemsService: Pick<ActionableItemService, 'remove'>,
  item: ActionableItem
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
  itemsService: Pick<ActionableItemService, 'update'>,
  item: ActionableItem
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
  itemsService: Pick<ActionableItemService, 'move'>,
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
