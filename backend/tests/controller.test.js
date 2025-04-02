import request from "supertest";
import express from "express";
import { registerController } from "../Controllers/authController.js";
import UserService from "../service/userServices.js";
import ErrorMessage from "../util/errorMessage.js";
import { errorHandler } from "../Middleware/errorHandler.js";

// Mock UserService
jest.mock("../service/userServices.js");

const app = express();
app.use(express.json());

// Middleware to map req.body to req.taskbody
app.use((req, res, next) => {
  req.taskbody = req.body;
  next();
});

app.post("/register", registerController);
app.use(errorHandler);

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
    mockRegisterUser.mockRejectedValue(
      new ErrorMessage(500, "Something Went wrong")
    );

    const res = await request(app).post("/register").send({
      name: "test",
      email: "test@example.com",
      password: "securePassword",
    });

    expect(res.status).toBe(500);
    await expect(res.body).toEqual({ message: "Something Went wrong" });
    // expect(res.body).toEqual({ message: "Something Went wrong" });
    expect(mockRegisterUser).toHaveBeenCalled();
  });

  it("should register a user successfully", async () => {
    mockRegisterUser.mockResolvedValue({
      id: "123",
      name: "test",
      email: "test@example.com",
    });

    const res = await request(app).post("/register").send({
      name: "test",
      email: "test@example.com",
      password: "securePassword",
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: "123",
      email: "test@example.com",
      name: "test",
    });
    expect(mockRegisterUser).toHaveBeenCalledWith(
      "test",
      "test@example.com",
      "securePassword"
    );
  });
});
