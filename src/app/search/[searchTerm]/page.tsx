"use client";
import React from "react";
import NewsList from "../../fragments/news-list";
import Article from "../../fragments/article";
import { fetchData, fetchMoreData } from "../../services/fetchData";

type Props = {
  params: { searchTerm: string };
};

function SearchPage({ params: { searchTerm } }: Props) {
  //   const news: NewsResponse = await fetchNews(category);
  const [news, setNews] = React.useState<Article[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalResults, setTotalResults] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    console.log(searchTerm);
    if (!searchTerm || searchTerm === "") return;
    fetchData({
      searchTerm,
      setArticles: setNews,
      page,
      setTotalResults,
      setPage,
    });
  }, [searchTerm]);

  return (
    <div className="w-full">
      <h1 className="headerTitle">Search results for {searchTerm}</h1>
      <NewsList
        news={news}
        dataLength={totalResults}
        hasMore={hasMore}
        next={() => {
          fetchMoreData({
            searchTerm,
            setArticles: setNews,
            page,
            setPage,
            articles: news,
            setHasMore,
          });
        }}
      />
    </div>
  );
}

export default SearchPage;
