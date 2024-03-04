import "../../matchMedia.mock";
import { render, screen } from "@testing-library/react";
import ArticlePage from "@/app/article/[article]/page";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

describe("ArticlePage", () => {
  beforeEach(() => {
    const notFound = jest.spyOn(require("next/navigation"), "notFound");
    notFound.mockImplementation(() => null);
  })

  it("renders the article details when searchParams is provided", () => {
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

    render(<ArticlePage searchParams={article} />);

    // Adjust these queries based on your actual rendering logic
    const titleElement = screen.getByText("Example Article Title");
    const authorElement = screen.getByText("By: John Doe");
    const sourceElement = screen.getByText("Source: Example News");
    const publishedAtElement = screen.getByText("2022-03-01T12:00:00Z");
    const contentElement = screen.getByText(
      "This is the content of the example article."
    );

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(sourceElement).toBeInTheDocument();
    expect(publishedAtElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
  });
});
