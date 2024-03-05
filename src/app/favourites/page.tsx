"use client";
import React from "react";
import NewsList from "../fragments/news-list";
import { useFavourite } from "../hooks/favourite";

export default function Favourites() {
    const { favourite } = useFavourite();

  return (
    <div className="page">
      <h1 className="headerTitle">Favourite News</h1>
      <NewsList
        news={favourite}
        dataLength={favourite.length}
        hasMore={false}
        next={() => {}}
      />
    </div>
  );
}
