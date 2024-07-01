import { globalStyle } from "@vanilla-extract/css";

export const colors = {
  focused: "#000000",
  unfocused: "#888888",
  background: "#ffffff",
  border: "#4488ff",
};

export const metrics = {
  borderWidth: "2px",
};

globalStyle(":root", {
  fontFamily: "Arial",
  fontSize: "small",
  color: colors.focused,
  backgroundColor: colors.background,
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
});
