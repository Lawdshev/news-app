import { render, screen, waitFor } from "@testing-library/react";
import Favourites from "@/app/favourites/page"; 
import { useFavourite } from "@/app/hooks/favourite";

// Mock useFavourite hook
jest.mock("../../src/app/hooks/favourite", () => ({
  useFavourite: jest.fn(),
}));

// Mock NewsList component
jest.mock("../../src/app/fragments/news-list", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-news-list" />,
}));

describe("Favourites", () => {
  const mockUseFavourite = useFavourite as jest.Mock;

  it("renders Favourites component correctly with empty favourites", () => {
    // Mock an empty list of favourites
    mockUseFavourite.mockReturnValue({
      favourite: [],
    });
    render(<Favourites />);

    // Check if the title is rendered
    expect(screen.getByText(/Favourite News/i)).toBeInTheDocument();

    // Check if NewsList component is rendered
    const newsListElement = screen.getByTestId("mocked-news-list"); 
    expect(newsListElement).toBeInTheDocument();
  });

  it("renders Favourites component correctly with non-empty favourites", () => {
    // Mock a list of favourites
    mockUseFavourite.mockReturnValue({
      favourite: [
        {
          // Mock a favourite news item
          source: { id: "1", name: "News Source" },
          author: "John Doe",
          title: "Favourite Article",
          description: "This is a favourite article",
          url: "https://example.com/favourite-article",
          urlToImage: "https://example.com/favourite-image.jpg",
          publishedAt: "2022-03-01T12:00:00Z",
          content: "This is the content of the favourite article.",
        },
      ],
    });

    render(<Favourites />);

    // Check if the title is rendered
    expect(screen.getByText(/Favourite News/i)).toBeInTheDocument();

    // Check if NewsList component is rendered
    const newsListElement = screen.getByTestId("mocked-news-list"); // Make sure to set a data-testid in your NewsList component
      expect(newsListElement).toBeInTheDocument();
      
      waitFor(() => {
        // Check if the article details are rendered
        expect(screen.getByText("Favourite Article")).toBeInTheDocument();
        expect(screen.getByText("By: John Doe")).toBeInTheDocument();
        expect(screen.getByText("Source: News Source")).toBeInTheDocument();
        expect(screen.getByText("2022-03-01T12:00:00Z")).toBeInTheDocument();
        expect(screen.getByText("This is the content of the favourite article.")).toBeInTheDocument();
      });

  });
});
