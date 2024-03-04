import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SearchPage from "@/app/search/[searchTerm]/page";
import { mockArticle } from "../../mockData";
import { fetchData } from "@/app/services/fetchData";

// Mock fetchData and fetchMoreData
jest.mock("../../../src/app/services/fetchData", () => ({
  fetchData: jest.fn(),
  fetchMoreData: jest.fn(),
}));

jest.mock("../../../src/app/fragments/news-list", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-news-list"> News list </div>,
}));

describe("Search page", () => {
  const mockSearchTerm = "technology";
  const mockNews = [mockArticle];

  beforeEach(() => {
    const fetchData = jest.spyOn(
      require("../../../src/app/services/fetchData"),
      "fetchData"
    );
    fetchData.mockImplementation(() => ({}));
  });

  it("renders SearchPage component correctly", async () => {
    render(<SearchPage params={{ searchTerm: mockSearchTerm }} />);

    // Wait for fetchData to be called
    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith({
        searchTerm: mockSearchTerm,
        setArticles: expect.any(Function),
        page: 1,
        setTotalResults: expect.any(Function),
        setPage: expect.any(Function),
      });
    });

    waitFor(() => {
        const searchTitleElement = screen.getByText(mockSearchTerm);
        expect(searchTitleElement).toBeInTheDocument();        
    })

    // Check if NewsList component is rendered
    const newsListElement = screen.getByTestId("mocked-news-list");
    expect(newsListElement).toBeInTheDocument();
  });
});
