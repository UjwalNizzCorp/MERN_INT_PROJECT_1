/**
 * @file Login.tsx
 * @brief This file contains the Login component, which allows users to log in to the application.
 *
 * The component provides a form for users to enter their email and password, and handles authentication.
 *
 * @date 2025/04/04
 * @author Muhammad Haseen
 */

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

/**
 * @interface LoginData
 * @brief Represents the structure of login form data.
 *
 * @property email - The email address of the user.
 * @property password - The password of the user.
 */
interface LoginData {
  email: string;
  password: string;
}

/**
 * @function Login
 * @brief A React component that provides a login form for users.
 *
 * This component allows users to log in by submitting their email and password. On successful login, it navigates to the profile page.
 *
 * @returns JSX.Element - The rendered Login component.
 */
const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginData>();

  /**
   * @brief Handles the form submission for user login.
   *
   * @param data - The login form data containing email and password.
   */
  const onSubmit = async (data: LoginData): Promise<void> => {
    console.log("Form submitted in Login tsx:", data);

    try {
      const res = await userService.login(data);
      if (res && res.ok) {
        console.log(res);
        localStorage.setItem("token", res.token);
        navigate("/profile");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="h-screen w-screen flex justify-center items-center ">
      <form
        className="w-full md:w-1/2 mx-auto p-3 flex flex-col justify-center  border-2 border-blue-600 rounded-lg mb-2 gap-2"
        data-testid="login"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-xl md:text-3xl font-semibold">Login</h1>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="email">Email</label>
          <input
            data-testid="email"
            className="border-2 border-blue-900 p-1"
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="password">Password</label>
          <input
            data-testid="password"
            className="border-2 border-blue-900 p-1"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <button
          className="bg-blue-500 w-full p-2 text-white hover:bg-blue-600 duration-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
