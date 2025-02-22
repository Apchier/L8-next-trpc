import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center gap-x-10">
      <Link href={"/todo"}>Todo</Link>
      <Link href={"/product"}>Product</Link>
      <Link href={"/category"}>Category</Link>
    </nav>
  );
};
