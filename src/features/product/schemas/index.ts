import { z } from "zod";

export const createCategoryFormSchema = z.object({
    name: z
        .string()
        .min(1, "Category wajib di isi")
        .max(100, "Category maksimal 100 karakter"),
});

export const updateCategoryFormSchema = z.object({
    name: z
        .string()
        .min(1, "Category wajib di isi")
        .max(100, "Category maksimal 100 karakter"),
}) 