"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnsProductsType } from "@/schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { formatDate } from "@/utils/format-date";
import { TableCellViewer } from "./table-cell-viewer";
import { formatCurrency } from "@/utils";

export const columns: ColumnDef<ColumnsProductsType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const item = row.original;
      return <TableCellViewer item={item} />
    }
  },
  {
    accessorKey: "brand",
    header: "Marca"
  },
  {
    accessorKey: "currentStock",
    header: "Stock Actual"
  },
  {
    accessorKey: "unitSalePrice",
    header: () => <div className="text-right">Precio de venta</div>,
    cell: ({ row }) => {
      const amount = row.getValue('unitSalePrice') as number;
      return <div className="text-right font-medium">{formatCurrency(amount)}</div>
    },
  },
  {
    accessorKey: "expiresDate",
    header: () => <div className="text-center">Fecha vencimiento</div>,
    cell: ({ row }) => {
      const date = row.getValue("expiresDate")
      return <div className="text-center">{formatDate(date as string)}</div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]