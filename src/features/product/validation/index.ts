import { z } from "zod";

export const createProductRequest = z.object({
    name: z.string().min(1).max(100),
    price: z.string().min(1).max(50),
    image: z.string().max(100).optional(),
    description: z.string().optional(),
    category_id: z.string().min(1).max(100)
})

export const updateCategoryRequest = z.object({
    name: z.string().min(1, "Category wajib di isi").max(100, "Category maksimal 100 karakter").toLowerCase()
}) 