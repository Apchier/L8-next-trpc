import { updateCategoryRequest } from "@/features/category/validation";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            const { db } = ctx
            const categories = await db.category.findMany()
            return categories
        } catch (error) {
            if (error instanceof TRPCError) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Category not found",
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
                const category = await db.category.findUnique({ where: { id } })
                return category
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Category not found",
                        cause: error
                    })
                }
            }
        }),

    create: publicProcedure
        .input(z.object({
            name: z.string().min(1, "Category wajib di isi").max(100, "Category maksimal 100 karakter").toLowerCase()
        }))
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { name } = input
                await db.category.create({
                    data: {
                        ...input,
                        name
                    }
                })
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Category not found",
                        cause: error
                    })
                }
            }
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                request: updateCategoryRequest
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { id, request } = input
                const { name } = request

                const categoryExist = await db.category.count({ where: { id } })

                if (categoryExist === 0) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: `Category with : ${id} not found`
                    })
                }

                await db.category.update({ where: { id }, data: { name } })
                
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Category not found",
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
                const categoryExist = await db.category.count({ where: { id } })
                if (categoryExist === 0) {
                    await db.category.count({ where: { id } })
                }
                await db.category.delete({ where: { id: input.id } })
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Category not found",
                        cause: error
                    })
                }
            }
        })
})