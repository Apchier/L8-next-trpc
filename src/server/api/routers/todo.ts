import { updateTodoRequest } from "@/features/todo/validation";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const todoRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            const todos = await ctx.db.todo.findMany();
            return todos
        } catch (error) {
            if (error instanceof TRPCError) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Todo not found",
                    cause: error
                })
            }
        }
    }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { id } = input;
                const todo = await db.todo.findUnique({ where: { id } })
                return todo
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Todo not found",
                        cause: error
                    })
                }
            }
        }),

    create: publicProcedure
        .input(z.object({
            text: z.string().min(1, "Todo wajib di isi").max(100, "Todo maksimal 100 karakter").toLowerCase()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { text } = input
                await db.todo.create({
                    data: {
                        ...input,
                        text
                    }
                })
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Todo not found",
                        cause: error
                    })
                }
            }
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                request: updateTodoRequest
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { id, request } = input
                const { text } = request

                const todoExist = await db.todo.count({ where: { id } })

                if (todoExist === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Todo with : ${id} not found`
                    })
                }

                await db.todo.update({ where: { id }, data: { text } })
                
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Todo not found",
                        cause: error
                    })
                }
            }
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { id } = input
                const todoExist = await db.todo.count({ where: { id } })
                if (todoExist === 0) {
                    await db.todo.count({ where: { id } })
                }
                await db.todo.delete({ where: { id: input.id } })
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Todo not found",
                        cause: error
                    })
                }
            }
        })
})