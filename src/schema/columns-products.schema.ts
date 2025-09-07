import z from "zod";

export const ColumnsProductsSchema = z.object({
  id: z.uuid(),
  name:z.string().min(1).max(35),
  brand: z.string().min(1),
  currentStock: z.number(),
  unitSalePrice: z.number(),
  saleUnit: z.string(),
  expiresDate: z.date().optional()
})

export type ColumnsProductsType = z.infer<typeof ColumnsProductsSchema>;