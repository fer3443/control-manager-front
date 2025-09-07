"use client";

import React from 'react'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { LoginSchema, LoginValues } from '@/schema';
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  function onSubmit(values: LoginValues) {
    toast.success("Inico de sesion exitoso")
    router.push('/dashboard')

  }
  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Bienvenido otra vez</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Inicie sesión en stock manager.
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className='grid gap-3'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@ejemplo.com" {...field} required />
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
                <div className='flex items-center justify-between'>
                  <FormLabel>Contraseña</FormLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline">Olvidó su contraseña?</Link>
                </div>
                <FormControl>
                  <Input type='password' {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {
              form.formState.isSubmitting ? "Iniciando" : "Iniciar Sesión"
            }
          </Button>
        </div>
        <div className="text-center text-sm">
          No tiene una cuenta?{" "}
          <Link href="/auth/register" className="underline underline-offset-4">
            Registrarse
          </Link>
        </div>
      </form>
    </Form>
  )
}
