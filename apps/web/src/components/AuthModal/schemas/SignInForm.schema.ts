import { z } from 'zod';

const basePasswordSchema = z.string().trim();

export const signInSchema = z.object({
    email: z.email("Invalid email"),
    password: basePasswordSchema,
  })

export type SignInFormData = z.infer<typeof signInSchema>;
  