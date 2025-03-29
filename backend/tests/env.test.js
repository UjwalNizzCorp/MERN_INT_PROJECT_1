import { getEnv } from "../constance/env";

beforeAll(() => {
  process.env.TEST = "Done";
});

test("Env Test - Failing", () => {
  expect(getEnv("NOTAENV")).toBeNull();
});

test("Env Test -Success", () => {
  expect(getEnv("TEST")).toBe("Done");
});
