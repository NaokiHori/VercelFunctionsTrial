import { JSX } from "react";
import type { Prefecture } from "../types";

function CheckBoxWithLabel({
  prefecture,
}: {
  prefecture: Prefecture;
}): JSX.Element {
  // ラベルをクリックした場合でもチェックボックスを変更するために紐づける
  const id = `checkbox${prefecture.code.toString()}`;
  function handleChange() {
    return;
  }
  return (
    <div>
      <input
        type="checkbox"
        onChange={() => {
          handleChange();
        }}
        id={id}
      />
      <label htmlFor={id}>{prefecture.name}</label>
    </div>
  );
}

export function Prefectures({
  prefectures,
}: {
  prefectures: Prefecture[];
}): JSX.Element {
  return (
    <div>
      {prefectures.map((prefecture: Prefecture, index: number) => (
        <CheckBoxWithLabel key={index} prefecture={prefecture} />
      ))}
    </div>
  );
}
