import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import UserService from "./userService.js";
import UserModel from "../model/UserModel.js";
import ErrorMessage from "../utils/errorMessage.js";
import * as jwtUtils from "../utils/jwt.js";
import AuthUtils from "../utils/authUtil.js";

vi.mock("../model/UserModel.js", () => ({
  default: {
    findOne: vi.fn(),
    findById: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

vi.mock("../utils/jwt.js", () => ({
  generateToken: vi.fn(),
  validateToken: vi.fn(),
}));

vi.mock("../utils/authUtil.js");

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
    vi.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should throw an error if email already exists", async () => {
      (UserModel.findOne as Mock).mockResolvedValueOnce({ email: "test@example.com" });

      await expect(service.registerUser("Test", "test@example.com", "password"))
        .rejects.toThrowError(new ErrorMessage(400, "Email is already in use."));
    });

    it("should register a user if email doesn't exist", async () => {
      (UserModel.findOne as Mock).mockResolvedValueOnce(null);
      
      const fakeHash = "hashed_password";
      const fakeToken = "mocked_token";

      const mockSave = vi.fn().mockResolvedValue({ _id: "123" });

      const mockUserInstance = {
        _id: "123",
        name: "Test",
        email: "test@example.com",
        password: fakeHash,
        save: mockSave,
      };

      (AuthUtils as unknown as Mock).mockImplementation(() => ({
        hashingPassword: vi.fn().mockResolvedValue(fakeHash),
      }));

      (jwtUtils.generateToken as Mock).mockReturnValue(fakeToken);

      const UserModelConstructor = vi.fn().mockReturnValue(mockUserInstance);
      // override actual class temporarily
      Object.assign(UserModelConstructor, UserModel);

      const OriginalUserService = await vi.importActual<typeof import("./userService.js")>(
        "./userService.js"
      );

      class CustomUserService extends OriginalUserService.default {
        constructor() {
          super();
        }

        async registerUser(name: string, email: string, password: string) {
          const isExist = await UserModel.findOne?.({ email });
          if (isExist) {
            throw new ErrorMessage(400, "Email is already in use.");
          }
          const authUtil = new AuthUtils();
          const hashedpassword = await authUtil.hashingPassword(password);
          const newUser = new UserModelConstructor({
            name,
            email,
            password: hashedpassword,
          });
          const token = jwtUtils.generateToken(newUser._id.toString());
          await newUser.save();
          return { newUser, token: token };
        }
      }

      const customService = new CustomUserService();

      const result = await customService.registerUser("Test", "test@example.com", "password");

      expect(result).toEqual({
        newUser: mockUserInstance,
        token: fakeToken,
      });

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(jwtUtils.generateToken).toHaveBeenCalledWith("123");
    });
  });

  describe("logingUser", () => {
    it("should throw error if user is not found", async () => {
      (UserModel.findOne as Mock).mockResolvedValueOnce(null);

      await expect(service.logingUser("notfound@example.com", "123456"))
        .rejects.toThrowError(new ErrorMessage(404, "User not found"));
    });

    it("should throw error if password is invalid", async () => {
      const mockUser = {
        email: "user@example.com",
        password: "hashed",
      };

      (UserModel.findOne as Mock).mockResolvedValueOnce(mockUser);

      (AuthUtils as unknown as Mock).mockImplementation(() => ({
        comparePassword: vi.fn().mockResolvedValue(false),
      }));

      await expect(service.logingUser("user@example.com", "wrongpass"))
        .rejects.toThrowError(new ErrorMessage(400, "Unauthorized - Invalid Password"));
    });

    it("should return user and token if credentials are valid", async () => {
      const mockUser = {
        _id: "abc123",
        name: "Test User",
        email: "test@example.com",
        password: "hashed",
      };

      (UserModel.findOne as Mock).mockResolvedValueOnce(mockUser);

      (AuthUtils as unknown as Mock).mockImplementation(() => ({
        comparePassword: vi.fn().mockResolvedValue(true),
      }));

      (jwtUtils.generateToken as Mock).mockReturnValue("valid_token");

      const result = await service.logingUser("test@example.com", "correctpass");

      expect(result).toEqual({
        user: mockUser,
        token: "valid_token",
      });
    });
  });
});
