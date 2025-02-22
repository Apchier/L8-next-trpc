import { axiosInstance } from "@/lib/axios";
import type { CreateTodoFormSchema, Todo } from "../types";
import type { ApiProps, ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const createTodo = async (values: CreateTodoFormSchema) => {
  const response = await axiosInstance.post<ApiResponse<Todo>>(
    "/todos",
    values,
  );
  return response.data.data;
};

export const useCreateTodo = ({ onMutate, onSuccess, onError }: ApiProps) => {
  return useMutation({
    mutationKey: ["mutate", "todos"],
    mutationFn: createTodo,
    onMutate,
    onSuccess,
    onError,
  });
};
