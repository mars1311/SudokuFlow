import { z } from 'zod';

const passwordSchema = z
  .string()
  .trim()
  .min(6, "Password must be at least 8 characters")
  // .max(64, "Password is too long")
  // .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Must contain at least one lowercase letter")
  // .regex(/\d/, "Must contain at least one number")
  // .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const signInSchema = z
  .object({
    email: z.email("Invalid email"),
    password: passwordSchema,
  })