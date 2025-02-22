import { TanstackProvider } from "./TanstackProvider";
import { ThemeProvider } from "./ThemeProvider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackProvider>{children}</TanstackProvider>
    </ThemeProvider>
  );
};
