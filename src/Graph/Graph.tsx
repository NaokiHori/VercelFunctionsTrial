import React, { JSX } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { Prefecture } from "../types";
import { configureHighCharts } from "./configure";

export function Graph({
  prefectures,
}: {
  prefectures: Prefecture[];
}): JSX.Element {
  const highChartsOptions = configureHighCharts(prefectures);
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={highChartsOptions}
      ref={chartComponentRef}
    />
  );
}
