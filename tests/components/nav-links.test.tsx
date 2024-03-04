import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { categories } from "@/helpers/categories";
import NavLinks,{ NavLink } from "@/components/nav-links";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));
describe("NavLink and NavLinks", () => {
  beforeEach(() => {
      const usePathname = jest.spyOn(require("next/navigation"), "usePathname");
      usePathname.mockImplementation(() => "/");
  });
    
  it("renders NavLink component with active class when isActive is true", () => {
    render(<NavLink category="SomeCategory" isActive={true} />);

    const linkElement = screen.getByText("SomeCategory");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveClass("underline");
    expect(linkElement).toHaveClass("decoration-orange-400");
    expect(linkElement).toHaveClass("underline-offset-4");
    expect(linkElement).toHaveClass("font-bold");
    expect(linkElement).toHaveClass("text-lg");
  });

  it("renders NavLink component without active class when isActive is false", () => {

    render(<NavLink category="SomeOtherCategory" isActive={false} />);

    const linkElement = screen.getByText("SomeOtherCategory");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).not.toHaveClass("underline");
    expect(linkElement).not.toHaveClass("decoration-orange-400");
    expect(linkElement).not.toHaveClass("underline-offset-4");
    expect(linkElement).not.toHaveClass("font-bold");
    expect(linkElement).not.toHaveClass("text-lg");
  });

  it("renders NavLinks component with correct categories and active state", () => {
    render(<NavLinks />);

    // Assert that each category is rendered
    categories.forEach((category) => {
      const linkElement = screen.getByText(category);
      expect(linkElement).toBeInTheDocument();

      // Assert that active category has the correct class
      if (category === "SomeCategory") {
        expect(linkElement).toHaveClass("underline");
        expect(linkElement).toHaveClass("decoration-orange-400");
        expect(linkElement).toHaveClass("underline-offset-4");
        expect(linkElement).toHaveClass("font-bold");
        expect(linkElement).toHaveClass("text-lg");
      } else {
        expect(linkElement).not.toHaveClass("underline");
        expect(linkElement).not.toHaveClass("decoration-orange-400");
        expect(linkElement).not.toHaveClass("underline-offset-4");
        expect(linkElement).not.toHaveClass("font-bold");
        expect(linkElement).not.toHaveClass("text-lg");
      }
    });
  });
});
