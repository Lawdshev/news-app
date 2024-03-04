import { render, screen } from "@testing-library/react";
import Article from "@/app/fragments/article";
import { mockArticle } from "../mockData";

jest.mock("../../src/components/read-more-button", () => ({
    __esModule: true,
    default: () => <div data-testid="read-more-button"> read more </div>,
}));


describe("Article", () => {
  it("renders article details correctly", () => {
    render(<Article article={mockArticle} />);

    const titleElement = screen.getByText("Example Article Title");
    const descriptionElement = screen.getByText(
      "This is an example article description."
    );
    const sourceElement = screen.getByText("Example News -");
    const publishedAtElement = screen.getByText("2022-03-01T12:00:00Z");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(sourceElement).toBeInTheDocument();
    expect(publishedAtElement).toBeInTheDocument();
  });

  it("renders ReadMoreButton component", () => {
    render(<Article article={mockArticle} />);

    const readMoreButtonElement = screen.getByText(/read more/i);
    expect(readMoreButtonElement).toBeInTheDocument();
  });

  it("does not render image when urlToImage is not provided", () => {
    const articleWithoutImage = { ...mockArticle, urlToImage: "" };
    render(<Article article={articleWithoutImage} />);

    const imageElement = screen.queryByAltText("Example Article Title");
    expect(imageElement).not.toBeInTheDocument();
  });
});
