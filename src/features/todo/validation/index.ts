import { z } from "zod";

export const updateTodoRequest = z.object({
  text: z.string().min(1, "Todo wajib di isi").max(100, "Todo maksimal 100 karakter").toLowerCase()
}) 