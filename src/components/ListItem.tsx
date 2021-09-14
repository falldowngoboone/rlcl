/** @jsxImportSource @emotion/react */

import * as React from "react";
import { css, Interpolation, Theme, useTheme } from "@emotion/react";
import { useUpdateItem } from "../context/items";

import { Item } from "../model";
import IconButton from "./IconButton";

type ListItemProps = {
  item: Item;
  onToggle: (checked: boolean) => void;
  onRemove: () => void;
  checked: boolean;
};

function ListItem({ item, checked, onToggle, onRemove }: ListItemProps) {
  const [editView, setEditView] = React.useState(false);
  const [itemName, setItemName] = React.useState(item.name);
  const nameEditInput = React.useRef<HTMLInputElement>(null);
  const { mutate: updateItem } = useUpdateItem();
  const theme = useTheme();

  React.useEffect(() => {
    if (editView && nameEditInput.current) {
      nameEditInput.current.select();
    }
  }, [editView]);

  const handleUpdateName = React.useCallback(
    (event: React.FormEvent<HTMLFormElement | HTMLInputElement>) => {
      const newName = itemName.trim();

      if (newName && newName !== item.name) {
        updateItem({ id: item.id, name: newName });
      } else {
        setItemName(item.name);
      }

      setEditView(false);

      event.preventDefault();
    },
    [item.name, itemName, item.id, updateItem]
  );

  const handleFormKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          setItemName(item.name);
          setEditView(false);
          break;
        default:
          return;
      }

      event.preventDefault();
    },
    [item.name]
  );

  return editView ? (
    <form
      css={css`
        display: flex;
        justify-content: space-between;
        width: 100%;
      `}
      action="/"
      onSubmit={handleUpdateName}
      onKeyDown={handleFormKeyDown}
    >
      <input
        type="text"
        name="itemName"
        value={itemName}
        ref={nameEditInput}
        onChange={(event) => {
          setItemName(event.target.value);
        }}
      />
      <button>Done</button>
    </form>
  ) : (
    <>
      <label
        css={css`
          font-size: 20px;
          line-height: 24px;
          display: flex;

          & > * + * {
            margin-left: ${theme.space[0]};
          }
        `}
      >
        <CheckBox
          checked={checked}
          onChange={(event) => {
            onToggle(event.target.checked);
          }}
          name="itemChecked"
        />{" "}
        <span
          css={
            checked &&
            css`
              text-decoration: line-through;
              color: ${theme.color.textSecondary};
            `
          }
        >
          {item.name}
        </span>
      </label>
      <div
        css={css`
          opacity: 0;
          display: flex;

          *:hover > &,
          &:focus-within {
            opacity: 1;
          }

          & > button + button {
            margin-left: ${theme.space[0]};
          }
        `}
      >
        <IconButton
          variant="edit"
          label="Edit"
          onClick={() => setEditView(true)}
        />
        <IconButton variant="trash" label="Delete" onClick={() => onRemove()} />
      </div>
    </>
  );
}

type CheckBoxProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>;
  };

function CheckBox({ type: _ignored, ...props }: CheckBoxProps) {
  const theme = useTheme();

  return (
    <span
      css={css`
        position: relative;
      `}
    >
      <input
        css={[
          css`
            appearance: none;
            height: 24px;
            width: 24px;
            background-color: ${theme.color.surfacePrimary};
            border-radius: ${theme.radius.small};
            box-shadow: ${theme.shadow.inset};
            margin: 0;
            display: block;
          `,
          props.checked &&
            css`
              background-color: ${theme.color.surfaceCallout};
              box-shadow: none;
            `,
        ]}
        type="checkbox"
        {...props}
      />
      {props.checked && (
        <svg
          css={css`
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            fill: white;
          `}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.2341 4.29733C20.0243 4.83933 20.2378 5.93778 19.711 6.75078L11.6364 19.2122C11.3175 19.7044 10.7806 20 10.2056 20C9.6307 20 9.09379 19.7044 8.77487 19.2122L4.28899 12.2892C3.76219 11.4762 3.97571 10.3777 4.76591 9.83572C5.55611 9.29372 6.62375 9.51341 7.15055 10.3264L10.2056 15.0413L16.8494 4.78802C17.3762 3.97501 18.4439 3.75532 19.2341 4.29733Z" />
        </svg>
      )}
    </span>
  );
}

export default ListItem;
