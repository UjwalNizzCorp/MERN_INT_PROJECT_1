// import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import Axios from "../utils/axios";

interface LoginData {
  email: string;
  password: string;
}

interface UpdateDetails{
  name: string;
  skills: string;
  experience: number;
  projects: string;

}

class UserService {
  // private api: AxiosInstance;

  // constructor() {
  //   this.api = axios.create({
  //     baseURL: "http://localhost:5000/api",
  //     withCredentials: true,
  //   });
  // }

  async login(data: LoginData) {
    console.log(data);
    try {
      const response = Axios.post("/login");
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error:", error);
      return;
    }
  }
  async getUser(): Promise<any> {
    const token = localStorage.getItem("token") || "{}";
    // console.log(token);
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
    return;
  }

  async logout(): Promise<any> {
    try {
      const response = Axios.post("/logout");
      return response;
    } catch (error) {
      return;
    }
  }
  
  async updateUser(data:UpdateDetails){
    try {
      const response = Axios.put(`/user`,data);
      return response;
    } catch (error) {
      return;
    }
    return;
  }
}

export default new UserService();
