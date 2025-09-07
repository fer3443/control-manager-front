import { Metadata } from "next";
import { DataTable } from "./table/data-table";
import { ColumnsProductsType } from "@/schema";
import { columns } from "./table/columns";

export const metadata:Metadata = {
  title: "Productos",
  description: "Stock completo de productos"
}

const data:ColumnsProductsType[] = [
  {
    id:"83cefa52-229c-475e-98aa-1c385d824ad3",
    name:"Yerba Broche de oro",
    brand: "Broche de Oro",
    currentStock:12,
    unitSalePrice:1215,
    saleUnit:"UNIT",
    expiresDate: new Date("2025-12-12")
  },
  {
    id:"83cefa52-229c-475e-98aa-1c385d824ad4",
    name:"Coca cola 2.5L",
    brand: "Coca Cola",
    currentStock:10,
    unitSalePrice:3700,
    saleUnit:"UNIT",
    expiresDate: new Date("2025-12-13")
  },
  {
    id:"83cefa52-229c-475e-98aa-1c385d824ad5",
    name:"Jabon en polvo",
    brand: "Skip",
    currentStock:4,
    unitSalePrice:1200,
    saleUnit:"UNIT",
    expiresDate: undefined
  },
]
export default function ProductsPage() {
  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}