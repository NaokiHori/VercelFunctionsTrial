import { Prefecture } from "../types";

const END_POINT = "/api/prefectures";

interface ApiResponse {
  message: string | null;
  result: { prefCode: number; prefName: string }[];
}

export async function fetchAllPrefectures(): Promise<Prefecture[]> {
  return fetch(END_POINT)
    .then((response: Response) => {
      return response;
    })
    .then((response: Response) => {
      return response.json() as Promise<ApiResponse>;
    })
    .then((response: ApiResponse) => {
      const newPrefectures: Prefecture[] = response.result.map(
        (result: { prefCode: number; prefName: string }) => {
          return {
            code: result.prefCode,
            name: result.prefName,
            isSelected: false,
            graphValues: null,
          } satisfies Prefecture;
        },
      );
      return newPrefectures;
    });
}
