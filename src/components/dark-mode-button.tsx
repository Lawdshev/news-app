"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import SunIcon from "@heroicons/react/24/solid/SunIcon";
import MoonIcon from "@heroicons/react/24/solid/MoonIcon";

function DarkModeButton() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div>
      {currentTheme === "dark" ? (
        <button data-testid="theme-select1" onClick={() => setTheme("light")}>
          <SunIcon className="h-8 w-8 cursor-pointer text-yellow-500" />
        </button>
      ) : (
        <button data-testid="theme-select2" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-8 w-8 cursor-pointer text-gray-900" />
        </button>
      )}
    </div>
  );
}

export default DarkModeButton;
