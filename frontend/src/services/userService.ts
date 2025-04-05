/**
 * @file userService.ts
 * @brief This file contains the UserService class, which handles user-related operations such as login, logout, and updating user details.
 * @author Muhammad Haseen
 * @date 2025/04/04
 */

// import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import Axios from "../utils/axios";

/**
 * Interface representing the data required for user login.
 */
interface LoginData {
  email: string; /**< User's email address. */
  password: string; /**< User's password. */
}

/**
 * Interface representing the details required to update a user.
 */
interface UpdateDetails {
  name: string; /**< User's name. */
  skills: string; /**< User's skills. */
  experience: string; /**< User's years of experience. */
  projects: string; /**< User's projects. */
}

/**
 * Service class for handling user-related operations.
 */
class UserService {
  /**
   * Logs in a user with the provided credentials.
   * @param data - The login data containing email and password.
   * @returns A promise resolving to the server response.
   */
  static async login(data: LoginData) {
    console.log("Loging data service",data);
    try {
      // const response = Axios.post("/login", data);
      const response = {
        message:"Login successful",
        ok:true,
        token:"1234567890",
      }
      console.log(response);
      return response;
    } catch (error:any) {
      console.error("Error:", error);
      // return;
      return error.response?.data?.message || "Login failed";
    }
  }

  /**
   * Retrieves the current user's details using the stored token.
   * @returns A promise resolving to the user data.
   */
 static async getUser(): Promise<any> {
    const token = localStorage.getItem("token") || "{}";
    type jwtType = { userId: string; iat: number; exp: number };
    const decoded: jwtType = jwtDecode(token);
    const userId = decoded.userId;
    console.log("decoded userId : ", userId);
    try {
      const data = Axios.get(`/user/${userId}`);
      console.log(data);
      return data;
    } catch (error) {
      return;
    }
 
  }

  /**
   * Logs out the current user.
   * @returns A promise resolving to the server response.
   */
 static async logout(): Promise<any> {
    try {
      const response = Axios.post("/logout", {});
      return response;
    } catch (error) {
      return;
    }
  }

  /**
   * Updates the current user's details.
   * @param data - The updated user details.
   * @returns A promise resolving to the server response.
   */
 static async updateUser(data: UpdateDetails) {
    try {
      const response = Axios.put(`/user`, data);
      return response;
    } catch (error) {
      return;
    }

  }
}

export default UserService;
