"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
    >
      {isClient && theme == "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
