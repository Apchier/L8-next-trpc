import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast as sonner } from "sonner";
import { api } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type DeleteTodoDialogProps = {
  todoId: string;
  refetch: () => void
};

export const DeleteTodoDialog = ({ todoId, refetch: refetchTodos }: DeleteTodoDialogProps) => {
  const { toast } = useToast()

  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => {
      sonner.success("Todo deleted successfully");
      refetchTodos()
    },
    onError: () => {
      toast({
        title: "NOT FOUND",
        description: "Something went wrong",
        variant: "destructive",
      })
    }
  })

  const handleDeleteTodo = () => {
    deleteTodo({ id: todoId })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTodo}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
