export interface Product {
  id: string;
  userId?: string;
  createdAt: Date;
  name: string;
  brandId: string;
  description?: string;
  minStock: number;
  currentStock: number;
  unitMeasure: UnitMeasure;
  purchaseUnit?: UnitMeasure;
  saleUnit?: UnitMeasure;
  purchaseUnitQty?: number;
  saleUnitQty?: number;
  costPrice: number;
  unitCostPrice?: number;
  salePrice: number;
  unitSalePrice?: number;
  profitMargin?: number;
  expiresDate?: Date;
  barcode?: string;
  isActive: boolean;
  categoryId: string;
  supplierId?: string;
}

export enum UnitMeasure {
  UNIT = "UNIT",
  GRAM = "GRAM",
  KILOGRAM = "KILOGRAM",
  LITER = "LITER",
  METER = "METER",
  BOX = "BOX",
  PACKAGE = "PACKAGE",
  OTHER = "OTHER",
}

export const UnitMeasureValues = Object.values(UnitMeasure) as [string, ...string[]];

export const labelsMeasure:Record<string,string> = {
  UNIT: "unitario",
  GRAM : "gramo",
  KILOGRAM : "kilogramo",
  LITER : "litro",
  METER : "metro",
  BOX : "caja",
  PACKAGE : "empaque",
  OTHER : "otro",
}