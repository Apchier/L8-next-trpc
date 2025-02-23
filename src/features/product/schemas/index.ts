import { z } from "zod";

export const createProductFormSchema = z.object({
    name: z.string().min(1, "Product wajib di isi").max(100, "Product maksimal 100 karakter"),
    price: z.string().min(1, "Product wajib di isi").max(50, "Product maksimal 50 karakter"),
    image: z.string().max(100).optional(),
    description: z.string().optional(),
    category_id: z.string().min(1).max(100)

});

export const updateProductFormSchema = z.object({
    name: z.string().min(1, "Product wajib di isi").max(100, "Product maksimal 100 karakter"),
    price: z.string().min(1, "Product wajib di isi").max(50, "Product maksimal 50 karakter"),
    image: z.string().max(100).optional(),
    description: z.string().optional(),
    category_id: z.string().min(1).max(100)
}) 