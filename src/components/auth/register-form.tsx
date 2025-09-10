"use client";

import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RegisterSchema, RegisterValues } from '@/schema';
import { toast } from "sonner";

export function RegisterForm() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name:"",
      businessName:"",
      email: "",
      password: "",
      confirmPassword:""
    }
  })
  function onSubmit(values: RegisterValues) {
    console.log(values)
    toast.success("Registro exitoso")
  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center md:text-nowrap">
          <h1 className="text-2xl font-bold">Bienvenido a Stock Manager</h1>
          <p className="text-muted-foreground text-sm">
            Para registrarse complete los siguientes campos a continuación.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Luna del Valle" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Nombre del comercio</FormLabel>
                <FormControl>
                  <Input placeholder="kiosco Luna" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@ejemplo.com" type="email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type='password' {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input type='password' {...field} required />
                </FormControl>
                <FormDescription>Por favor reescriba su contraseña</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {
              form.formState.isSubmitting ? "Registrando" : "Registrarse"
            }
          </Button>
        </div>
        {/* <div className="text-center text-sm">
          No tiene una cuenta?{" "}
          <Link href="/auth/register" className="underline underline-offset-4">
            Registrarse
          </Link>
        </div> */}
      </form>
    </Form>
  )
}
