'use client';
import { PageContainer } from "@/components/layouts/PageContainer";
import { SectionContainer } from "@/components/layouts/SectionContainer";
import { CreateTodoForm } from "../forms";
import { TodoTable } from "../tables";
import { api } from "@/trpc/client";

export const TodoPage = () => {
  const { data: todos, isLoading: isTodoLoading, refetch: refetchTodos } = api.todo.getAll.useQuery();

  return (
    <PageContainer withHeader withFooter>
      <SectionContainer
        padded
        withBackground
        className="min-h-screen gap-y-10 pt-10"
      >
        {/* Todo Form */}
        <CreateTodoForm refetch={refetchTodos}/>
        {/* Todo Table */}
        <TodoTable todos={todos} isLoading={isTodoLoading} refetch={refetchTodos}/>
      </SectionContainer>
    </PageContainer>
  );
};
