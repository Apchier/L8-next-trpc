import { createProductRequest } from "@/features/product/validation";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const productRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            const { db } = ctx
            const products = await db.product.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    image: true,
                    description: true,
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            })
            return products
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "Failed to fetch products",
                cause: error
            })
        }
    }),

    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { id } = input;
                const product = await db.product.findUnique({ where: { id }, include: { category: true } })
                return product
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error instanceof Error ? error.message : "Failed to fetch products",
                        cause: error
                    })
                }
            }
        }),

    create: publicProcedure
        .input(z.object({ request: createProductRequest }))
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { request } = input
                await db.product.create({
                    data: {
                        ...request
                    },
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        description: true,
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                })
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error instanceof Error ? error.message : "Failed to create products",
                        cause: error
                    })
                }
            }
        }),

    update: publicProcedure
        .input(z.object({ id: z.string(), request: createProductRequest }))
        .mutation(async ({ ctx, input }) => {
            try {
                const { db } = ctx
                const { id, request } = input
                const productExist = await db.product.count({ where: { id } })
                if (productExist === 0) {
                    await db.product.count({ where: { id } })
                }
                await db.product.update({
                    where: { id: input.id },
                    data: { ...request },
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        description: true,
                        category: {
                            select: {
                                name: true
                            }
                        }
                    }
                })
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: error instanceof Error ? error.message : "Failed to update products",
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
                const productExist = await db.product.count({ where: { id } })
                if (productExist === 0) {
                    await db.product.count({ where: { id } })
                }
                await db.product.delete({ where: { id: input.id } })
            } catch (error) {
                if (error instanceof TRPCError) {
                    if (error instanceof TRPCError) {
                        throw new TRPCError({
                            code: "INTERNAL_SERVER_ERROR",
                            message: error instanceof Error ? error.message : "Failed to delete products",
                            cause: error
                        })
                    }
                }
            }
        })

})
