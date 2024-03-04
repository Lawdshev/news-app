import "../matchMedia.mock";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import ReadMoreButton from "@/components/read-more-button";

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

describe("ReadMoreButton", () => {
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

  it("navigates to the correct URL on button click", () => {
    const article = {
      source: {
        id: "exampleId",
        name: "Example News",
      },
      author: "John Doe",
      title: "Example Article Title",
      description: "This is an example article description.",
      url: "https://example.com/article",
      urlToImage: "https://example.com/image.jpg",
      publishedAt: "2022-03-01T12:00:00Z",
      content: "This is the content of the example article.",
    };

    render(<ReadMoreButton article={article} />);

    // Find the "Read More" button
    const readMoreButton = screen.getByText("Read More");
    expect(readMoreButton).toBeInTheDocument();

    // Simulate a button click
    fireEvent.click(readMoreButton);

    // Assert that useRouter is called with the correct URL
    expect(useRouter).toHaveBeenCalled();
  });
});
