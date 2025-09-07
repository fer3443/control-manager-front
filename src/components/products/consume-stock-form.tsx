"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { consumeStockSchema, ConsumeStockType, ConsumeTypeEnum } from '@/schema'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { toast } from "sonner";

interface Props {
  productId:string;
  setOpen?:(open:boolean) => void;
}

export const ConsumeStockForm = ({productId, setOpen}:Props) => {

  const form = useForm<ConsumeStockType>({
    resolver: zodResolver(consumeStockSchema),
    defaultValues: {
      productId,
      qty: 0,
      type: "" as ConsumeTypeEnum,
      allowNegativeStock: false,
      note: ""
    }
  })

  function onSubmit(data: ConsumeStockType) {
    toast.success("Consumo de stock registrado")
    setOpen?.(false);
  }
  return (
    <Form {...form}>
      <form className='flex flex-col gap-4 p-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4 items-center'>
          <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Cantidad de stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode='numeric'
                    placeholder="1"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Tipo de consumo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ConsumeTypeEnum.SALE}>Venta</SelectItem>
                    <SelectItem value={ConsumeTypeEnum.TRANSFER_OUT}>Transferencia</SelectItem>
                    <SelectItem value={ConsumeTypeEnum.ADJUSTMENT}>Ajuste</SelectItem>
                  </SelectContent>
                </Select>
                {/* <FormDescription>
                Declarar el tipo de consumo ayuda a mantener sus registros organizados.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowNegativeStock"
            render={({ field }) => {
              return (
                <FormItem
                  className="flex flex-row items-center gap-2 col-span-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    Permitir que el stock sea negativo
                  </FormLabel>
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Aclaracion de consumo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nota extra" {...field} />
                </FormControl>
                <FormDescription>
                  Puede agregar una nota adicional sobre este consumo de stock.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
