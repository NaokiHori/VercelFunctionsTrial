import { style } from "@vanilla-extract/css";
import { colors as themeColors, metrics as themeMetrics } from "../theme.css";

export const container = style({
  margin: "auto",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  alignItems: "flex-start",

  borderBottomStyle: "solid",
  borderBottomWidth: themeMetrics.borderWidth,
  borderBottomColor: themeColors.border,
});

export const item = style({
  // flex item
  flexGrow: "0",
  flexShrink: "0",
  flexBasis: "6em",
  gap: "0.25em",
  // flex container
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignContent: "center",
  alignItems: "center",
});

export const checkbox = style({
  height: "2em",
  width: "2em",
});

export const normalLabel = style({
  color: themeColors.focused,
});

export const loadingLabel = style({
  color: themeColors.unfocused,
});
