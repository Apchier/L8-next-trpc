import { Toaster as Sooner } from "sonner";
import { Providers } from "./providers/Providers";
import { Toaster } from "../ui/toaster";

export const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Providers>
      {children}
      <Sooner position="top-center" />
      <Toaster />
    </Providers>
  );
};
