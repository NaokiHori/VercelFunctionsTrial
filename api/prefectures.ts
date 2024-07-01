import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_KEY = process.env.RESAS_API_KEY ?? "";
const END_POINT = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

interface RecvObj {
  message: string | null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
}

interface SendObj {
  message: string | null;
  result: {
    code: number;
    name: string;
  }[];
}

export default async function (_req: VercelRequest, res: VercelResponse) {
  const response = await fetch(END_POINT, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  if (response.ok) {
    const recvObj = (await response.json()) as RecvObj;
    res.json({
      message: recvObj.message,
      result: recvObj.result.map(
        (pref: { prefCode: number; prefName: string }) => {
          return {
            code: pref.prefCode,
            name: pref.prefName,
          };
        },
      ),
    } satisfies SendObj);
  } else {
    res.status(response.status).json({
      message: response.statusText,
      result: [],
    } satisfies SendObj);
  }
}
