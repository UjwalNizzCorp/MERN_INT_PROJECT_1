import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ErrorFile from "./ErrorFile";
import { describe, expect, it } from "vitest";
import Welcome from "./Welcome";

describe("ErrorFile Component", () => {
  it("renders 404 message and button", () => {
    render(
      <MemoryRouter>
        <ErrorFile />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /404 - Page Not Found/i })).toBeInTheDocument();

 
  });

  it("navigates to home page on button click", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Routes>
          <Route path="*" element={<ErrorFile />} />
          <Route path="/" element={<Welcome/>}/>
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /go to home/i }));

    expect(screen.getByText(/Click here to login/i)).toBeInTheDocument();
  });
});
