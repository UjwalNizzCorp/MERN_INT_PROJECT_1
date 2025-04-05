import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Welcome from "./Welcome";
import { MemoryRouter, Route, Routes } from "react-router";
import Login from "./Login";

describe("Welcome Component", () => {
  it("should render the welcome message and login link", () => {
    render(
    <MemoryRouter initialEntries={["/"]}>
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </MemoryRouter>)
    const welcomeMessage = screen.getByText(/Welcome/i);
    const loginLink = screen.getByText(/Click here to login/i);
    expect(welcomeMessage).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    fireEvent.click(loginLink);
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });
});
