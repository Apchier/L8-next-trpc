import { axiosInstance } from "@/lib/axios";
import type { ApiResponse, QueryResponse } from "@/types/api";
import type { Todo } from "../types";
import { useQuery } from "@tanstack/react-query";

const getTodos = async () => {
  const response =
    await axiosInstance.get<ApiResponse<QueryResponse<Todo[]>>>("todos");
  return response.data.data;
};
export const useTodos = () => {
  return useQuery({
    queryKey: ["query", "todos"],
    queryFn: getTodos,
  });
};
