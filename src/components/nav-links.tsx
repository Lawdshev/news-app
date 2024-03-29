"use client";
import { categories } from "@/helpers/categories";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  category: string;
  isActive: boolean;
};

export function NavLink({ category, isActive }: Props) {
  return (
    <Link
      href={`/news/${category}`}
      className={`navlink ${
        isActive &&
        "underline decoration-orange-400 underline-offset-4 font-bold text-lg"
      } `}
    >
      {category}
    </Link>
  );
}

function NavLinks() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.split("/").pop() === path;
  };

  return (
    <nav
      className="grid grid-cols-4 md:grid-cols-7 
    text-cs md:text-sm gap-4 pb-10 max-w-6xl mx-auto border-b"
    >
      {categories.map((category) => (
        <NavLink
          key={category}
          category={category}
          isActive={isActive(category)}
        />
      ))}
    </nav>
  );
}

export default NavLinks;
