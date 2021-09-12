import * as React from "react";

import { List } from "../model";
import { useClient } from "./auth-context";

const ListsStateContext = React.createContext<
  [List[], React.Dispatch<React.SetStateAction<List[]>>] | null
>(null);

function useLists() {
  const context = React.useContext(ListsStateContext);

  if (!context) {
    throw new Error(
      "`useLists` must be called within a child of `ListsStateProvider`."
    );
  }

  return context;
}

function useList(id: string) {
  const [lists] = useLists();

  return lists?.find((item) => item.id === id) ?? null;
}

function useUpdateList() {
  const [, setLists] = useLists();
  const client = useClient();

  const mutate = React.useCallback(
    (updates) => {
      client(`lists/${updates.id}`, { method: "PUT", data: updates }).then(
        (updated) => {
          setLists((lists) =>
            lists.map((list) => (list.id === updated.id ? updated : list))
          );
        }
      );
    },
    [client, setLists]
  );

  return React.useMemo(() => ({ mutate }), [mutate]);
}

function useRemoveList() {
  const [, setLists] = useLists();
  const client = useClient();

  const mutate = React.useCallback(
    ({ id }) => {
      client(`lists/${id}`, { method: "DELETE" }).then((removed) => {
        setLists((lists) => lists.filter((list) => list.id !== removed.id));
      });
    },
    [client, setLists]
  );

  return React.useMemo(() => ({ mutate }), [mutate]);
}

function useCreateList() {
  const [, setLists] = useLists();
  const client = useClient();

  const mutate = React.useCallback(
    (data, { onSuccess }: { onSuccess?: (list: List) => void }) => {
      client(`lists/`, { method: "POST", data }).then((newList) => {
        setLists((lists) => [newList].concat(lists));
        onSuccess?.(newList);
      });
    },
    [client, setLists]
  );

  return React.useMemo(() => ({ mutate }), [mutate]);
}

type ListsStateProviderProps = {
  children: React.ReactNode;
};

function ListsStateProvider({ children }: ListsStateProviderProps) {
  const [lists, setLists] = React.useState<List[]>([]);
  const client = useClient();

  React.useEffect(() => {
    client("lists/").then((data) => {
      setLists(data);
    });
  }, [client]);

  return (
    <ListsStateContext.Provider value={[lists, setLists]}>
      {children}
    </ListsStateContext.Provider>
  );
}

export {
  useLists,
  useList,
  useCreateList,
  useRemoveList,
  useUpdateList,
  ListsStateProvider,
};
