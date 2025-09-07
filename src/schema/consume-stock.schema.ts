import z from "zod";

export enum ConsumeTypeEnum {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
  ADJUSTMENT = "ADJUSTMENT",
  TRANSFER_IN = "TRANSFER_IN",
  TRANSFER_OUT = "TRANSFER_OUT",
  CORRECTION = "CORRECTION"
}

const ConsumeTypeValues = Object.values(ConsumeTypeEnum) as [string, ...string[]];

export const consumeStockSchema = z.object({
  productId: z.uuid(),
  qty: z.number().positive("La cantidad debe ser un numero positivo").min(1, "La cantidad debe ser al menos 1"),
  allowNegativeStock:z.boolean().optional(),
  type: z.enum(ConsumeTypeValues,"Debe seleccionar un tipo de consumo"),
  note: z.string().optional()
})

export type ConsumeStockType = z.infer<typeof consumeStockSchema>