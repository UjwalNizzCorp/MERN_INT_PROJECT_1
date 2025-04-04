/**
 * @file EditProfile.tsx
 * @brief This file contains the EditProfile component, which allows users to edit their profile information.
 * 
 * The component fetches user data from the server, pre-fills the form fields, and allows users to update their profile.
 * It uses React Hook Form for form handling and validation.
 * 
 * @author Muhammad Haseen
 * @date 2025/04/04
 */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm,SubmitHandler} from "react-hook-form";
import userService from "../services/userService";

/**
 * @interface UserDetails
 * @brief Represents the structure of user profile data.
 * 
 * @property name - The name of the user.
 * @property skills - The skills of the user.
 * @property experience - The years of experience of the user.
 * @property projects - The projects of the user.
 */
interface UserDetails {
  name: string;
  skills: string;
  experience: number;
  projects: string;
}

/**
 * @function EditProfile
 * @brief A React component that allows users to edit their profile information.
 * 
 * This component fetches the user's current profile data, pre-fills the form fields, and submits the updated data to the server.
 * 
 * @returns JSX.Element - The rendered EditProfile component.
 */
const EditProfile = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserDetails>();

  const fetched = useRef(false);

  /**
   * @brief Fetches the user's profile data from the server and pre-fills the form fields.
   * 
   * This effect runs only once when the component is mounted.
   */
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchUser = async () => {
      try {
        const response = await userService.getUser();
        const user = response.data;
        setValue("name", user.name);
        setValue("skills", user.skills);
        setValue("experience", user.experience);
        setValue("projects", user.projects);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [setValue]);

  /**
   * @brief Handles the form submission to update the user's profile.
   * 
   * @param data - The updated user profile data.
   */
  const onSubmit: SubmitHandler<UserDetails> = async (data: UserDetails) => {
    try {
      const res = await userService.updateUser(data);
      console.log(res);

      navigate("/profile");
    } catch (error: any) {
      console.error("Error updating profile:", error.response?.data);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form className="w-full md:w-1/2 mx-auto p-3 flex flex-col justify-center  border-2 border-blue-600 rounded-lg mb-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center text-xl md:text-3xl font-semibold text-blue-600">Edit Profile</h3>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="name">Name</label>
          <input className="border-2 border-blue-900 p-1"
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="bg-red-600">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="skills">Skills</label>
          <input className="border-2 border-blue-900 p-1" id="skills" {...register("skills")} />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="experience">Experience</label>
          <input className="border-2 border-blue-900 p-1"
            id="experience"
            type="text"
            {...register("experience", { min: 0 })}
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="projects">Projects</label>
          <textarea className="border-2 border-blue-900 p-1" id="projects" {...register("projects")} />
        </div>

        <button className="bg-blue-400 hover:bg-blue-600 p-1 duration-300 text-white font-semibold" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
