import { axiosInstance } from "@/lib/axios";
import type { ApiProps, ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export const deleteTodo = async (id: string) => {
  const response = await axiosInstance.delete<ApiResponse<{ id: string }>>(
    `/todos/${id}`,
  );
  return response.data.data;
};

export const useDeleteTodo = ({ onMutate, onSuccess, onError }: ApiProps) => {
  return useMutation({
    mutationKey: ["mutate", "delete", "todos"],
    mutationFn: deleteTodo,
    onMutate,
    onSuccess,
    onError,
  });
};
