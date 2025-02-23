import type { z } from 'zod';
import type { createProductFormSchema, updateProductFormSchema } from './../schemas/index';
import type { Prisma } from '@prisma/client';

export type CreateProductFormSchema = z.infer<typeof createProductFormSchema>
export type UpdateProductFormSchema = z.infer<typeof updateProductFormSchema>

export type ProductWithCategory = Prisma.ProductGetPayload<{ 
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
}>