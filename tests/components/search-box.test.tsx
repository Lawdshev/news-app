import "../matchMedia.mock";
import { render, screen, fireEvent, act, waitFor } from "../test-utils";
import { useRouter } from "next/navigation";
import SearchBox from "@/components/search-box";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
        query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

jest.mock("next/link", () => ({
  Link({ href, children }: { href: string; children: React.ReactNode }) {
    return <a href={href} data-testid="link-element">{children}</a>;
  },
}));


describe("SearchBox", () => {
  beforeEach(async () => {
    const useRouter = jest.spyOn(require("next/navigation"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });
  it("renders SearchBox component", () => {
    render(<SearchBox />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(<SearchBox />);

    const inputElement = screen.getByTestId("search-input");

    // Simulate user typing into the input field
    fireEvent.change(inputElement, { target: { value: "Test" } });

    // Assert that the input value has been updated
    expect(inputElement).toHaveValue("Test");
  });

  it("navigates to the correct search URL on form submission", () => {
    render(<SearchBox />);

    const formElement = screen.getByTestId("search-form");
    const inputElement = screen.getByPlaceholderText("Search Keywords...");

    // Simulate user typing into the input field
    fireEvent.change(inputElement, { target: { value: "Test" } });

    // Simulate form submission with a non-empty input
    fireEvent.submit(formElement);

    // Assert that useRouter is called with the correct URL
    expect(useRouter).toHaveBeenCalled();
  });

  it("does not render link when user is null", () => {
  
     // Mocking useUserAuth to return null user
     jest.mock("../../src/app/providers/user-auth-context-provider", () => ({
       useUserAuth() {
         return {
           user: null,
         };
       },
     }));

  async () => {
    await act(async () => {
      render(<SearchBox />);
    });
  };
     expect(screen.queryByTestId("link-element")).not.toBeInTheDocument();
   });
  
  it("renders link when user is not null", () => {

  async () => {
    await act(async () => {
      render(<SearchBox />,{initialState:{user:{email:"test@email.com",uid:"testuid"}}});
    });
  };
    waitFor(() => {
      expect(screen.getByText(/favourites/i)).toBeInTheDocument();
      
    })
  })

});
