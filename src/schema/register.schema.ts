import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(4, "El nombre debe tener al menos 4 caracteres").trim().toLowerCase(),
  businessName: z.string().min(2, "El nombre del comercio debe tener al menos 2 caracteres").trim().toLowerCase(),
  email: z.email("Debe ingresar un email válido").trim().toLowerCase(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(24, "la contraseña debe tener menos de 24 caracteres").trim().refine((val) => {
    const hasUpperCase = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    return hasUpperCase && hasNumber;
  }, {
    message: "La contraseña debe contener al menos una mayúscula y un número"
  }),
  confirmPassword: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(24, "la contraseña debe tener menos de 24 caracteres").trim()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

export type RegisterValues = z.infer<typeof RegisterSchema>;