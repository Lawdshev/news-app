"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Article } from "@/helpers/types";

interface FavouriteContextProps {
  favourite: Article[];
  addToFavourite: (article: Article) => void;
  removeFromFavourite: (article: Article) => void;
}

const defaultFavouriteContext: FavouriteContextProps = {
  favourite: [],
  addToFavourite: () => {},
  removeFromFavourite: () => {},
};

const FavouriteContext = createContext<FavouriteContextProps>(
  defaultFavouriteContext
);

export const FavouriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [favourite, setFavourite] = useState<Article[]>([]);
    const initialRender = useRef(true);

   useEffect(() => {
       const storedFavourite = localStorage.getItem("favourites");
       if (storedFavourite) {
           const parsedFavourite = JSON.parse(storedFavourite);
           const uniqueSet = new Set([...favourite, ...parsedFavourite]);
           setFavourite(Array.from(uniqueSet));
     }
   }, []);


    useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
        return;
      }
      window.localStorage.setItem("favourites", JSON.stringify(favourite));
    }, [favourite]);

  const addToFavourite = (article: Article) => {
    setFavourite((prevFavourite) => [...prevFavourite, article]);
  };

  const removeFromFavourite = (article: Article) => {
    setFavourite((prevFavourite) =>
      prevFavourite.filter((a) => a.url !== article.url)
    );
  };

  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favourite));
  }, [favourite]);

  return (
    <FavouriteContext.Provider
      value={{ favourite, addToFavourite, removeFromFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => {
  const context = useContext(FavouriteContext);
  return context;
};
