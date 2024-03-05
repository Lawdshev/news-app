"use client";
import { useUserAuth } from "@/app/providers/user-auth-context-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function SearchBox() {
  const { user } = useUserAuth(); 
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;

    router.push(`/search/${input}`);
  };

  return (
    <div
      className="flex justify-between items-center max-w-6xl 
      mx-auto px-5"
    >
      <form
        data-testid="search-form"
        onSubmit={handleSearch}
        className=" w-2xl flex justify-between items-center "
      >
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search Keywords..."
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-14 
          rounded-sm placeholder-gray-500 
          text-gray-500 outline-none flex-1 bg-transparent
          dark:text-orange-400"
        />
        <button
          type="submit"
          disabled={!input}
          className="text-orange-400 disabled:text-gray-400"
        >
          Search
        </button>
      </form>
      {user && (
        <Link href="/favourites" className="text-orange-400">favourites</Link>
      )}
    </div>
  );
}

export default SearchBox;