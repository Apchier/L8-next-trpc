'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TodoPagination } from "../components/TodoPagination";
import { TodoTableItem, TodoTableNotFoundItem } from "./TodoTableItem";
import { renderElements } from "@/utils/render-elements";
import type { Todo } from "@prisma/client";
import { TodoTableBodySkeleton } from "../components/skeleton/TodoTableBodySkeleton";

type TodoTableProps = {
  todos?: Todo[];
  isLoading: boolean;
  refetch: () => void;
}

export const TodoTable = ({ todos, isLoading: isTodoLoading, refetch: refetchTodos }: TodoTableProps) => {
  return (
    <Table className="border border-border bg-background">
      <TableCaption className="border border-border">
        <TodoPagination />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Todo</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isTodoLoading && <TodoTableBodySkeleton />}
      {
        <TableBody>
          {renderElements({
            of: todos,
            keyExtractor: (todo) => todo.id,
            fallback: <TodoTableNotFoundItem />,
            render: (todo, index) => <TodoTableItem index={index} todo={todo} refetch={refetchTodos} />
          })}
        </TableBody>
      }
    </Table>
  );
};
