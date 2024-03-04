import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Header from "@/app/fragments/header";

jest.mock("../../src/components/nav-links", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-nav-links"> Nav Links </div>,
}));
jest.mock("../../src/components/search-box", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-search-box"> SearchBox </div>,
}));
jest.mock("../../src/components/dark-mode-button", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mocked-dark-mode-button"> DarkModeButton </div>
  ),
}));
jest.mock("@heroicons/react/24/solid", () => ({
  Bars3Icon: () => <div data-testid="mocked-bars-icon">Bars3Icon</div>,
}));

describe("Header", () => {
  it("renders Header component correctly", () => {
    render(<Header />);

    const barsIcon = screen.getByTestId("mocked-bars-icon");
    const darkModeButton = screen.getByTestId("mocked-dark-mode-button");
    const navLinks = screen.getByTestId("mocked-nav-links");
    const searchBox = screen.getByTestId("mocked-search-box");

    waitFor(() => {
      expect(barsIcon).toBeInTheDocument();
      expect(darkModeButton).toBeInTheDocument();
      expect(navLinks).toBeInTheDocument();
      expect(searchBox).toBeInTheDocument();
    })
  });

  it("renders DarkModeButton", () => {
    render(<Header />);
    const darkModeButton = screen.getByTestId("mocked-dark-mode-button");
    expect(darkModeButton).toBeInTheDocument();
  });
});
