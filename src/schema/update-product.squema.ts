import { UnitMeasure } from "@/interfaces";
import z from "zod";

export const UpdateProductSquema = z.object({
  name:z.string(),
  brandId:z.uuid(),
  description:z.string().optional(),
  minStock: z.number(),
  // unitMeasure: z.enum(UnitMeasure),
  purchaseUnit: z.enum(UnitMeasure),
  saleUnit:z.enum(UnitMeasure),
  costPrice:z.number({message:"Debe ingresar un precio de costo"}),
  purchaseUnitQty:z.number().optional(),
  salePrice:z.number().optional(),
  isActive:z.boolean(),
  categoryId:z.uuid()
});

export type UpdateProductValues = z.infer<typeof UpdateProductSquema>;