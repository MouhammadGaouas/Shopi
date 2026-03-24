import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  stock: z.number().min(0),
});
