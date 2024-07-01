import React from "react";
import type { Prefecture } from "../types";
import { fetchAllPrefectures } from "./fetchAllPrefectures";

export interface PrefHandlers {
  updatePrefecture: (newPrefecture: Prefecture) => void;
}

export function usePrefectures(): [
  prefectures: Prefecture[],
  isLoaded: boolean,
  isError: boolean,
  prefHandlers: PrefHandlers,
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
  // 選択状態や人口データ更新によるPrefectureの変更を担うハンドラ
  const updatePrefecture = (newPrefecture: Prefecture): void => {
    setPrefectures((prefectures: Prefecture[]) => {
      const newPrefectures: Prefecture[] = prefectures.map(
        (prefecture: Prefecture): Prefecture => {
          if (newPrefecture.code !== prefecture.code) {
            return prefecture;
          } else {
            return newPrefecture;
          }
        },
      );
      return newPrefectures;
    });
  };
  const prefHandlers: PrefHandlers = {
    updatePrefecture,
  };
  return [prefectures, isLoaded, isError, prefHandlers];
}
