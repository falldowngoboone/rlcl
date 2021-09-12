/** @jsxImportSource @emotion/react */

import * as React from "react";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import VisuallyHidden from "@reach/visually-hidden";
import { css, useTheme } from "@emotion/react";
import { useCreateList, useList, useRemoveList } from "../context/lists";
import Icon from "./Icon";
import Button from "./Button";
import MenuBox from "./MenuBox";

type ListActionsProps = {
  id: string;
};

function ListActions({ id }: ListActionsProps) {
  const { mutate: removeList } = useRemoveList();
  const { mutate: createList } = useCreateList();
  const list = useList(id);
  const theme = useTheme();

  return (
    <Menu>
      <MenuButton
        as={Button}
        css={css`
          position: relative;
          z-index: 1;
          align-self: flex-start;
          opacity: 0;

          *:hover > &,
          &:focus-within {
            opacity: 1;
          }
        `}
      >
        <Icon variant="kebab" />
        <VisuallyHidden>Actions</VisuallyHidden>
      </MenuButton>
      <MenuList as={MenuBox}>
        <MenuItem
          css={css`
            color: ${theme.color.textPrimary};
            padding: ${theme.space[0]} ${theme.space[1]};
            display: flex;
            gap: ${theme.space[0]};
            align-items: center;

            &[data-selected] {
              background-color: ${theme.color.surfaceCallout}11;
            }
          `}
          onSelect={() => removeList({ id })}
        >
          <Icon variant="trash" /> Delete
        </MenuItem>
        <MenuItem
          css={css`
            color: ${theme.color.textPrimary};
            padding: ${theme.space[0]} ${theme.space[1]};
            display: flex;
            gap: ${theme.space[0]};
            align-items: center;

            &[data-selected] {
              background-color: ${theme.color.surfaceCallout}11;
            }
          `}
          onSelect={() => {
            if (list) {
              const { id: _ignored, ...copy } = list;
              createList(
                { ...copy, name: `${copy.name} Copy` },
                { onSuccess() {} }
              );
            }
          }}
        >
          <Icon variant="duplicate" /> Duplicate
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ListActions;
