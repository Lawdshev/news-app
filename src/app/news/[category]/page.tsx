"use client";
import React from "react";
import NewsList from "../../fragments/news-list";
import { fetchData,fetchMoreData } from "@/app/services/fetchData";
import { Article } from "@/helpers/types";

type Props = {
  params: { category: string };
};

function NewsCategory({ params: { category } }: Props) {
  const [news, setNews] = React.useState<Article[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalResults, setTotalResults] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
   fetchData({ category, setArticles:setNews,page,setTotalResults,setPage });
  }, [category]);
  
  return (
    <div className="w-full">
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} dataLength={totalResults} hasMore={hasMore} next={() => {
        fetchMoreData({ category, setArticles:setNews,page,setPage,articles:news,setHasMore });
      }}/>
    </div>
  );
}

export default NewsCategory;
