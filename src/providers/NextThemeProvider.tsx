"use client";

import Box from "@/components/Box";
import { useTheme, ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

export default function NextThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Box
        as="main"
        alignItems="center"
        justifyContent="center"
        className="relative w-full min-h-screen bg-white dark:bg-black"
      >
        {children}
      </Box>
    </ThemeProvider>
  );
}

export function NextThemeTrigger() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <Box
      as="button"
      type="button"
      onClick={toggleTheme}
      className="absolute bottom-8 right-8 text-black dark:text-white"
    >
      Toggle Theme
    </Box>
  );
}
