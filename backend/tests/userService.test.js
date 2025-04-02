import mongoose from "mongoose";
import UserService from "../service/userServices.js";
import UserModel from "../Models/UserModel.js";
import { generateToken, validateToken } from "../util/jwt.js";
import ErrorMessage from "../util/errorMessage.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import AuthUtils from "../util/authUtils.js";

jest.mock("../util/jwt.js");
jest.mock("../util/authUtils.js");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("UserService", () => {
  let userService;
  let res;

  beforeEach(() => {
    userService = new UserService();
    res = { cookies: { jwt: "mockToken" } };

    AuthUtils.prototype.hashingPassword = jest
      .fn()
      .mockResolvedValue("hashedPassword");
    AuthUtils.prototype.comparePassword = jest.fn().mockResolvedValue(true);
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  test("should register a new user", async () => {
    generateToken.mockReturnValue("mockToken");

    const { newUser, token } = await userService.registerUser(
      "testing",
      "test@example.com",
      "password",
      res
    );

    expect(newUser.email).toBe("test@example.com");
    expect(newUser.name).toBe("testing");
    expect(token).toBe("mockToken");
  });

  test("should throw an error if email is already in use", async () => {
    await UserModel.create({
      name: "test",
      email: "test@example.com",
      password: "hashedPassword",
    });

    await expect(
      userService.registerUser("test", "test@example.com", "password", res)
    ).rejects.toThrow("Email is already in use.");
  });

  test("should login a user with correct credentials", async () => {
    generateToken.mockReturnValue("mockToken");

    await UserModel.create({
      name: "test",
      email: "test@example.com",
      password: "hashedPassword",
    });

    const { user, token } = await userService.logingUser(
      "test@example.com",
      "password"
    );

    expect(user.email).toBe("test@example.com");
    expect(user.name).toBe("test");
    expect(token).toBe("mockToken");
  });

  test("should throw an error when logging in with a wrong email", async () => {
    await expect(
      userService.logingUser("wrong@example.com", "password")
    ).rejects.toThrow("User not found");
  });

  test("should throw an error when logging in with a wrong password", async () => {
    AuthUtils.prototype.comparePassword.mockResolvedValue(false);

    await UserModel.create({
      name: "test",
      email: "test@example.com",
      password: "hashedPassword",
    });

    await expect(
      userService.logingUser("test@example.com", "wrongpassword")
    ).rejects.toThrow("Unauthorized - Invalid Password");
  });

  test("should authenticate a user with a valid token", async () => {
    validateToken.mockReturnValue({ id: "12345" });
    const decoded = await userService.authenticateUser(res);
    expect(decoded.id).toBe("12345");
  });

  test("should fail authentication if token is missing", async () => {
    res.cookies.jwt = null;
    await expect(userService.authenticateUser(res)).rejects.toThrow(
      "Token not found"
    );
  });

  test("should get a user by ID", async () => {
    const newUser = await UserModel.create({
      name: "test",
      email: "test@example.com",
      password: "hashedPassword",
    });
    const fetchedUser = await userService.getUser(newUser._id);
    expect(fetchedUser.email).toBe("test@example.com");
  });

  test("should throw an error for an invalid user ID", () => {
    expect(() => userService.isValidObjectId("invalidID")).toThrow(
      "Not a valid ObjectId"
    );
  });

  test("should delete a user by ID", async () => {
    const newUser = await UserModel.create({
      name: "test",
      email: "test@example.com",
      password: "hashedPassword",
    });
    const deleted = await userService.deleteUser(newUser._id);
    expect(deleted).not.toBeNull();
  });

  test("should throw an error when deleting a non-existing user", async () => {
    await expect(
      userService.isExistingUser(new mongoose.Types.ObjectId())
    ).rejects.toThrow("User not Found");
  });
});
