import React from "react";
import { createRoot, Root } from "react-dom/client";
import { usePrefectures } from "./Prefectures/hooks";
import { Prefectures } from "./Prefectures/Prefectures";
import { Graph } from "./Graph/Graph";
import "./theme.css";
import * as style from "./styles.css";

function Header(): JSX.Element {
  return <h1 className={style.header}>都道府県別 総人口推移グラフ</h1>;
}

function App(): JSX.Element {
  const [prefectures, isLoaded, isError, prefHandlers] = usePrefectures();
  if (isError) {
    return <div className={style.app}>ERROR: Failed to fetch prefectures</div>;
  } else if (!isLoaded) {
    return <div className={style.app}>Loading prefectures now...</div>;
  } else {
    return (
      <div className={style.app}>
        <Header />
        <Prefectures prefectures={prefectures} prefHandlers={prefHandlers} />
        <Graph prefectures={prefectures} />
      </div>
    );
  }
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
