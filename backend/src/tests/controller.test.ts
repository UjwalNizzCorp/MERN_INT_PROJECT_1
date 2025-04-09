import "dotenv/config.js";
import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { registerController } from "../controller/authControl.js";
import ErrorMessage from "../utils/errorMessage.js";
import { errorHandler } from "../middlewares/ErrorHandler.js";
import mongoose from "mongoose";
import { UserDocument } from "../model/UserModel.js";
import { UserServices } from "../service/userService.js";
// // Mock UserService
jest.mock("../service/userService.js");

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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user successfully", async () => {
    // const mockUser = {
    //   newUser: {
    //     _id: new mongoose.Types.ObjectId(),
    //     name: "test",
    //     email: "test@example.com",
    //     password: "hashedPassword",
    //     __v: 0,
    //   },
    //   token: "mockToken"
    // };
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

    // Mock the entire UserServices class
    jest
      .spyOn(UserServices.prototype, "registerUser")
      .mockResolvedValueOnce(mockUser);

    const response = await request(app).post("/register").send({
      name: "test",
      email: "test@example.com",
      password: "securePassword",
    });

    // Verify HTTP status
    expect(response.status).toBe(201);

    // Verify response structure and content
    expect(response.body).toEqual({
      newUser: expect.objectContaining({
        name: "test",
        email: "test@example.com",
      }),
      token: "mockToken",
    });

    // Verify the service was called with correct parameters
    expect(UserServices.prototype.registerUser).toHaveBeenCalledWith(
      "test",
      "test@example.com",
      "securePassword"
    );
    expect(UserServices.prototype.registerUser).toHaveBeenCalledTimes(1);
  });

  // Add error case test
  it("should handle registration errors", async () => {
    jest
      .spyOn(UserServices.prototype, "registerUser")
      .mockRejectedValueOnce(new ErrorMessage(400, "Email is already in use."));

    const response = await request(app).post("/register").send({
      name: "test",
      email: "existing@example.com",
      password: "securePassword",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email is already in use.",
    });
  });
});
