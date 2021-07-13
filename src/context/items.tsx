import * as React from "react";

import { Item } from "../model";
import { useClient } from "./auth-context";
import { useList } from "./lists";

const ItemsStateContext = React.createContext<
  [Item[], React.Dispatch<React.SetStateAction<Item[]>>] | null
>(null);

function useItems() {
  const context = React.useContext(ItemsStateContext);

  if (!context) {
    throw new Error(
      "`useItems` must be called within a child of `ItemsStateProvider`."
    );
  }

  return context;
}

function useListItems(id: string) {
  const list = useList(id);
  const [items] = useItems();

  return list
    ? list.items
        .map((id) => items.find((item) => item.id === id))
        .filter((item): item is Item => !!item)
    : [];
}

function useItem(id: string) {
  const [items] = useItems();

  return items?.find((item) => item.id === id) ?? null;
}

function useUpdateItem() {
  const [, setItems] = useItems();
  const client = useClient();

  const mutate = React.useCallback(
    (updates) => {
      client(`items/${updates.id}`, { method: "PUT", data: updates }).then(
        (updated) => {
          setItems((items) =>
            items.map((item) => (item.id === updated.id ? updated : item))
          );
        }
      );
    },
    [client, setItems]
  );

  return React.useMemo(() => ({ mutate }), [mutate]);
}

function useRemoveItem() {
  const [, setItems] = useItems();
  const client = useClient();

  const mutate = React.useCallback(
    ({ id }) => {
      client(`items/${id}`, { method: "DELETE" }).then((removed) => {
        setItems((items) => items.filter((item) => item.id !== removed.id));
      });
    },
    [client, setItems]
  );

  return React.useMemo(() => ({ mutate }), [mutate]);
}

function useCreateItem() {
  const [, setItems] = useItems();
  const client = useClient();

  const mutate = React.useCallback(
    ({ name }, { onSuccess }: { onSuccess: (item: Item) => void }) => {
      client(`items/`, { method: "POST", data: { name } }).then((newItem) => {
        setItems((items) => items.concat(newItem));
        onSuccess?.(newItem);
      });
    },
    [client, setItems]
  );

  return React.useMemo(() => ({ mutate }), [mutate]);
}

type ItemsStateProviderProps = {
  children: React.ReactNode;
};

function ItemsStateProvider({ children }: ItemsStateProviderProps) {
  const [items, setItems] = React.useState<Item[]>([]);
  const client = useClient();

  React.useEffect(() => {
    client("items/").then((data) => {
      setItems(data);
    });
  }, [client]);

  return (
    <ItemsStateContext.Provider value={[items, setItems]}>
      {children}
    </ItemsStateContext.Provider>
  );
}

export {
  useItems,
  useListItems,
  useItem,
  useCreateItem,
  useRemoveItem,
  useUpdateItem,
  ItemsStateProvider,
};
