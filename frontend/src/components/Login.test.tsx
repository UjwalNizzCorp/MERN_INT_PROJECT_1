import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { describe, it, expect, vi } from "vitest";
import Login from "./Login";
import { MemoryRouter } from "react-router";
import userService from "../services/userService";

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

  it("calls login and receives response on form submit", async () => {
    // 👇 Mock the login method
    const mockLogin = vi.spyOn(userService, "login").mockResolvedValue({
      message: "Login successful",
      ok: true,
      token: "mock-token-123",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // 👇 Fill in the form fields
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "gello@example.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "128" },
    });

    // 👇 Click the login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // 👇 Wait for the login method to be called
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "gello@example.com",
        password: "128",
      });
    });
  });
});