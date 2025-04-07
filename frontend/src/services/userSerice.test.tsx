import { describe, expect, it} from "vitest";
import UserService from "./userService";

describe("UserService", () => {
  it("functions are defined", () => {
    expect(UserService.login).toBeDefined();
    expect(UserService.getUser).toBeDefined();
    expect(UserService.updateUser).toBeDefined();
    expect(UserService.logout).toBeDefined();
  });
});
