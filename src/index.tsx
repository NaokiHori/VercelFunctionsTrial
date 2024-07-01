import React from "react";
import { createRoot, Root } from "react-dom/client";
import { usePrefectures } from "./Prefectures/hooks";
import { Prefectures } from "./Prefectures/Prefectures";
import { Graph } from "./Graph/Graph";

function Header(): JSX.Element {
  return <h1>都道府県別 総人口推移グラフ</h1>;
}

function App(): JSX.Element {
  const prefectures = usePrefectures();
  return (
    <div>
      <Header />
      <Prefectures />
      <Graph prefectures={prefectures} />
    </div>
  );
}

const id = "root";
const rootElement: HTMLElement | null = document.getElementById(id);
if (rootElement === null) {
  throw new Error(`The root element "${id}" is not found`);
}
const root: Root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
