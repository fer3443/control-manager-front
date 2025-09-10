"use client";

import React from 'react';

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { Button } from '../ui/button'
import { useIsMobile } from '@/hooks/use-mobile';
import { ColumnsProductsType } from '@/schema';
import { UpdateProductForm } from './update-product-form';

export const TableCellUpdate = ({item}:{item:ColumnsProductsType}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={setOpen}>
       <DrawerTrigger asChild>
        <Button variant="ghost" className="text-foreground w-fit px-0 text-left">
          Editar
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.name}</DrawerTitle>
          <DrawerDescription>
            Editar - {item.name}
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-full flex flex-col justify-end">
          <UpdateProductForm productId={item.id}  setOpen={setOpen}/>
        </div>
         <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
     </Drawer>
  )
}
