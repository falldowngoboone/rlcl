import React from 'react';

import {
  actionableItemsService,
  ActionableItem,
  ActionableItemService,
} from '../service/actionable-items';

type ActionableItemsState = {
  isPending: boolean;
  items: ActionableItem[];
};

const initialState: ActionableItemsState = {
  isPending: false,
  items: [],
};

type ActionableItemsAction =
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

const ActionableItemsServiceContext = React.createContext<
  ActionableItemService
>(actionableItemsService);
const ActionableItemsStateContext = React.createContext<ActionableItemsState | null>(
  null
);
const ActionableItemsDispatchContext = React.createContext<React.Dispatch<
  ActionableItemsAction
> | null>(null);

export function useActionableItemsService() {
  return React.useContext(ActionableItemsServiceContext);
}

export function useActionableItemsState() {
  const context = React.useContext(ActionableItemsStateContext);
  if (context === null) {
    throw new Error(
      `'useItemsState' must be used in a child of 'ItemsProvider'`
    );
  }
  return context;
}

export function useActionableItemsDispatch() {
  const context = React.useContext(ActionableItemsDispatchContext);
  if (context === null) {
    throw new Error(
      `'useItemsDispatch' must be used in a child of 'ItemsProvider'`
    );
  }
  return context;
}

type ActionableItemsProviderProps = {
  children: React.ReactNode;
  initialState?: Partial<ActionableItemsState>;
  service?: Partial<ActionableItemService>;
};

export function ActionableItemsProvider({
  children,
  initialState: stateOverrides = {},
  service: serviceOverrides = {},
}: ActionableItemsProviderProps) {
  const [itemsState, dispatch] = React.useReducer<
    React.Reducer<ActionableItemsState, ActionableItemsAction>
  >(statesReducer, { ...initialState, ...stateOverrides });

  const service = React.useMemo(
    () => ({ ...actionableItemsService, ...serviceOverrides }),
    [serviceOverrides]
  );

  React.useEffect(() => {
    getActionableItems(dispatch, service);
  }, [service]);

  return (
    <ActionableItemsServiceContext.Provider value={service}>
      <ActionableItemsStateContext.Provider value={itemsState}>
        <ActionableItemsDispatchContext.Provider value={dispatch}>
          {children}
        </ActionableItemsDispatchContext.Provider>
      </ActionableItemsStateContext.Provider>
    </ActionableItemsServiceContext.Provider>
  );
}

function statesReducer(
  state: ActionableItemsState,
  action: ActionableItemsAction
) {
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

export async function getActionableItems(
  dispatch: React.Dispatch<ActionableItemsAction>,
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

export async function addActionableItem(
  dispatch: React.Dispatch<ActionableItemsAction>,
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

export async function removeActionableItem(
  dispatch: React.Dispatch<ActionableItemsAction>,
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

export async function updateActionableItem(
  dispatch: React.Dispatch<ActionableItemsAction>,
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

export async function reorderActionableItems(
  dispatch: React.Dispatch<ActionableItemsAction>,
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
