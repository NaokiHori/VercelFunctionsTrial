import React, { JSX } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { Prefecture } from "../types";
import { configureHighCharts } from "./configure";
import * as style from "./styles.css";

function ToggleMetrics({
  metricTypes,
  setMetricTypeIndex,
}: {
  metricTypes: string[];
  setMetricTypeIndex: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  return (
    <div className={style.metricContainer}>
      {metricTypes.map((metricType: string, index: number) => (
        <div
          key={index}
          onClick={() => {
            setMetricTypeIndex(index);
          }}
          className={style.metricItem}
        >
          {metricType}
        </div>
      ))}
    </div>
  );
}

export function Graph({
  prefectures,
}: {
  prefectures: Prefecture[];
}): JSX.Element {
  const metricTypes = ["総人口", "年少人口", "生産年齢人口", "老年人口"];
  const [metricTypeIndex, setMetricTypeIndex] = React.useState<number>(0);
  const highChartsOptions = configureHighCharts(
    prefectures,
    metricTypes,
    metricTypeIndex,
  );
  const chartComponentRef = React.useRef<HighchartsReact.RefObject>(null);
  return (
    <div>
      <ToggleMetrics
        metricTypes={metricTypes}
        setMetricTypeIndex={setMetricTypeIndex}
      />
      <HighchartsReact
        highcharts={Highcharts}
        options={highChartsOptions}
        ref={chartComponentRef}
      />
    </div>
  );
}
