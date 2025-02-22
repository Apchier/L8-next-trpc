import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TodoTableBodySkeleton } from "./TodoTableBodySkeleton";

export const TodoTableSkeleton = () => {
  return (
    <Table className="border border-border bg-background">
      <TableCaption className="border border-border"></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Skeleton className="h-4 w-[50px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TodoTableBodySkeleton />
    </Table>
  );
};
