"use client";
import { Form } from "@/components/ui/form";
import { CreateTodoFormLayout } from "../components/layout";
import { CreateTodoFormInner } from "./CreateTodoFormInner";
import { useForm } from "react-hook-form";
import type { CreateTodoFormSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast as sonner } from "sonner";
import { api } from "@/trpc/client";
import { createTodoFormSchema } from "../schemas";
import { useToast } from "@/hooks/use-toast";

type CreateTodoFormProps = {
  refetch: () => void
}

export const CreateTodoForm = ({ refetch: refetchTodos }: CreateTodoFormProps) => {
  const { toast } = useToast()
  const form = useForm<CreateTodoFormSchema>({
    defaultValues: {
      text: "",
    },
    resolver: zodResolver(createTodoFormSchema),
  });

  const { mutate: createTodo, isPending: isCreateTodoPending } = api.todo.create.useMutation({
    onSuccess: () => {
      sonner.success("Todo created successfully");
      refetchTodos()
      form.reset()
    },
    onError: () => {
      toast({
        title: "NOT FOUND",
        variant: "destructive",
        description: "Something went wrong",
      })
    }
  })

  const onSubmit = (values: CreateTodoFormSchema) => createTodo(values)

  return (
    <CreateTodoFormLayout
      formId="create-todo-form"
      isPending={isCreateTodoPending}
    >
      <Form {...form}>
        <CreateTodoFormInner formId="create-todo-form" onSubmit={onSubmit} />
      </Form>
    </CreateTodoFormLayout>
  );
};
