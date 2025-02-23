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
import { CategoryPagination } from "../components/CategoryPagination";
import { CategoryTableBodySkeleton } from "../components/skeleton/CategoryTableBodySkeleton";
import { CategoryTableItem, CategoryTableNotFoundItem } from "./CategoryTableItem";
import type { CategoryWithValidation } from "../types";

type CategoryTableProps = {
  categories?: CategoryWithValidation[];
  isLoading: boolean;
  refetch: () => void;
} 

export const CategoryTable = ({ categories, isLoading: isCategoryLoading, refetch: refetchCategory }: CategoryTableProps) => {
  return (
    <Table className="border border-border bg-background">
      <TableCaption className="border border-border">
        <CategoryPagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isCategoryLoading && <CategoryTableBodySkeleton />}
      {
        <TableBody>
          {renderElements({
            of: categories,
            keyExtractor: (category) => category.id,
            fallback: <CategoryTableNotFoundItem />,
            render: (category, index) => <CategoryTableItem index={index} category={category} refetch={refetchCategory}/>
          })}
        </TableBody>
      }
    </Table>
  );
};
