import { useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return {
    theme: theme,
    toggleTheme: toggleTheme,
  };
}
