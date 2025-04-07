import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import EditProfile from "./EditProfile";
import { MemoryRouter, Route, Routes } from "react-router";
import UserService from "../services/userService";
import Profile from "./Profile";

describe("EditProfile Component", () => {
  it("renders the edit profile form with labels", () => {
    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/skills/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/projects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save Changes/i })
    ).toBeInTheDocument();
  });

  it("renders user profile data", async () => {
    vi.spyOn(UserService, "getUser").mockResolvedValue({
      name: "John Doe",
      skills: "React, Node.js, MongoDB",
      projects: "Portfolio, Social Media App",
      experience: "3 years",
    });

    render(
      <MemoryRouter>
        <EditProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
      expect(screen.getByLabelText(/skills/i)).toHaveValue(
        "React, Node.js, MongoDB"
      );
      expect(screen.getByLabelText(/projects/i)).toHaveValue(
        "Portfolio, Social Media App"
      );
      expect(screen.getByLabelText(/experience/i)).toHaveValue("3 years");
    });
  });
  it("calls login and redirects to profile on successful login", async () => {
    
    const mockUpdate = vi.spyOn(UserService, "updateUser").mockResolvedValue({
      message: "Update successful",
      ok: true,
    });

    render(
      <MemoryRouter initialEntries={["/edit"]}>
        <Routes>
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
        fireEvent.change(screen.getByLabelText(/name/i), {
            target: { value: "hnm" },
          });
          fireEvent.change(screen.getByLabelText(/skills/i), {
            target: { value: "m,n,b" },
          });
          fireEvent.change(screen.getByLabelText(/experience/i), {
            target: { value: "10 year" },
          });
          fireEvent.change(screen.getByLabelText(/projects/i), {
            target: { value: "m,n,b" },
          });
      
          fireEvent.click(screen.getByRole("button", { name: /Save Changes/i }));
    })

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith({
        name: "hnm",
        skills: "m,n,b",
        projects: "m,n,b",
        experience: "10 year",
      });
    });
    const response = await mockUpdate.mock.results[0].value;
    expect(response).toEqual({
      message: "Update successful",
      ok: true,
    });

    await waitFor(() => {
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });
  });
});
