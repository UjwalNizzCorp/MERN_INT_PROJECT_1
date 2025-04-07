import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import userService from "../services/userService";
import { vi, describe, expect, it } from "vitest";
import EditProfile from "./EditProfile";
import Login from "./Login";

describe("Profile Component", () => {
  it("renders user profile data", async () => {
    vi.spyOn(userService, "getUser").mockResolvedValue({
      name: "John Doe",
      skills: "React, Node.js, MongoDB",
      projects: "Portfolio, Social Media App",
      experience: "3 years",
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("React, Node.js, MongoDB")).toBeInTheDocument();
      expect(
        screen.getByText("Portfolio, Social Media App")
      ).toBeInTheDocument();
      expect(screen.getByText("3 years")).toBeInTheDocument();
    });
  });
  it("basic elements are rendering", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Edit Profile")).toBeInTheDocument();
      expect(screen.getByText("Logout")).toBeInTheDocument();
      expect(screen.getByTestId("profileEmail")).toBeInTheDocument();
      expect(screen.getByTestId("profileSkills")).toBeInTheDocument();
      expect(screen.getByTestId("profileProjects")).toBeInTheDocument();
      expect(screen.getByTestId("profileExperience")).toBeInTheDocument();
      expect(screen.getByTestId("profileName")).toBeInTheDocument();
    });
  });
  it("navigates to login page on logout", async () => {
    const mockLogout = vi.spyOn(userService, "logout").mockResolvedValue({
      message: "Logout successful",
      ok: true,
    });

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Logout"));

      expect(mockLogout).toHaveBeenCalled();
      expect(screen.getByText(/email/i)).toBeInTheDocument();
    });
    const response = await mockLogout.mock.results[0].value;
    expect(response).toEqual({
      message: "Logout successful",
      ok: true,
    });
  });

  it("navigates to edit profile page on edit click", async () => {
    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByText("Edit Profile"));
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });
  });
});
