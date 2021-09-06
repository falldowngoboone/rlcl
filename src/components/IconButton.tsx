/** @jsxImportSource @emotion/react */

import { ElementType, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { Theme, css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const icons = {
  trash: (
    <>
      <path d="M5 6H19V19C19 20.6569 17.6569 22 16 22H8C6.34315 22 5 20.6569 5 19V6ZM7 8V19C7 19.5523 7.44772 20 8 20H16C16.5523 20 17 19.5523 17 19V8H7Z" />
      <path d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H5C4.44772 8 4 7.55228 4 7Z" />
      <path d="M8 5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V8H8V5ZM11 4C10.4477 4 10 4.44772 10 5V6H14V5C14 4.44772 13.5523 4 13 4H11Z" />
      <path d="M10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10Z" />
      <path d="M14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z" />
    </>
  ),
  edit: (
    <>
      <path d="M14.7279 4.00003C15.5089 3.21898 16.7753 3.21898 17.5563 4.00003L20.3847 6.82846C21.1658 7.6095 21.1658 8.87583 20.3847 9.65688L9.36392 20.6777C8.98884 21.0528 8.48013 21.2635 7.9497 21.2635L5.12128 21.2635C4.01671 21.2635 3.12127 20.3681 3.12127 19.2635L3.12127 16.4351C3.12127 15.9046 3.33199 15.3959 3.70706 15.0208L14.7279 4.00003ZM18.9705 8.24267L16.1421 5.41424L5.12127 16.4351V19.2635H7.9497L18.9705 8.24267Z" />
      <path d="M16.8492 11.7782L12.6065 7.53555L14.0208 6.12134L18.2634 10.364L16.8492 11.7782Z" />
    </>
  ),
};

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

const Button = styled.button`
  border-style: none;
  background-color: ${({ theme }) => theme.color.surfacePrimary};
  border-radius: ${({ theme }) => theme.radius.small};
  appearance: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
`;

type IconButtonProps = {
  theme?: Theme | undefined;
  as?: ElementType<any> | undefined;
  variant: "trash" | "edit";
  label: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function IconButton({ variant, label, ...props }: IconButtonProps) {
  const theme = useTheme();

  return (
    <Button {...props}>
      <svg
        focusable={false}
        aria-hidden={true}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        css={css`
          fill: ${theme.color.iconPrimary};
        `}
      >
        {icons[variant]}
      </svg>
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </Button>
  );
}

export default IconButton;
