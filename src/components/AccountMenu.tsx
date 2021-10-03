/** @jsxImportSource @emotion/react */

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuPopover,
  MenuItems,
} from "@reach/menu-button";
import { positionMatchWidth } from "@reach/popover";
import Icon from "./Icon";

import { css, useTheme } from "@emotion/react";
import MenuBox from "./MenuBox";
import { signOut } from "next-auth/react";

function AccountMenu() {
  const theme = useTheme();

  return (
    <Menu
      as="div"
      css={css`
        width: 100%;

        & [data-reach-menu-popover] {
          width: 100%;
        }
      `}
    >
      <MenuButton
        css={css`
          appearance: none;
          border: 0;
          font: inherit;
          padding: ${theme.space[1]} ${theme.space[3]};
          background-color: transparent;
          color: inherit;
          width: 100%;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &:hover:not([aria-expanded]) {
            cursor: pointer;
            background-color: ${theme.color.surfaceCallout}11;
          }
        `}
      >
        falldowngoboone <Icon variant="open" />
      </MenuButton>
      <MenuPopover
        position={(buttonRect, popoverRect) => {
          const popoverStyle = positionMatchWidth(buttonRect, popoverRect);
          return {
            ...popoverStyle,
            left: theme.space[3],
          };
        }}
      >
        <MenuItems as={MenuBox}>
          <MenuItem
            onSelect={signOut}
            css={css`
              color: ${theme.color.textPrimary};
              padding: ${theme.space[0]} ${theme.space[1]};
              display: block;

              &[data-selected] {
                background-color: ${theme.color.surfaceCallout}11;
              }
            `}
          >
            Sign out
          </MenuItem>
        </MenuItems>
      </MenuPopover>
    </Menu>
  );
}

export default AccountMenu;
