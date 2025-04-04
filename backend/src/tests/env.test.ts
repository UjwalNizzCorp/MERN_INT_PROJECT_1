process.env.TEST = "DONE";
// process.env.JWT_SECRET = "DONE";
// process.env.PORT = "5000";
// process.env.MONGO_URI = "mongodb://localhost:27017/test"; // Mock the database URI
import "dotenv/config";

import { getEnv } from "../constants/env.js";
afterAll(() => {
  delete process.env.TEST;
});

describe("Environment Variables", () => {
  it("should have the correct default values", () => {
    expect(getEnv("PORT")).toBe("5000");
  });

  //   it("should throw an error if the environment variable is not found", () => {
  //     expect(() => getEnv("NON_EXISTENT_VAR")).toThrow(
  //       "Erron in Getting NON_EXISTENT_VAR env"
  //     );
  //   });

  it("should log an error and exit the process if the environment variable is not found", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
    const mockConsoleLog = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    expect(() => getEnv("NON_EXISTENT_VAR")).toThrow("process.exit called");
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "Erron in Getting NON_EXISTENT_VAR env"
    );
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
    mockConsoleLog.mockRestore();
  });
});
