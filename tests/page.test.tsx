import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { mockArticle } from "./mockData";
import { fetchData, fetchMoreData } from "@/app/services/fetchData";
import { Article } from "@/helpers/types";

// Mock fetchData and fetchMoreData
jest.mock("../src/app/services/fetchData", () => ({
  fetchData: jest.fn(),
  fetchMoreData: jest.fn(),
}));

jest.mock("../src/app/fragments/news-list", () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-news-list"> News list </div>,
}));

describe("Home", () => {
  beforeEach(() => {
    const fetchData = jest.spyOn(
      require("../src/app/services/fetchData"),
      "fetchData"
    );
      fetchData.mockImplementation(() => ({}));
      
    const fetchMoreData = jest.spyOn(
      require("../src/app/services/fetchData"),
      "fetchMoreData"
    );
      fetchMoreData.mockImplementation(() => ({}));
  });

  it("renders NewsCategory component correctly", async () => {
    render(<Home/>);

    // Wait for fetchData to be called
    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith({
        setArticles: expect.any(Function),
        page: 1,
        setTotalResults: expect.any(Function),
        setPage: expect.any(Function),
      });
    });

    // Check if title is rendered
    const titleElement = screen.getByText(/All News/i);
    expect(titleElement).toBeInTheDocument();

    // Check if NewsList component is rendered
    const newsListElement = screen.getByTestId("mocked-news-list");
    expect(newsListElement).toBeInTheDocument();
  });
});
