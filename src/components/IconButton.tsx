/** @jsxImportSource @emotion/react */

import { ElementType, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { Theme } from "@emotion/react";
import { VisuallyHidden } from "@reach/visually-hidden";
import Icon from "./Icon";
import type { IconVariant } from "./Icon";
import Button from "./Button";

type IconButtonProps = {
  theme?: Theme | undefined;
  as?: ElementType<any> | undefined;
  variant: IconVariant;
  label: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function IconButton({ variant, label, ...props }: IconButtonProps) {
  return (
    <Button {...props}>
      <Icon variant={variant} />
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </Button>
  );
}

export default IconButton;
