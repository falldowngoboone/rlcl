/** @jsxImportSource @emotion/react */

import * as React from "react";
import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { useUpdateItem } from "../context/items";

import { Item } from "../model";

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
            margin-left: 8px;
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
              color: #9795a1;
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
          filter: drop-shadow(-1px 1px 4px rgba(0, 0, 0, 0.25));

          *:hover > &,
          &:focus-within {
            opacity: 1;
          }

          & > button + button {
            margin-left: 8px;
          }
        `}
      >
        <button
          css={css`
            border-style: none;
            background-color: #fff;
            border-radius: 4px;
            appearance: none;
            margin: 0;
            padding: 0;
            display: flex;
          `}
          onClick={() => setEditView(true)}
        >
          <svg
            focusable={false}
            aria-hidden={true}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.7279 4.00003C15.5089 3.21898 16.7753 3.21898 17.5563 4.00003L20.3847 6.82846C21.1658 7.6095 21.1658 8.87583 20.3847 9.65688L9.36392 20.6777C8.98884 21.0528 8.48013 21.2635 7.9497 21.2635L5.12128 21.2635C4.01671 21.2635 3.12127 20.3681 3.12127 19.2635L3.12127 16.4351C3.12127 15.9046 3.33199 15.3959 3.70706 15.0208L14.7279 4.00003ZM18.9705 8.24267L16.1421 5.41424L5.12127 16.4351V19.2635H7.9497L18.9705 8.24267Z"
              fill="#9795A1"
            />
            <path
              d="M16.8492 11.7782L12.6065 7.53555L14.0208 6.12134L18.2634 10.364L16.8492 11.7782Z"
              fill="#9795A1"
            />
          </svg>
          <VisuallyHidden>Edit</VisuallyHidden>
        </button>
        <button
          css={css`
            border-style: none;
            background-color: #fff;
            border-radius: 4px;
            appearance: none;
            margin: 0;
            padding: 0;
            display: flex;
          `}
          onClick={() => onRemove()}
        >
          <svg
            focusable={false}
            aria-hidden={true}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6H19V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V6ZM7 8V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8H7Z"
              fill="#9795A1"
            />
            <path
              d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7Z"
              fill="#9795A1"
            />
            <path
              d="M8 5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V8H8V5ZM11 4C10.4477 4 10 4.44772 10 5V6H14V5C14 4.44772 13.5523 4 13 4H11Z"
              fill="#9795A1"
            />
            <path
              d="M10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10Z"
              fill="#9795A1"
            />
            <path
              d="M14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z"
              fill="#9795A1"
            />
          </svg>
          <VisuallyHidden>Delete</VisuallyHidden>
        </button>
      </div>
    </>
  );
}

const VisuallyHidden = styled.span`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`;

type CheckBoxProps = React.ClassAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>;
  };

function CheckBox({ type: _ignored, ...props }: CheckBoxProps) {
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
            background-color: #f4f3fa;
            border-radius: 4px;
            box-shadow: inset -1px 1px 4px #c4c2cf;
            margin: 0;
            display: block;
          `,
          props.checked &&
            css`
              background-color: #3a2c8e;
              box-shadow: inset -1px 1px 2px #332b64;
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
