// "use client";
// import { TableBody } from "@/components/ui/table";
// import { renderElements } from "@/utils/render-elements";
// import { TodoTableBodySkeleton } from "../components/skeleton/TodoTableBodySkeleton";
// import { TodoTableItem, TodoTableNotFoundItem } from "./TodoTableItem";
// import { api } from "@/trpc/server";


// export const TodoTableBody = () => {

//   if (isTodoLoading) {
//     return <TodoTableBodySkeleton />;
//   }
//   return (
//     <TableBody>
//       {renderElements({
//         of: todos,
//         keyExtractor: (todo) => todo.id,
//         fallback: <TodoTableNotFoundItem />,
//         render: (todo, index) => <TodoTableItem index={index} todo={todo} />,
//       })}
//     </TableBody>
//   );
// };
