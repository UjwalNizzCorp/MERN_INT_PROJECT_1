import "dotenv/config.js";
import { beforeEach, expect, describe, it, vi, Mock } from "vitest";
import { getSingleUser, loginController, registerController } from "./authControl.js";
import UserService from "../service/userService.js";

const mockUser = {
  name: "user",
  email: "email@gmail.com",
  password: "123",
};

vi.mock("../service/userService.js");

describe("registerController", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = { body: { name: "user", email: "email@gmail.com", password: "123" } };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should return user data with status 201", async () => {
    (UserService as unknown as Mock).mockImplementation(() => ({
      registerUser: vi.fn().mockResolvedValue(mockUser),
    }));

    await registerController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with error if service throws", async () => {
    const error = new Error("Service error");

    (UserService as unknown as Mock).mockImplementation(() => ({
      registerUser: vi.fn().mockRejectedValue(error),
    }));

    await registerController(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("loginController", () => {
    let req: any;
    let res: any;
    let next: any;

    beforeEach(() => {
        req = { body: { email: "email@gmail.com", password: "123" } };
        res = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn(),
        };
        next = vi.fn();
      });

    it("should return user data with status 200", async () => {
        (UserService as unknown as Mock).mockImplementation(() => ({
          logingUser: vi.fn().mockResolvedValue(mockUser),
        }));
  
        await loginController(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUser);
        expect(next).not.toHaveBeenCalled();
      });
    it("should call next with error if service throws", async () => {
        const error = new Error("Service error");

        (UserService as unknown as Mock).mockImplementation(() => ({
          logingUser: vi.fn().mockRejectedValue(error),
        }));

        await loginController(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
      })
});

describe("getSingleUser", () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = { params: { id: "123" } };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it("should return user data with status 200", async () => {
    (UserService as unknown as Mock).mockImplementation(() => ({
      getUser: vi.fn().mockResolvedValue(mockUser),
    }));

    await getSingleUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next with error if service throws", async () => {
    const error = new Error("Service error");

    (UserService as unknown as Mock).mockImplementation(() => ({
      getUser: vi.fn().mockRejectedValue(error),
    }));

    await getSingleUser(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

