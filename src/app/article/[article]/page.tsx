import { Article } from "@/helpers/types";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  searchParams?: Article;
};

function ArticlePage({ searchParams }: Props) {
  if (
    (searchParams && Object.entries(searchParams).length === 0) ||
    !searchParams
  ) {
    return notFound();
  }

  const article: Article = searchParams;

  return (
    <article>
      <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
        {article.urlToImage && (
          <img
            className="h-50 max-w-md 
          mx-auto md:max-w-lg lg:max-w-xl 
          object-cover rounded-lg shadow-md"
            src={article.urlToImage}
            alt={article.title}
          />
        )}
        <div className="px-10">
          <h1 className="headerTitle px-0 no-underline pb-2">
            {article.title}
          </h1>
          <div className="flex divide-x-2 space-x-4">
            <h2 className="font-bold">By: {article.author || "unknown"}</h2>
            <h2 className="font-bold pl-2">Source: {article.source.name}</h2>
            <p className="pl-4">{article.publishedAt}</p>
          </div>
          {article.content ? (
            <p className="pt-4">{article.content}</p>
          ) : (
            <p className="pt-4">
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur at distinctio amet, quidem molestias ex alias. Illo
              voluptate quisquam est sint a eius id explicabo, excepturi officia
              aperiam modi dolor ea repellat similique distinctio corrupti optio
              vero iste natus autem velit placeat ipsa tempem50ore rerum? Quod
              quasi cum vel sed.
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                ducimus maxime cumque exercitationem id eveniet eius odio! In
                hic quasi saepe dolor, dolores suscipit magnam a excepturi
                consequuntur eveniet consequatur ipsam labore, velit dolorem
                sapiente ducimus. Facilis vitae fuga veniam explicabo magni cum
                architecto commodi voluptatum eaque dolorem, tenetur dicta.
              </span>
            </p>
          )}
        </div>
      </section>
    </article>
  );
}

export default ArticlePage;
