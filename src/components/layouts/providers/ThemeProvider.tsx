"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeProvider: React.FC<
  React.ComponentProps<typeof NextThemesProvider>
> = ({ children, ...props }) => {
  const [mount, setMount] = useState<boolean>(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) {
    return <>{children}</>;
  }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
