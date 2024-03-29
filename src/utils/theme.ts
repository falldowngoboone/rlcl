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
    inset: "inset -1px 1px 4px #c4c2cf",
    drop: "drop-shadow(-1px 1px 4px rgba(0, 0, 0, 0.25))",
  } as const,
  radius: {
    small: "4px",
    large: "8px",
  } as const,
  border: {
    subtle: "1px solid #0d3f7a22",
  },
};

export default theme;
