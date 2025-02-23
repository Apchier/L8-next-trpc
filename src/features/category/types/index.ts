import type { z } from 'zod';
import type { createCategoryFormSchema, updateCategoryFormSchema } from './../schemas/index';
import type { Prisma } from '@prisma/client';

export type CreateCategoryFormSchema = z.infer<typeof createCategoryFormSchema>
export type UpdateCategoryFormSchema = z.infer<typeof updateCategoryFormSchema>

export type CategoryWithValidation = Prisma.CategoryGetPayload<{ 
    select: {
        id: true,
        name: true
    }
}>