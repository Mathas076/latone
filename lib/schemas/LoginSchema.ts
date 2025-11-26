import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El campo email es obligatorio' })
    .email({ message: 'Revisa el formato del email' }),

  password: z
    .string()
    .min(1, { message: 'La contraseña es obligatoria' })
    .regex(/[A-Z]/, { message: 'Contraseña incorrecta' })
    .regex(/[0-9]/, { message: 'Contraseña incorrecta' }),
});

export type LoginType = z.infer<typeof loginSchema>;