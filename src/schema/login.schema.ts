import z from "zod";

export const LoginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(24, "la contraseña debe tener menos de 24 caracteres").trim().refine((val) => {
    const hasUpperCase = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    return hasUpperCase && hasNumber;
  }, {
    message: "La contraseña debe contener al menos una mayúscula y un número"
  })
})

export type LoginValues = z.infer<typeof LoginSchema>;