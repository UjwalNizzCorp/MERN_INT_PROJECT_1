import axios, { AxiosInstance } from "axios";
class Axios {
  private static api: AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
  });
  static async get(url: string) {
    try {
      //   api
      //     .get(url)
      //     .then((response) => {
      //       return response.data;
      //     })
      //     .catch((err) => {
      //       throw new Error(err || "Failed to fetch data");
      //     });
      const response = await this.api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error || "Unknown Error Occured");
    }
  }
  static async post(url: string,data:{}) {
    try {
      const response = await this.api.post(url,data);
      return response.data;
    } catch (error: any) {
      throw new Error(error || "Unknown Error");
    }
  }
  static async put(url: string,data:{}) {
    try {
      const response = await this.api.put(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error || "Unknown Error");
    }
  }
  static async delete(url: string,id:string) {
    try {
      const response = await this.api.delete(`${url}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error || "Unknown Error");
    }
  }
}
export default Axios;
