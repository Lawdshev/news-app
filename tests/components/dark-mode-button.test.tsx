import "../matchMedia.mock";
import DarkModeButton from "@/components/dark-mode-button";
import { render, fireEvent } from "../test-utils";
import { useTheme } from "next-themes";

const ThemeSpy: React.FC = () => {
  const { theme } = useTheme();
  return <span data-testid="theme-spy">{theme}</span>;
};

describe("DarkModeButton", () => {
 
  it("should render correct theme", () => {
     const { getByTestId } = render(
       <>
         <DarkModeButton />
         <ThemeSpy />
       </>,
       { theme: "dark" } 
     );
     expect(getByTestId("theme-spy")).toHaveTextContent("dark");
  });

    it("should change theme", () => {
      const { getByTestId } = render(
        <>
          <DarkModeButton />
          <ThemeSpy />
        </>,
        { theme: "light" } 
      );
      expect(getByTestId("theme-spy")).toHaveTextContent("light");
      fireEvent.click(getByTestId("theme-select2"));
      expect(getByTestId("theme-spy")).toHaveTextContent("dark");
    });

});
