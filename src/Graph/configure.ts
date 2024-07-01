import type { Prefecture, GraphValues } from "../types";

const colorList = [
  "#2caffe",
  "#544fc5",
  "#00e272",
  "#fe6a35",
  "#6b8abc",
  "#d568fb",
  "#2ee0ca",
  "#fa4b42",
  "#feb56a",
  "#91e8e1",
];

const symbolList = ["circle", "square", "diamond", "triangle", "triangle-down"];

function getColor(code: number): string {
  return colorList[code % colorList.length];
}

function getSymbol(code: number): string {
  // 色とシンボルが同時に被らないようにする
  // 色配列の周期ごとにマークを変える
  return symbolList[Math.floor(code / colorList.length) % symbolList.length];
}

function selectGraphValues(
  graphValues: GraphValues | null,
  index: number,
): number[][] {
  if (!graphValues) {
    throw new Error("falsy graphValues are passed, which is unexpected");
  }
  switch (index) {
    case 0: {
      return graphValues.total;
    }
    case 1: {
      return graphValues.junior;
    }
    case 2: {
      return graphValues.middleAged;
    }
    case 3: {
      return graphValues.senior;
    }
    default: {
      throw new Error(`unknown graph values specified: ${index.toString()}`);
    }
  }
}

export function configureHighCharts(
  prefectures: Prefecture[],
  metricTypes: string[],
  metricTypeIndex: number,
): Highcharts.Options {
  return {
    accessibility: {
      enabled: false,
    },
    title: {
      text: metricTypes[metricTypeIndex],
    },
    chart: {
      allowMutatingData: false,
      animation: false,
    },
    plotOptions: {
      series: {
        animation: false,
      },
    },
    series: prefectures
      .filter((prefecture: Prefecture) => {
        return prefecture.graphValues && prefecture.isSelected;
      })
      .map((prefecture: Prefecture) => {
        return {
          type: "line",
          data: selectGraphValues(prefecture.graphValues, metricTypeIndex),
          name: prefecture.name,
          color: getColor(prefecture.code),
          marker: {
            symbol: getSymbol(prefecture.code),
          },
        };
      }),
    xAxis: {
      title: {
        text: "年",
      },
    },
    yAxis: {
      title: {
        text: "人口",
      },
    },
  } satisfies Highcharts.Options;
}
