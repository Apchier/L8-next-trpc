import { TableCell, TableRow } from "@/components/ui/table";
import type { Todo } from "@prisma/client";
import { DeleteTodoDialog } from "../components/action/DeleteTodoDialog";
import { EditTodoDIalog } from "../components/action/EditTodoDIalog";

type TodoTableItemProps = {
  index: number;
  todo: Todo;
  refetch: () => void
};

export const TodoTableItem = ({ todo, refetch: refetchTodos, ...props }: TodoTableItemProps) => {
  return (
    <TableRow>
      <TableCell>{props.index + 1}</TableCell>
      <TableCell className="w-full">{todo.text}</TableCell>
      <TableCell>{todo.status ? "Done" : "Pending"}</TableCell>
      <TableCell className="flex gap-2">
        <EditTodoDIalog id={todo.id} refetch={refetchTodos}/>
        <DeleteTodoDialog todoId={todo.id} refetch={refetchTodos}/>
      </TableCell>
    </TableRow>
  );
};
export const TodoTableNotFoundItem = () => (
  <TableRow>
    <TableCell colSpan={4} className="text-center">
      No Todo
    </TableCell>
  </TableRow>
);
