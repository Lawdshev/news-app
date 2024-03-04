import * as constants from "@/constants/constants";
import { Article } from "@/helpers/types";
interface fetchDataParams {
  category?: string;
  searchTerm?: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setTotalResults: React.Dispatch<React.SetStateAction<number>>;
}

interface fetchMoreDataParams {
  category?: string;
  searchTerm?: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  articles: Article[];
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}

export const fetchData = async ({
  category,
  searchTerm,
  page = 1,
  setPage,
  setArticles,
  setTotalResults,
}: fetchDataParams) => {
  let url = "";
  if (searchTerm) {
    url = `https://newsapi.org/v2/everything?q=${searchTerm}&page=${page}&apiKey=${constants.constants.API_KEY}`;
  } else if (category) {
    url = `https://newsapi.org/v2/top-headlines?country=ng&category=${category}&page=${page}&apiKey=${constants.constants.API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=ng&page=${page}&apiKey=${constants.constants.API_KEY}`;
  }
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setPage(page + 1);
};

export const fetchMoreData = async ({
  category,
  searchTerm,
  page,
  setPage,
  setArticles,
  articles,
  setHasMore,
}: fetchMoreDataParams) => {
  let url = "";
  if (searchTerm) {
    url = `https://newsapi.org/v2/everything?q=${searchTerm}&page=${page}&apiKey=${constants.constants.API_KEY}`;
  } else if (category) {
    url = `https://newsapi.org/v2/top-headlines?country=ng&category=${category}&page=${page}&apiKey=${constants.constants.API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=ng&page=${page}&apiKey=${constants.constants.API_KEY}`;
  }
  let data = await fetch(url);
  let parsedData = await data.json();
  if (parsedData && parsedData?.articles?.length > 0) {
    setArticles([...articles, ...parsedData?.articles]);
  }
  if (
    parsedData &&
    articles.length + parsedData?.articles?.length < parsedData?.totalResults
  ) {
    setPage(page + 1);
    setHasMore(true);
  } else {
    setHasMore(false);
  }
};
