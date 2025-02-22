import { z } from "zod";

export const createCategoryRequest = z.object({
    name: z.string().min(1, "Category wajib di isi").max(100, "Category maksimal 100 karakter").toLowerCase()
}) 

export const updateCategoryRequest = z.object({
    name: z.string().min(1, "Category wajib di isi").max(100, "Category maksimal 100 karakter").toLowerCase()
}) 