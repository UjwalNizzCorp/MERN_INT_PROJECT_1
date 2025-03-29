import request from "supertest";
import express from "express";
import { registerController } from "../Controllers/authController.js";
import UserService from "../service/UserServices.js";

// Mock UserService
jest.mock("../service/UserServices.js");

const app = express();
app.use(express.json());

// Middleware to map req.body to req.taskbody
app.use((req, res, next) => {
  req.taskbody = req.body;
  next();
});

app.post("/register", registerController);

describe("registerController", () => {
  let mockRegisterUser;

  beforeEach(() => {
    mockRegisterUser = jest.fn();
    UserService.mockClear();
    UserService.mockImplementation(() => ({
      registerUser: mockRegisterUser,
    }));
  });

  it("should return 500 if an error occurs", async () => {
    mockRegisterUser.mockRejectedValue(new Error("DB error"));

    const res = await request(app).post("/register").send({
      email: "test@example.com",
      password: "securePassword",
    });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ messge: "Something Went wrong" });
    expect(mockRegisterUser).toHaveBeenCalled();
  });

  it("should register a user successfully", async () => {
    mockRegisterUser.mockResolvedValue({
      id: "123",
      email: "test@example.com",
    });

    const res = await request(app).post("/register").send({
      email: "test@example.com",
      password: "securePassword",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: "123", email: "test@example.com" });
    expect(mockRegisterUser).toHaveBeenCalledWith(
      "test@example.com",
      "securePassword",
      expect.any(Object)
    );
  });
});
