"use client"

import { ConsumeStockForm } from "@/components";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ColumnsProductsType } from "@/schema";
import { useState } from "react";

//TODO: crear un schema nuevo para consumo por lote y formulario
export function TableCellViewer({ item }: { item: ColumnsProductsType }) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState<boolean>(false)

  return (
     <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={setOpen}>
       <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>
            Consumo de stock para de {item.name}
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-full flex flex-col justify-end">
        <ConsumeStockForm productId={item.id} setOpen={setOpen}/>
        </div>
         <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
     </Drawer>
  )
}