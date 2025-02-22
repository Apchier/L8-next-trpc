import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo List",
};

type TodoPageLayoutProps = {
  children: React.ReactNode;
};

const TodoPageLayout = ({ children }: TodoPageLayoutProps) => {
  return <>{children}</>;
};

export default TodoPageLayout;
