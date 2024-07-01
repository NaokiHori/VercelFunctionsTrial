import { style } from "@vanilla-extract/css";
import { colors as themeColors, metrics as themeMetrics } from "./theme.css";

export const app = style({
  margin: "auto",
  position: "relative",
  width: "80%",
  fontSize: "medium",
  textAlign: "center",
});

export const header = style({
  margin: "0 0 0 0",
  textAlign: "center",
  fontSize: "large",
  borderBottomStyle: "solid",
  borderBottomWidth: themeMetrics.borderWidth,
  borderBottomColor: themeColors.border,
});
