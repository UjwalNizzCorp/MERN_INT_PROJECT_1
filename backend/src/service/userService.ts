import UserModel from "../model/UserModel.js";
import { generateToken, validateToken } from "../utils/jwt.js";
import ErrorMessage from "../utils/errorMessage.js";
import mongoose from "mongoose";
import AuthUtils from "../utils/authUtil.js";
import { Request } from "express";

/**
 * @author Jaseem
 * @class UserService
 * @description This class provides methods for user registration, login, authentication, and management.
 * @method registerUser - Registers a new user with the provided name, email, and password.
 * @method logingUser - Logs in a user with the provided email and password.
 * @method authenticateUser - Authenticates a user using the provided token.
 * @method getUser - Retrieves a user by their ID.
 * @method deleteUser - Deletes a user by their ID.
 * @method isExistingUser - Checks if a user exists by their ID.
 * @method isValidObjectId - Checks if the provided ID is a valid ObjectId.
 * @throws {ErrorMessage} - Throws an error if the user is not found, the email is already in use, or the ID is not valid.
 */
class UserService {
  /**
   * @brief Registers a new user with the provided name, email, and password.
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<{ newUser: object, token: string }>} - The newly registered user and their token.
   * @throws {ErrorMessage} - Throws an error if the email is already in use.
   */
  async registerUser(name: string, email: string, password: string) {
    // name, skills, projects, experience
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      throw new ErrorMessage(400, "Email is already in use.");
    }
    const authUtil = new AuthUtils();
    const hashedpassword = await authUtil.hashingPassword(password);
    const newUser = new UserModel({
      name,
      email,
      password: hashedpassword,
    });
    const token = generateToken(newUser._id.toString());
    await newUser.save();
    return { newUser, token: token };
  }

  /**
   * @brief Logs in a user with the provided email and password.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<{ user: object, token: string }>} - The logged-in user and their token.
   * @throws {ErrorMessage} - Throws an error if the user is not found or the password is invalid.
   */
  async logingUser(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ErrorMessage(404, "User not found");
    }
    const authUtil = new AuthUtils();
    const isValid = await authUtil.comparePassword(password, user.password);
    if (!isValid) {
      throw new ErrorMessage(400, "Unauthorized - Invalid Password");
    }

    const token = generateToken(user._id.toString());
    const returnValue = {
      name: user.name,
      email: user.email,
      token: token,
    };

    return { user, token: token };
  }

  /**
   * @brief Authenticates a user using the provided token.
   * @param {object} res - The response object containing the token.
   * @returns {Promise<object>} - The decoded token.
   * @throws {ErrorMessage} - Throws an error if the token is not found or invalid.
   * */
  async authenticateUser(req: Request) {
    const token = req.cookies.jwt;
    if (!token) {
      throw new ErrorMessage(400, "Token not found");
    }
    const decode = validateToken(token);
    return decode;
  }

  /**
   * @brief Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<object>} - The user object.
   * @throws {ErrorMessage} - Throws an error if the user is not found or the ID is not valid.
   */
  async getUser(id: string) {
    this.isValidObjectId(id);
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ErrorMessage(404, "User not Found");
    }
    return user;
  }

  /**
   * @brief Deletes a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<object>} - The deleted user object.
   * @throws {ErrorMessage} - Throws an error if the user is not found or the ID is not valid.
   */
  async deleteUser(id: string) {
    this.isValidObjectId(id);
    this.isExistingUser(id);
    const respose = await UserModel.findByIdAndDelete(id);
    return respose;
  }

  /**
   * @brief Checks if a user exists by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<void>} - Returns nothing if the user exists.
   * @throws {ErrorMessage} - Throws an error if the user is not found or the ID is not valid.
   */
  async isExistingUser(id: string) {
    const isUserExist = await UserModel.findById(id);
    if (!isUserExist) {
      throw new ErrorMessage(404, "User not Found");
    }
  }

  /**
   * @brief Checks if the provided ID is a valid ObjectId.
   * @param {string} id - The ID to check.
   * @throws {ErrorMessage} - Throws an error if the ID is not valid.
   */
  isValidObjectId(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new ErrorMessage(400, "Not a valid ObjectId");
    }
  }
}

export default UserService;
