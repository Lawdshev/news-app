import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsList from "@/app/fragments/news-list";
import * as InfiniteScrollModule from "react-infinite-scroll-component";
import * as NewsArticleModule from "@/app/fragments/article";

// Mock the modules
jest.mock("react-infinite-scroll-component", () => ({
    __esModule: true,
    default: jest
        .fn()
        .mockImplementation(({ children }) => <div>{children}</div>),
}));

jest.mock("../../src/app/fragments/article", () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValue(
      <div data-testid="mocked-news-article"> News Article </div>
    ),
}));


describe("NewsList", () => {
  const mockNews = [
    {
      source: { id: "1", name: "News Source" },
      author: "John Doe",
      title: "Test Article",
      description: "This is a test article",
      url: "https://example.com/article",
      urlToImage: "https://example.com/image.jpg",
      publishedAt: "2022-03-01T12:00:00Z",
      content: "This is the content of the test article.",
    },
    // Add more articles as needed
  ];

  const mockProps = {
    news: mockNews,
    dataLength: mockNews.length,
    hasMore: true,
    next: jest.fn(),
  };

  it("renders NewsList component correctly", () => {
    render(<NewsList {...mockProps} />);

    const newsArticleElements = screen.getAllByTestId("mocked-news-article");
    expect(newsArticleElements.length).toBe(mockNews.length);
  });

});
