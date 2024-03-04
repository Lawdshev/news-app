import React from "react";
import NewsArticle from "./article";
import InfiniteScroll from "react-infinite-scroll-component";
import { Article } from "@/helpers/types";
import { useTriggerScrollFix } from "../hooks/scroll";

type Props = {
  news: Article[];
  dataLength: number;
  next: () => void;
  hasMore: boolean;
};

function NewsList({ news=[], dataLength, hasMore = true, next }: Props) {
  useTriggerScrollFix([news.length]);
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={next}
      hasMore={hasMore}
      loader={<h4 className="text-center">Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          {<b>Yay! You have seen it all</b>}
        </p>
      }
    >
      <main
        className="grid 
    grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    p-10 gap-10 w-full"
      >
        {news.map((article: Article, index: number) => (
          <NewsArticle key={article.url + index} article={article} />
        ))}
      </main>
    </InfiniteScroll>
  );
}

export default NewsList;
