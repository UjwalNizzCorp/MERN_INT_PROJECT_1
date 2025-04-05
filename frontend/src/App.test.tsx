import { screen, render } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("App tests", () => {
  it("should render the title", () => {
    render(<App />);
  });

  it("should render the Outlet component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const outletElement = screen.getByRole("main");
    expect(outletElement).toBeInTheDocument();
  });
});
