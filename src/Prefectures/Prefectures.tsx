import React, { JSX } from "react";
import type { Prefecture, GraphValues } from "../types";
import { PrefHandlers } from "./hooks";
import { fetchGraphValues } from "./fetchGraphValues";
import * as style from "./styles.css";

function CheckBoxWithLabel({
  prefecture,
  prefHandlers,
}: {
  prefecture: Prefecture;
  prefHandlers: PrefHandlers;
}): JSX.Element {
  // この都道府県のデータがすでに取得されているか
  // ローカルで完結する情報なのでpropで持たずstateを持つ
  const [isFetched, setIsFetched] = React.useState<boolean>(false);
  // データロード時にチェックボックスを無効化する用途のフラグ
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // ラベルをクリックした場合でもチェックボックスを変更するために紐づける
  const id = `checkbox${prefecture.code.toString()}`;
  function handleChange() {
    if (isFetched) {
      // 取得済み、選択フラグ（グラフ表示非表示）だけ反転する
      prefHandlers.updatePrefecture({
        ...prefecture,
        isSelected: !prefecture.isSelected,
      } satisfies Prefecture);
    } else {
      // 未取得なのでAPIを呼ぶ
      setIsLoading(true);
      setIsFetched(true);
      fetchGraphValues(prefecture.code)
        .then((graphValues: GraphValues) => {
          prefHandlers.updatePrefecture({
            ...prefecture,
            isSelected: !prefecture.isSelected,
            graphValues: graphValues,
          } satisfies Prefecture);
        })
        .catch((): never => {
          throw new Error(`failed to fetch graphValues`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }
  return (
    <div className={style.item}>
      <input
        type="checkbox"
        checked={prefecture.isSelected}
        disabled={isLoading}
        onChange={() => {
          handleChange();
        }}
        id={id}
        className={style.checkbox}
      />
      <label
        htmlFor={id}
        className={isLoading ? style.loadingLabel : style.normalLabel}
      >
        {prefecture.name}
      </label>
    </div>
  );
}

export function Prefectures({
  prefectures,
  prefHandlers,
}: {
  prefectures: Prefecture[];
  prefHandlers: PrefHandlers;
}): JSX.Element {
  return (
    <div className={style.container}>
      {prefectures.map((prefecture: Prefecture, index: number) => (
        <CheckBoxWithLabel
          key={index}
          prefecture={prefecture}
          prefHandlers={prefHandlers}
        />
      ))}
    </div>
  );
}
