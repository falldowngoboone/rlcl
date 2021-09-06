import "@emotion/react";
import theme from "./src/utils/theme";

declare module "@emotion/react" {
  type RoleCallTheme = typeof theme;

  export interface Theme extends RoleCallTheme {}
}
