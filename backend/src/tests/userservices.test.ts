import UserService from "../service/userService.js";
import UserModel from "../model/UserModel.js";
import { generateToken, validateToken } from "../utils/jwt.js";
import AuthUtils from "../utils/authUtil.js";
import ErrorMessage from "../utils/errorMessage.js";
import mongoose from "mongoose";

jest.mock("../model/UserModel");
jest.mock("../utils/jwt");
jest.mock("../utils/authUtil");

describe("UserService", () => {
  const userService = new UserService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a new user and return the user and token", async () => {
      const mockUser = {
        _id: "123",
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
      };
      const mockToken = "mockToken";

      UserModel.findOne = jest.fn().mockResolvedValue(null);
      AuthUtils.prototype.hashingPassword = jest
        .fn()
        .mockResolvedValue("hashedPassword");
      UserModel.prototype.save = jest.fn().mockResolvedValue(mockUser);
      jest.spyOn({ generateToken }, "generateToken").mockReturnValue(mockToken);

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
      expect(UserModel.prototype.save).toHaveBeenCalled();
      expect(generateToken).toHaveBeenCalledWith(mockUser._id.toString());
      expect(result).toEqual({ newUser: mockUser, token: mockToken });
    });

    it("should throw an error if email is already in use", async () => {
      UserModel.findOne = jest
        .fn()
        .mockResolvedValue({ email: "john@example.com" });

      await expect(
        userService.registerUser("John", "john@example.com", "password123")
      ).rejects.toThrow(new ErrorMessage(400, "Email is already in use."));
    });
  });

  describe("logingUser", () => {
    it("should log in a user and return the user and token", async () => {
      const mockUser = {
        _id: "123",
        name: "John",
        email: "john@example.com",
        password: "hashedPassword",
      };
      const mockToken = "mockToken";

      UserModel.findOne = jest.fn().mockResolvedValue(mockUser);
      AuthUtils.prototype.comparePassword = jest.fn().mockResolvedValue(true);
      jest.spyOn({ generateToken }, "generateToken").mockReturnValue(mockToken);

      const result = await userService.logingUser(
        "john@example.com",
        "password123"
      );

      expect(UserModel.findOne).toHaveBeenCalledWith({
        email: "john@example.com",
      });
      expect(AuthUtils.prototype.comparePassword).toHaveBeenCalledWith(
        mockUser.password,
        "password123"
      );
      expect(generateToken).toHaveBeenCalledWith(mockUser._id.toString());
      expect(result).toEqual({ user: mockUser, token: mockToken });
    });

    it("should throw an error if user is not found", async () => {
      UserModel.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        userService.logingUser("john@example.com", "password123")
      ).rejects.toThrow(new ErrorMessage(404, "User not found"));
    });

    it("should throw an error if password is invalid", async () => {
      const mockUser = { password: "hashedPassword" };

      UserModel.findOne = jest.fn().mockResolvedValue(mockUser);
      AuthUtils.prototype.comparePassword = jest.fn().mockResolvedValue(false);

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

      UserModel.findById = jest.fn().mockResolvedValue(mockUser);
      mongoose.isValidObjectId = jest.fn().mockReturnValue(true);

      const result = await userService.getUser("123");

      expect(UserModel.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockUser);
    });

    it("should throw an error if user is not found", async () => {
      UserModel.findById = jest.fn().mockResolvedValue(null);
      mongoose.isValidObjectId = jest.fn().mockReturnValue(true);

      await expect(userService.getUser("123")).rejects.toThrow(
        new ErrorMessage(404, "User not Found")
      );
    });

    it("should throw an error if ID is invalid", async () => {
      mongoose.isValidObjectId = jest.fn().mockReturnValue(false);

      await expect(userService.getUser("invalid-id")).rejects.toThrow(
        new ErrorMessage(400, "Not a valid ObjectId")
      );
    });
  });

  // Additional test cases for deleteUser, isExistingUser, and isValidObjectId can be added similarly.
});
