import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { registerController } from "../controller/authControl.js";
import UserService from "../service/userService.js";
import ErrorMessage from "../utils/errorMessage.js";
import { errorHandler } from "../middlewares/ErrorHandler.js";
import mongoose from "mongoose";
import { UserDocument } from "../model/UserModel.js";

// Mock UserService
jest.mock("../service/userService.js", () => {
  return {
    UserService: jest.fn().mockImplementation(() => ({
      registerUser: jest.fn(),
    })),
  };
});

// Custom type for request with taskbody
interface CustomRequest extends Request {
  taskbody: any;
}

const app = express();
app.use(express.json());

// Middleware to map req.body to req.taskbody
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.taskbody = req.body;
  next();
});

app.post("/register", registerController);
app.use(errorHandler);

describe("registerController", () => {
  let userServiceInstance: jest.Mocked<UserService>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Get the mocked constructor
    // Mock the registerUser method on the UserService prototype
    userServiceInstance = {
      registerUser: jest.fn(),
    } as unknown as jest.Mocked<UserService>;
  });

  it("should return 500 if an error occurs", async () => {
    const error = new ErrorMessage(500, "Something Went wrong");
    userServiceInstance.registerUser.mockRejectedValueOnce(error);

    const response = await request(app).post("/register").send({
      name: "test",
      email: "test@example.com",
      password: "securePassword",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Something Went wrong" });
    expect(userServiceInstance.registerUser).toHaveBeenCalledWith(
      "test",
      "test@example.com",
      "securePassword"
    );
  });

  it("should register a user successfully", async () => {
    const mockUser = {
      newUser: {
        _id: new mongoose.Types.ObjectId(),
        name: "test",
        email: "test@example.com",
        __v: 0,
      } as mongoose.Document<unknown, {}, UserDocument> &
        UserDocument &
        Required<{ _id: mongoose.Types.ObjectId }> & { __v: number },
      token: "mockToken",
    };

    userServiceInstance.registerUser.mockResolvedValueOnce(mockUser);

    const response = await request(app).post("/register").send({
      name: "test",
      email: "test@example.com",
      password: "securePassword",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
    expect(userServiceInstance.registerUser).toHaveBeenCalledWith(
      "test",
      "test@example.com",
      "securePassword"
    );
  });
});
