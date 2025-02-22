import { z } from "zod";

export const createTodoFormSchema = z.object({
  text: z
    .string()
    .min(1, "Todo wajib di isi")
    .max(100, "Todo maksimal 100 karakter"),
});

export const updateTodoFormSchema = z.object({
  text: z
    .string()
    .min(1, "Todo wajib di isi")
    .max(100, "Todo maksimal 100 karakter"),
}) 