const theme = {
  space: [
    "8px",
    "16px",
    "24px",
    "40px",
    "64px",
    "104px",
    "168px",
    "272px",
  ] as const,
  color: {
    textPrimary: "#0d3f7a",
    textSecondary: "#7a8ea5",
    textCallout: "#fff",
    surfacePrimary: "#fff",
    surfaceSecondary: "#fdf0ff",
    surfaceCallout: "#0d3f7a",
    iconPrimary: "#7a8ea5",
  } as const,
  shadow: {
    inset: "box-shadow: inset -1px 1px 4px #c4c2cf",
  } as const,
  radius: {
    small: "4px",
    large: "8px",
  } as const,
};

export default theme;
