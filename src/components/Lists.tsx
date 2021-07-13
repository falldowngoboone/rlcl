import * as React from "react";
import Link from "next/link";
import { List } from "../model";
import { useCreateList, useRemoveList } from "../context/lists";

type ListsProps = {
  lists: Pick<List, "id" | "name">[];
  onListSelect: (id: string) => void;
};

function Lists({ lists, onListSelect }: ListsProps) {
  const { mutate: createList } = useCreateList();
  const { mutate: removeList } = useRemoveList();

  return (
    <section>
      <h2>Your Lists</h2>
      <Link href="/new-trip">
        <a
          onClick={(e) => {
            e.preventDefault();
            createList(
              { name: "New List" },
              {
                onSuccess(newItem) {
                  onListSelect(newItem.id);
                },
              }
            );
          }}
        >
          New
        </a>
      </Link>
      <form action="/api/trips">
        <input name="q" />
      </form>
      {lists.length ? (
        <ol>
          {lists.map(({ name, id }) => (
            <li key={id}>
              <ListLink
                href={`/lists/${id}`}
                onClick={(event) => {
                  onListSelect(id);
                  event.preventDefault();
                }}
              >
                {name}
              </ListLink>
              <button onClick={() => removeList({ id })}>Delete</button>
            </li>
          ))}
        </ol>
      ) : (
        <p>Get started by adding a trip!</p>
      )}
    </section>
  );
}

type ListLinkProps = {
  href: string;
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
};

function ListLink({ href, onClick, children }: ListLinkProps) {
  return (
    <Link href={href}>
      <a onClick={onClick}>{children}</a>
    </Link>
  );
}

export default Lists;
