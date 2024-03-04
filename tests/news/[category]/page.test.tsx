import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsCategory from "@/app/news/[category]/page";
import { mockArticle } from "../../mockData";
import { fetchData} from "@/app/services/fetchData";

// Mock fetchData and fetchMoreData
jest.mock("../../../src/app/services/fetchData", () => ({
  fetchData: jest.fn(),
  fetchMoreData: jest.fn(),
}));

jest.mock("../../../src/app/fragments/news-list", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mocked-news-list"> News list </div>
  ),
}));

describe("NewsCategory", () => {
  const mockCategory = "technology";
  const mockNews = [mockArticle];

  beforeEach(() => {
      const fetchData = jest.spyOn(
        require("../../../src/app/services/fetchData"),"fetchData"
      );
      fetchData.mockImplementation(() => ({
          
      }))
  });

  it("renders NewsCategory component correctly", async () => {

    render(<NewsCategory params={{ category: mockCategory }} />);

    // Wait for fetchData to be called
    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith({
        category: mockCategory,
        setArticles: expect.any(Function),
        page: 1,
        setTotalResults: expect.any(Function),
        setPage: expect.any(Function),
      });
    });

    // Check if category title is rendered
    const categoryTitleElement = screen.getByText(mockCategory);
    expect(categoryTitleElement).toBeInTheDocument();

    // Check if NewsList component is rendered
    const newsListElement = screen.getByTestId("mocked-news-list");
    expect(newsListElement).toBeInTheDocument();
  });
});
