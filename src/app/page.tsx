"use client";
import React from "react";
import { Article } from "@/helpers/types";
import NewsList from "./fragments/news-list";
import { fetchData,fetchMoreData } from "@/app/services/fetchData";

export default function Home() {
 const [news, setNews] = React.useState<Article[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalResults, setTotalResults] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
   fetchData({ setArticles:setNews,page,setTotalResults,setPage });
  }, []);
  
 return (
   <div className="page">
     <h1 className="headerTitle">All News</h1>
     <NewsList news={news} dataLength={totalResults} hasMore={hasMore} next={() => {
        fetchMoreData({ setArticles:setNews,page,setPage,articles:news,setHasMore });
      }}/>
   </div>
 );
}
