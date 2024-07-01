import type { GraphValues } from "../types";

const END_POINT = "/api/population";

interface ApiResponse {
  message: string | null;
  total: number[][];
  junior: number[][];
  middleAged: number[][];
  senior: number[][];
}

export async function fetchGraphValues(prefCode: number): Promise<GraphValues> {
  return fetch(`${END_POINT}?prefCode=${prefCode.toString()}`)
    .then((response: Response) => {
      return response;
    })
    .then((response: Response) => {
      return response.json() as Promise<ApiResponse>;
    })
    .then((response: ApiResponse) => {
      const graphValues: GraphValues = {
        total: response.total,
        junior: response.junior,
        middleAged: response.middleAged,
        senior: response.senior,
      };
      return graphValues;
    })
    .catch((error: unknown): never => {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(
          `failed to fetch json: ${END_POINT}, ${prefCode.toString()}`,
        );
      }
    });
}
