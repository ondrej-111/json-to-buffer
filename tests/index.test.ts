import { jsonToBuffer } from "../src";
import { arrData1, arrData2, objData1, objData2 } from "./index.test.mock";

describe("jsonStringifyArray and jsonStringifyObject", () => {
  describe("stringify array", () => {
    it("1. shout stringify array", () => {
      const strinfied = JSON.stringify(arrData1);

      expect(jsonToBuffer(arrData1).toString()).toEqual(strinfied);
    });
    it("2. shout stringify array", () => {
      const strinfied = JSON.stringify(arrData2);

      expect(jsonToBuffer(arrData2).toString()).toEqual(strinfied);
    });
  });

  describe("stringify object", () => {
    it("1. shout stringify object", () => {
      const strinfied = JSON.stringify(objData1);

      expect(jsonToBuffer(objData1).toString()).toEqual(strinfied);
    });
    it("2. shout stringify object", () => {
      const strinfied = JSON.stringify(objData2);

      expect(jsonToBuffer(objData2).toString()).toEqual(strinfied);
    });
  });
});
