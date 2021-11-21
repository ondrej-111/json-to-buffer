import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageReporters: ["json", "html"],
  collectCoverageFrom: ["src/index.ts"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./html-report",
        filename: "report.html",
        expand: true,
        openReport: true,
      },
    ],
  ],
};

export default config;
