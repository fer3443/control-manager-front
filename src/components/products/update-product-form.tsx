"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { UpdateProductSquema, UpdateProductValues } from '@/schema';
import { labelsMeasure, UnitMeasure, UnitMeasureValues } from '@/interfaces';
import { toast } from 'sonner';
import { Loader } from '../ui/loader';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

interface Props {
  productId: string;
  userId?: string;
  setOpen?:(open:boolean) => void;
}

const fetchProduct = async (productId: string) => {
  const product: UpdateProductValues = {
    name: 'Broche de broche',
    brandId: '83cefa52-229c-475e-98aa-1c385d824ad4',
    categoryId: '83cefa52-229c-475e-98aa-1c385d824ad7',
    costPrice: 1000,
    isActive: true,
    minStock: 5,
    purchaseUnit: UnitMeasure.UNIT,
    saleUnit: UnitMeasure.UNIT,
    description: 'Yerbits de kilito',
    purchaseUnitQty: 10,
    salePrice: 1400,

  }
  return product
}

const fetchUpdate = async (values: UpdateProductValues) => {
  return values
}
export const UpdateProductForm = ({ productId, userId, setOpen }:Props) => {
  const queryClient = useQueryClient();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 1000 * 60 * 60 //1hora
  });

  const updateProduct = useMutation({
    mutationFn: (values: UpdateProductValues) => fetchUpdate(values),
    onSuccess: () => {
      // queryClient.invalidateQueries(['product', productId]);
      setOpen?.(false)
      toast.success('Producto actualizado con exito')
    }
  })

  const form = useForm<UpdateProductValues>({
    resolver: zodResolver(UpdateProductSquema),
    values: product
  });

  const onSubmit = (values: UpdateProductValues) => {
    updateProduct.mutate(values)
  }

  if (isLoading) return <Loader />
  if (error) return <div className='h-full flex items-center justify-center'><p>Error al cargar el producto</p></div>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 px-4'>
        <div className='grid grid-cols-2 gap-4 items-center'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nombre del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input
                    placeholder="descripción" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costPrice"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Precio de costo total</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode='numeric'
                    placeholder="10000"
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
            name="purchaseUnitQty"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Unidades por compra</FormLabel>
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
            name="salePrice"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Precio de venta</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode='numeric'
                    placeholder="1000"
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
            name="minStock"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Stock mínimo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode='numeric'
                    placeholder="3"
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
            name="saleUnit"
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Unidad de venta</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UnitMeasureValues.map((measure, index) => (
                      <SelectItem value={measure} key={index} className='capitalize'>{labelsMeasure[measure]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  Unidad de comercialización. "Por gramo".
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchaseUnit"
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Unidad de compra</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {UnitMeasureValues.map((measure, index) => (
                      <SelectItem value={measure} key={index} className='capitalize'>{labelsMeasure[measure]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Unidad de compra al por mayor. "Caja" x 10 unid.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Marcas</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"83cefa52-229c-475e-98aa-1c385d824ad4"} className='capitalize'>taragui</SelectItem>
                    <SelectItem value={"83cefa52-229c-475e-98aa-1c385d824ad5"} className='capitalize'>cbce</SelectItem>
                    <SelectItem value={"83cefa52-229c-475e-98aa-1c385d824ad6"} className='capitalize'>playadito</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className='col-span-1'>
                <FormLabel>Categorias</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"83cefa52-229c-475e-98aa-1c385d824ad7"} className='capitalize'>bebidas</SelectItem>
                    <SelectItem value={"83cefa52-229c-475e-98aa-1c385d824ad8"} className='capitalize'>art. de limpieza</SelectItem>
                    <SelectItem value={"83cefa52-229c-475e-98aa-1c385d824ad9"} className='capitalize'>fiambres</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <Button 
        type="submit"
        disabled={!form.formState.isDirty}
        >{
          form.formState.isSubmitting ? "Cargando" : "Editar"
        }</Button>
      </form>
    </Form>
  )
}
