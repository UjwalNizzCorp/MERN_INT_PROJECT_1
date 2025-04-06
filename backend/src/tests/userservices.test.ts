import "dotenv/config.js";
import { UserServices } from "../service/userService.js";
import UserModel from "../model/UserModel.js";
import { generateToken, validateToken } from "../utils/jwt.js";
import AuthUtils from "../utils/authUtil.js";
import ErrorMessage from "../utils/errorMessage.js";
import mongoose from "mongoose";

// Mock dependencies, but NOT UserServices itself
jest.mock("../model/UserModel.js");
jest.mock("../utils/jwt.js");
jest.mock("../utils/authUtil.js");

describe("UserService", () => {
  let userService: UserServices;

  beforeEach(() => {
    jest.clearAllMocks();
    userService = new UserServices();
  });

  describe("registerUser", () => {
    it("should register a new user and return the user and token", async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
        save: jest.fn().mockResolvedValue(true),
      };
      const mockToken = "mockToken";

      // Fix mock implementations
      (UserModel.findOne as jest.Mock).mockResolvedValue(null);
      (UserModel as any).mockImplementation(() => mockUser);
      (generateToken as jest.Mock).mockReturnValue(mockToken);
      jest
        .spyOn(AuthUtils.prototype, "hashingPassword")
        .mockResolvedValue("hashedPassword");

      const result = await userService.registerUser(
        "John",
        "john@example.com",
        "password123"
      );

      expect(UserModel.findOne).toHaveBeenCalledWith({
        email: "john@example.com",
      });
      expect(AuthUtils.prototype.hashingPassword).toHaveBeenCalledWith(
        "password123"
      );
      expect(generateToken).toHaveBeenCalledWith(mockUser._id.toString());
      expect(result).toEqual({
        newUser: expect.objectContaining({
          name: "John",
          email: "john@example.com",
        }),
        token: mockToken,
      });
    });

    it("should throw an error if email is already in use", async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue({
        email: "john@example.com",
      });

      await expect(
        userService.registerUser("John", "john@example.com", "password123")
      ).rejects.toThrow(new ErrorMessage(400, "Email is already in use."));
    });
  });

  describe("logingUser", () => {
    it("should log in user and return user with token", async () => {
      const mockUser = {
        _id: new mongoose.Types.ObjectId(),
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
      };
      const mockToken = "mockToken";

      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
      (generateToken as jest.Mock).mockReturnValue(mockToken);
      jest
        .spyOn(AuthUtils.prototype, "comparePassword")
        .mockResolvedValue(true);

      const result = await userService.logingUser(
        "john@example.com",
        "password123"
      );

      expect(UserModel.findOne).toHaveBeenCalledWith({
        email: "john@example.com",
      });
      expect(AuthUtils.prototype.comparePassword).toHaveBeenCalledWith(
        "password123",
        mockUser.password
      );
      expect(result).toEqual({
        user: mockUser,
        token: mockToken,
      });
    });

    it("should throw an error if user is not found", async () => {
      (UserModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        userService.logingUser("john@example.com", "password123")
      ).rejects.toThrow(new ErrorMessage(404, "User not found"));
    });

    it("should throw an error if password is invalid", async () => {
      const mockUser = { password: "hashedPassword" };

      (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
      jest
        .spyOn(AuthUtils.prototype, "comparePassword")
        .mockResolvedValue(false);

      await expect(
        userService.logingUser("john@example.com", "password123")
      ).rejects.toThrow(
        new ErrorMessage(400, "Unauthorized - Invalid Password")
      );
    });
  });

  describe("authenticateUser", () => {
    it("should authenticate a user and return the decoded token", async () => {
      const mockToken = "mockToken";
      const mockDecoded = { id: "123" };

      (validateToken as jest.Mock).mockReturnValue(mockDecoded);

      const req = { cookies: { jwt: mockToken } } as any;
      const result = await userService.authenticateUser(req);

      expect(validateToken).toHaveBeenCalledWith(mockToken);
      expect(result).toEqual(mockDecoded);
    });

    it("should throw an error if token is not found", async () => {
      const req = { cookies: {} } as any;

      await expect(userService.authenticateUser(req)).rejects.toThrow(
        new ErrorMessage(400, "Token not found")
      );
    });
  });

  describe("getUser", () => {
    it("should retrieve a user by ID", async () => {
      const mockUser = { _id: "123", name: "John" };

      (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);
      jest.spyOn(mongoose, "isValidObjectId").mockReturnValue(true);

      const result = await userService.getUser("123");

      expect(UserModel.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user is not found", async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue(null);
      jest.spyOn(mongoose, "isValidObjectId").mockReturnValue(true);

      await expect(userService.getUser("123")).rejects.toThrow(
        new ErrorMessage(404, "User not Found")
      );
    });

    it("should throw an error if ID is invalid", async () => {
      jest.spyOn(mongoose, "isValidObjectId").mockReturnValue(false);

      await expect(userService.getUser("invalid-id")).rejects.toThrow(
        new ErrorMessage(400, "Not a valid ObjectId")
      );
    });
  });
});
