/**
 * @file Profile.tsx
 * @brief This file contains the Profile component, which displays the user's profile information.
 * 
 * The component fetches user data from the server and displays it. It also provides options to edit the profile or log out.
 * 
 * @date 
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

/**
 * @interface UserDetails
 * @brief Represents the structure of user profile data.
 * 
 * @property name - The name of the user.
 * @property email - The email address of the user.
 * @property skills - The skills of the user.
 * @property projects - The projects of the user.
 * @property experience - The years of experience of the user.
 */
interface UserDetails {
  name: string;
  email: string;
  skills: string;
  projects: string;
  experience: string;
}

/**
 * @function Profile
 * @brief A React component that displays the user's profile information.
 * 
 * This component fetches the user's profile data, displays it, and provides options to edit the profile or log out.
 * 
 * @returns JSX.Element - The rendered Profile component.
 */
const Profile = () => {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const navigate = useNavigate();

  /**
   * @brief Fetches the user's profile data from the server.
   * 
   * This effect runs once when the component is mounted.
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
       
        // const response = {
        //   name: "John Doe",
        //   email: "john.doe@example.com",
        //   skills: "React, Node.js, MongoDB",
        //   projects: "Portfolio, Social Media App",
        //   experience: "3 years",
        // };
        const response = await userService.getUser();
        setUserData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  /**
   * @brief Logs the user out and navigates to the login page.
   */
  const handleLogout = () => {
    userService.logout();
    navigate("/login");
  };

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold text-center my-10">
        Profile
      </h1>
      {userData ? (
        <div className="flex flex-col justify-center pl-10 py-2 mx-auto w-screen ">
          <h2
            className="text-xl md:text-3xl font-semibold"
            data-testid="profileName"
          >
            {userData.name}
          </h2>
          <p data-testid="profilEmail">Email: <span className="font-semibold">{userData.email}</span></p>
          <p data-testid="profileSkills">Skills: <span className="font-semibold">{userData.skills}</span></p>
          <p data-testid="profileProjects">Projects: <span className="font-semibold">{userData.projects}</span></p>
          <p data-testid="profileExperience">
            Experience: <span className="font-semibold">{userData.experience}</span>
          </p>
          <div className="flex flex-row gap-6 mt-6">
            <button className="bg-blue-400 p-1" onClick={() => navigate("/edit")}>Edit Profile</button>
            <button className="bg-red-400 p-1" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
