import z from "zod";
import { UnitMeasure } from "@/interfaces";

export const CreateProductSquema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(35, "El nombre no debe superar los 35 caracteres"),
  barcode:z.string().optional(),
  brandId:z.uuid(),
  categoryId:z.uuid(),
  costPrice: z.number().min(1, "El precio de costo es obligatorio"),
  description:z.string().optional(),
  expiresDate:z.date().optional(),
  isActive: z.boolean().default(true),
  minStock: z.number().min(1, "El stock de alerta debe ser mayor que 1"),
  unitMeasure: z.enum(UnitMeasure),
  saleUnit: z.enum(UnitMeasure),
  unitSalePrice:z.number().optional(),
  profitMargin:z.number().optional(),
})