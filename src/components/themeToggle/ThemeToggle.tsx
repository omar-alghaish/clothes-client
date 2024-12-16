"use client";

import { useEffect, useState } from "react";
import { Button } from "../common";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.theme
      ? localStorage.theme
      : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <Button
      variant="outlined"
      label={theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  );
}
