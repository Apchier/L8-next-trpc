"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { CreateTodoFormSchema } from "../types";

type CreateTodoFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateTodoFormSchema) => void;
};

export const CreateTodoFormInner = ({
  formId,
  onSubmit,
}: CreateTodoFormInnerProps) => {
  const form = useFormContext<CreateTodoFormSchema>();

  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="text"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Todo</FormLabel>
            <FormControl>
              <Input placeholder="Input your todo here" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
