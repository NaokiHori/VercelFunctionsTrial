import React from "react";
import type { Prefecture } from "../types";
import { fetchAllPrefectures } from "./fetchAllPrefectures";

export function usePrefectures(): [
  prefectures: Prefecture[],
  isLoaded: boolean,
  isError: boolean,
] {
  const [prefectures, setPrefectures] = React.useState<Prefecture[]>(
    new Array<Prefecture>(),
  );
  // ロード状態やロードエラーをUI表示するためのflags
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);
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
        setIsError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);
  return [prefectures, isLoaded, isError];
}
