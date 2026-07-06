import { createContext } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
