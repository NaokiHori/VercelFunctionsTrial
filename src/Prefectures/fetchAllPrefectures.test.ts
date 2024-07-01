import { jest, describe, test, expect } from "@jest/globals";
import { fetchAllPrefectures } from "./fetchAllPrefectures";
import { Prefecture } from "../types";

const mockSampleData = [
  {
    code: 1,
    name: "北海道",
  },
  {
    code: 2,
    name: "青森",
  },
  {
    code: 47,
    name: "沖縄",
  },
];

describe("fetch prefectures", () => {
  test("success", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: null,
            result: mockSampleData,
          }),
      }),
    ) as jest.Mock<() => Promise<Response>>;
    fetchAllPrefectures()
      .catch((error: unknown): never => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error(`unexpected error`);
        }
      })
      .then((prefectures: Prefecture[]) => {
        expect(prefectures).toStrictEqual(
          mockSampleData.map((data) => {
            return {
              code: data.code,
              name: data.name,
              isSelected: false,
              graphValues: null,
            };
          }),
        );
      })
      .catch((error: unknown): never => {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error(`unexpected error`);
        }
      });
  });

  test("failure", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: "Forbidden",
            result: [],
          }),
      }),
    ) as jest.Mock<() => Promise<Response>>;
    fetchAllPrefectures().catch((error: unknown) => {
      if (error instanceof Error) {
        expect(error.message).toMatch("failed to fetch prefectures");
      } else {
        throw new Error(`unexpected error`);
      }
    });
  });
});
