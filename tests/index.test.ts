import { jsonToBuffer } from "../src";
import { arrData1, arrData2, objData1, objData2 } from "./index.test.mock";

describe("jsonStringifyArray and jsonStringifyObject", () => {
  describe("stringify array, includes null, undefined, new Date()", () => {
    it("1. should stringify array", () => {
      const strinfied = JSON.stringify(arrData1);

      expect(jsonToBuffer(arrData1)!.toString()).toEqual(strinfied);
    });
    it("2. should stringify array", () => {
      const strinfied = JSON.stringify(arrData2);

      expect(jsonToBuffer(arrData2)!.toString()).toEqual(strinfied);
    });
    it("2. should stringify [null, undefined]", () => {
      const strinfied = JSON.stringify([undefined, null, undefined]);

      expect(jsonToBuffer([undefined, null, undefined])!.toString()).toEqual(
        strinfied
      );
    });
  });

  describe("stringify object", () => {
    it("1. should stringify object - includes null, undefined, function, Date", () => {
      const strinfied = JSON.stringify(objData1);

      expect(jsonToBuffer(objData1)!.toString()).toEqual(strinfied);
    });
    it("2. should stringify object", () => {
      const strinfied = JSON.stringify(objData2);

      expect(jsonToBuffer(objData2)!.toString()).toEqual(strinfied);
    });
    it("3. should stringify { 1: undefined, 2: null, 3: undefined }", () => {
      const strinfied = JSON.stringify({ 1: undefined, 2: null, 3: undefined });

      expect(
        jsonToBuffer({ 1: undefined, 2: null, 3: undefined })!.toString()
      ).toEqual(strinfied);
    });
    it("4. should stringify {1: null, 2: undefined}", () => {
      const strinfied = JSON.stringify({ 1: undefined });

      expect(jsonToBuffer({ 1: undefined })!.toString()).toEqual(strinfied);
    });
  });

  describe("stringify primitives", () => {
    it("1. should stringify string", () => {
      const strinfied = JSON.stringify("test");

      expect(jsonToBuffer("test")!.toString()).toEqual(strinfied);
    });
    it("2. should stringify number", () => {
      const strinfied = JSON.stringify(123);

      expect(jsonToBuffer(123)!.toString()).toEqual(strinfied);
    });
    it("2. should stringify boolean", () => {
      const strinfied = JSON.stringify(false);

      expect(jsonToBuffer(false)!.toString()).toEqual(strinfied);
    });
  });

  describe("stringify nullish values", () => {
    it("1. should NOT stringify undefined", () => {
      const strinfied = JSON.stringify(undefined);

      expect(jsonToBuffer(undefined)).toEqual(strinfied);
    });
    it("2. should stringify null", () => {
      const strinfied = JSON.stringify(null);

      expect(jsonToBuffer(null)!.toString()).toEqual(strinfied);
    });
  });
});
