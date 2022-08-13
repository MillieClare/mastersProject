import { sum, gatherDataBaseData } from "../dataCollection";
import testData from "./mockData.json";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("return the correct data", () => {
  const results = gatherDataBaseData(testData);
  console.log("-------- results", results);
  // expect(results.Green_Bond_Issuer).toBe("ABN AMRO (2015)");
  expect(results).toBe("test");
  expect(gatherDataBaseData(testData)).toEqual([
    "ABN AMRO (2015)",
    "Netherlands",
    "Financial Institution",
    "oekom research",
  ]);
});
