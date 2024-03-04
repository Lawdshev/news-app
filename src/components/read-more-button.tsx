"use client";
import { Article } from "@/helpers/types";
import { useRouter } from "next/navigation";

type Props = {
  article: Article;
};

function ReadMoreButton({ article }: Props) {
  const router = useRouter();

  const handleClick = () => {
    const queryString = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const url = `/article/article?${queryString}`;
    router.push(url);
  };

  return (
    <a
      target="_blank"
      className="bg-orange-400 h-10
    rounded-b-lg dark:text-gray-900
     hover:bg-orange-500 flex items-center justify-center"
      onClick={handleClick}
    >
      <button>Read More</button>
    </a>
  );
}

export default ReadMoreButton;
