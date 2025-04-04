/**
 * @file Welcome.tsx
 * @brief This file contains the Welcome component, which serves as the landing page for the application.
 * 
 * The component provides a welcome message and a navigation link to the login page.
 * 
 * @author Muahmmad Haseen NM
 * @date 2025/04/04
 */

import { useNavigate } from "react-router-dom";

/**
 * @function Welcome
 * @brief A React component that displays a welcome message and a link to the login page.
 * 
 * @returns JSX.Element - The rendered Welcome component.
 */
function Welcome() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen gap-2">
      <h1 className="text-center text-xl md:text-3xl font-semibold">
        Hey👋<br />Welcome to Dynamic Portfolio
      </h1>
      <span
        className="cursor-pointer underline hover:text-blue-600 duration-300"
        onClick={() => {
          navigate("/login");
        }}
      >
        Click here to login
      </span>
    </main>
  );
}

export default Welcome;