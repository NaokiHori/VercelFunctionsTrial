import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_KEY = process.env.RESAS_API_KEY ?? "";
const END_POINT =
  "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear";

interface RecvObj {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: { year: number; value: number }[];
    }[];
  };
}

interface SendObj {
  message: string | null;
  total: number[][];
  junior: number[][];
  middleAged: number[][];
  senior: number[][];
}

export default async function (req: VercelRequest, res: VercelResponse) {
  const { prefCode = "" } = req.query;
  const defaultObj: SendObj = {
    message: null,
    total: [[]],
    junior: [[]],
    middleAged: [[]],
    senior: [[]],
  };
  if (!prefCode) {
    return res.status(400).json({
      ...defaultObj,
      message: "prefCode is required",
    } satisfies SendObj);
  }
  if (typeof prefCode !== "string") {
    return res.status(400).json({
      ...defaultObj,
      message: "give only one prefCode",
    } satisfies SendObj);
  }
  const response = await fetch(`${END_POINT}?cityCode=-&prefCode=${prefCode}`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const recvObj: RecvObj = (await response.json()) as RecvObj;
  const message: string | null = recvObj.message;
  const metrics: number[][][] = recvObj.result.data.map(
    (metric: { label: string; data: { year: number; value: number }[] }) =>
      metric.data
        .filter(
          (element: { year: number; value: number }) =>
            element.year <= recvObj.result.boundaryYear,
        )
        .map((element: { year: number; value: number }) => [
          element.year,
          element.value,
        ]),
  );
  res.json({
    message,
    total: metrics[0],
    junior: metrics[1],
    middleAged: metrics[2],
    senior: metrics[3],
  } satisfies SendObj);
}
