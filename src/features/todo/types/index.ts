import { type z } from "zod";
import type { createTodoFormSchema } from "../schemas";

export type Todo = {
  id: string;
  text: string;
  status: boolean;
  created_at: Date | string;
  updated_at: Date | string;
};

export type CreateTodoFormSchema = z.infer<typeof createTodoFormSchema>;
export type UpdateTodoFormSchema = z.infer<typeof createTodoFormSchema>;