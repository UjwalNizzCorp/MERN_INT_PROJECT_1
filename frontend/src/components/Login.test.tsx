import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { describe, it, expect, vi } from "vitest";
import Login from "./Login";
import { MemoryRouter, Route, Routes } from "react-router";
import userService from "../services/userService";
import Profile from "./Profile";

describe("Login Component", async () => {
  it("renders the login form with labels", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls login and redirects to profile on successful login", async () => {
    // ✅ Mock the login method
    const mockLogin = vi.spyOn(userService, "login").mockResolvedValue({
      message: "Login successful",
      ok: true,
      token: "mock-token-123",
    });
  
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MemoryRouter>
    );
  
    // ✅ Fill form inputs
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "gello@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "128" },
    });
  
    // ✅ Click login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  
    // ✅ Expect login API to be called with correct data
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "gello@example.com",
        password: "128",
      });
    });
    const response = await mockLogin.mock.results[0].value;
    expect(response).toEqual({
      message: "Login successful",
      ok: true,
      token: "mock-token-123"
    });
  
    // ✅ Check that user was redirected to profile
    await waitFor(() => {
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });
  });
  
});