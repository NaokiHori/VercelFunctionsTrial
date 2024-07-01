import { style } from "@vanilla-extract/css";
import { colors as themeColors } from "../theme.css";

export const metricContainer = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  alignContent: "flex-start",
  alignItems: "flex-start",
});

export const metricItem = style({
  // flex item
  flexGrow: "0",
  flexShrink: "0",
  flexBasis: "7em",
  // border
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: themeColors.unfocused,
  // text
  color: themeColors.unfocused,
  textAlign: "center",
  // on hover
  ":hover": {
    borderColor: themeColors.focused,
    color: themeColors.focused,
    cursor: "pointer",
  },
});
