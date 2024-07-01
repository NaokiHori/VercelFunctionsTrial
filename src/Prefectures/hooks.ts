import React from "react";
import type { Prefecture } from "../types";
import { fetchAllPrefectures } from "./fetchAllPrefectures";

export function usePrefectures(): Prefecture[] {
  const [prefectures, setPrefectures] = React.useState<Prefecture[]>(
    new Array<Prefecture>(),
  );
  // 全都道府県一覧を取得する
  React.useEffect(() => {
    fetchAllPrefectures()
      .then((newPrefectures) => {
        setPrefectures(newPrefectures);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error(error.message);
        }
      })
      .finally(() => {
        return;
      });
  }, []);
  return prefectures;
}
