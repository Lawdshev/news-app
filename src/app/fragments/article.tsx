"use client";
import React from "react";
import ReadMoreButton from "@/components/read-more-button";
import { Article } from "@/helpers/types";
import { useFavourite } from "@/app/hooks/favourite";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useUserAuth } from "../providers/user-auth-context-provider";

type Props = {
  article: Article;
};

function Article({ article }: Props) {
    const { user } = useUserAuth();
  const { favourite, addToFavourite, removeFromFavourite } = useFavourite();
  
  const handleFavourite = () => {
    if (favourite.some((a: Article) => a.url === article.url)) {
      removeFromFavourite(article);
    } else {
      addToFavourite(article);
    }
  }
  return (
    <article
      className="bg-slate-100
     dark:bg-slate-800 flex flex-col 
     rounded-lg shadow-lg hover:scale-105 
     hover:shadow-xl hover:bg-slate-200 
     transition-all duration-200 ease-out relative"
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="h-56 w-full object-cover rounded-t-lg shadow-md"
        />
      )}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold font-serif">{article.title}</h2>
          <section className="mt-2 flex-1">
            <p className="text-xs line-clamp-6">{article.description}</p>
          </section>
          <footer
            className="text-xs text-right 
          ml-auto flex space-x-1 pt-5 italic text-gray-400"
          >
            <p>{article.source.name} -</p>
            <p>{article.publishedAt}</p>
            {
              user && (
                <p data-testid="favourite-button" className="cursor-pointer" onClick={handleFavourite}>
                  {favourite.some((a: Article) => a.url === article.url) ? (
                    <FaHeart className="cursor-pointer" size={20} />
                  ) : (
                    <FaRegHeart className="cursor-pointer" size={20} />
                  )}
                </p>
              )
            }
          </footer>
        </div>
        <ReadMoreButton article={article} />
      </div>
    </article>
  );
}

export default Article;
