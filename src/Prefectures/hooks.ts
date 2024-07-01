import React from "react";
import type { Prefecture } from "../types";

export function usePrefectures(): Prefecture[] {
  const [prefectures, setPrefectures] = React.useState<Prefecture[]>(
    new Array<Prefecture>(),
  );
  setPrefectures(new Array<Prefecture>());
  return prefectures;
}
