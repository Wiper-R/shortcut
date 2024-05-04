"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Suspense fallback={null}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {/* prettier-ignore-start */}
        {isMounted ? theme === "dark" ? <SunIcon /> : <MoonIcon /> : null}
        {/* prettier-ignore-end */}
      </Button>
    </Suspense>
  );
}
