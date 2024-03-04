import { fetchData, fetchMoreData } from "../../src/app/services/fetchData";
import * as constants from "@/constants/constants";
import { mockArticle } from "../mockData";
import { Article } from "@/helpers/types";

const mockData = {
  articles: [mockArticle],
  totalResults: 10,
};

// Mock the fetch function
const mockResponse = {
  json: jest.fn().mockResolvedValue(mockData),
  headers: new Headers({
    "Content-Type": "application/json",
  }),
  ok: true,
  redirected: false,
  status: 200,
  statusText: "OK",
  type: "basic",
  url: "https://example.com",
  clone: jest.fn(),
  body: null,
  bodyUsed: false,
  arrayBuffer: jest.fn(),
  blob: jest.fn(),
  formData: jest.fn(),
  text: jest.fn(),
};

global.fetch = jest.fn(() => Promise.resolve(mockResponse as any));

describe("Data fetching functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchData function fetches data and updates state", async () => {
    const setPageMock = jest.fn();
    const setArticlesMock = jest.fn();
    const setTotalResultsMock = jest.fn();

    await fetchData({
      category: "technology",
      page: 1,
      setPage: setPageMock,
      setArticles: setArticlesMock,
      setTotalResults: setTotalResultsMock,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://newsapi.org/v2/top-headlines?country=ng&category=technology&page=1&apiKey=${constants.constants.API_KEY}`
    );

    expect(setArticlesMock).toHaveBeenCalledWith(mockData.articles);
    expect(setTotalResultsMock).toHaveBeenCalledWith(mockData.totalResults);
    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it("fetchData fetches data for search term and updates state", async () => {
    const setPageMock = jest.fn();
    const setArticlesMock = jest.fn();
    const setTotalResultsMock = jest.fn();

    await fetchData({
      searchTerm: "apple",
      page: 1,
      setPage: setPageMock,
      setArticles: setArticlesMock,
      setTotalResults: setTotalResultsMock,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://newsapi.org/v2/everything?q=apple&page=1&apiKey=${constants.constants.API_KEY}`
    );
    expect(setArticlesMock).toHaveBeenCalledWith(mockData.articles);
    expect(setTotalResultsMock).toHaveBeenCalledWith(mockData.totalResults);
    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it("fetchData fetches without category and search term and updates state", async () => { 
    const setPageMock = jest.fn();
    const setArticlesMock = jest.fn();
    const setTotalResultsMock = jest.fn();

    await fetchData({
      page: 1,
      setPage: setPageMock,
      setArticles: setArticlesMock,
      setTotalResults: setTotalResultsMock,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://newsapi.org/v2/top-headlines?country=ng&page=1&apiKey=${constants.constants.API_KEY}`
    );
    expect(setArticlesMock).toHaveBeenCalledWith(mockData.articles);
    expect(setTotalResultsMock).toHaveBeenCalledWith(mockData.totalResults);
    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  it("fetchMoreData function fetches more data and updates state", async () => {
    const initialArticles: Article[] = [];

    const setHasMoreMock = jest.fn();
    const setPageMock = jest.fn();
    const setArticlesMock = jest.fn();

    await fetchMoreData({
      category: "technology",
      page: 2,
      setPage: setPageMock,
      setArticles: setArticlesMock,
      articles: initialArticles,
      setHasMore: setHasMoreMock,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://newsapi.org/v2/top-headlines?country=ng&category=technology&page=2&apiKey=${constants.constants.API_KEY}`
    );

    expect(setArticlesMock).toHaveBeenCalledWith([
      ...initialArticles,
      ...mockData.articles,
    ]);
    expect(setPageMock).toHaveBeenCalledWith(3);
    expect(setHasMoreMock).toHaveBeenCalledWith(true);
  });

  it("fetchMoreData fetches more data for search term and updates state", async () => {
    const initialArticles: Article[] = [];
    const setHasMoreMock = jest.fn();
    const setPageMock = jest.fn();
    const setArticlesMock = jest.fn();

    await fetchMoreData({
      searchTerm: "apple",
      page: 2,
      setPage: setPageMock,
      setArticles: setArticlesMock,
      articles: initialArticles,
      setHasMore: setHasMoreMock,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://newsapi.org/v2/everything?q=apple&page=2&apiKey=${constants.constants.API_KEY}`
    );
    expect(setArticlesMock).toHaveBeenCalledWith([
      ...initialArticles,
      ...mockData.articles,
    ]);
    expect(setPageMock).toHaveBeenCalledWith(3);
    expect(setHasMoreMock).toHaveBeenCalledWith(true);
  });

  it("fetchMoreData fetches more data without category and search term and updates state", async () => {
    const initialArticles: Article[] = [];
    const setHasMoreMock = jest.fn();
    const setPageMock = jest.fn();
    const setArticlesMock = jest.fn();

    await fetchMoreData({
      page: 2,
      setPage: setPageMock,
      setArticles: setArticlesMock,
      articles: initialArticles,
      setHasMore: setHasMoreMock,
    });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://newsapi.org/v2/top-headlines?country=ng&page=2&apiKey=${constants.constants.API_KEY}`
    );

    expect(setArticlesMock).toHaveBeenCalledWith([
      ...initialArticles,
      ...mockData.articles,
    ]);
    expect(setPageMock).toHaveBeenCalledWith(3);
    expect(setHasMoreMock).toHaveBeenCalledWith(true);
  });

    it("fetchMoreData fetches more data and updates state when there are no more articles", async () => {
      // Mock state variables and functions
      const setArticlesMock = jest.fn();
      const setPageMock = jest.fn();
      const setHasMoreMock = jest.fn();

      // Set up articles and parsedData to simulate no more articles available
      const articles = [mockArticle,mockArticle];
      const parsedData = { articles: [], totalResults: 2 };

      // Mock fetch
      jest
        .spyOn(global, "fetch")
        .mockImplementation(() =>
          Promise.resolve({ json: () => Promise.resolve(parsedData) } as any)
        );

      // Call the fetchMoreData function
      await fetchMoreData({
        category: "business",
        page: 1,
        setPage: setPageMock,
        setArticles: setArticlesMock,
        articles,
        setHasMore: setHasMoreMock,
      });

      // Assertions
      expect(setHasMoreMock).toHaveBeenCalledWith(false);
    });
});
