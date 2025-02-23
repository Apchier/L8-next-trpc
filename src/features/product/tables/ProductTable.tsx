'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils/render-elements";
import { CategoryTableBodySkeleton } from "../components/skeleton/CategoryTableBodySkeleton";
import {  ProductTableItem, ProductTableNotFoundItem } from "./ProductTableItem";
import type { ProductWithCategory } from "../types";
import { ProductPagination } from "../components/CategoryPagination";

type ProductTableProps = {
  products?: ProductWithCategory[];
  isLoading: boolean;
  refetch: () => void;
} 

export const ProductTable = ({ products, isLoading: isProductLoading, refetch: refetchProduct }: ProductTableProps) => {
  return (
    <Table className="border border-border bg-background">
      <TableCaption className="border border-border">
        <ProductPagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center w-[120px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isProductLoading && <CategoryTableBodySkeleton />}
      {
        <TableBody>
          {renderElements({
            of: products,
            keyExtractor: (product) => product.id,
            fallback: <ProductTableNotFoundItem />,
            render: (product, index) => <ProductTableItem index={index} product={product} refetch={refetchProduct}/>
          })}
        </TableBody>
      }
    </Table>
  );
};
