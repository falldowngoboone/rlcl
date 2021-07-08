import * as React from "react";

import { List } from "../model";

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

type ListsStateProviderProps = {
  children: React.ReactNode;
};

function ListsStateProvider({ children }: ListsStateProviderProps) {
  const [lists, setLists] = React.useState<List[]>([]);

  React.useEffect(() => {
    fetchLists().then((data) => {
      setLists(data);
    });
  }, []);

  return (
    <ListsStateContext.Provider value={[lists, setLists]}>
      {children}
    </ListsStateContext.Provider>
  );
}

function fetchLists(): Promise<List[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([new List("Trip 1"), new List("Trip 2"), new List("Trip 3")]);
    }, 1000);
  });
}

export { useLists, ListsStateProvider };
