import { z } from 'zod';

const basePasswordSchema = z.string().trim();

const strongPasswordSchema = basePasswordSchema
  .min(8, "Password must be at least 8 characters")
  .max(64, "Password is too long")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/\d/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name should be at least 2 characters")
      .max(50, "Name is too long"),
    
    email: z.
      email("Invalid email"),
    password: strongPasswordSchema,
    confirmPassword: z.
    string().
    trim().
    min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

  export type SignUpFormData = z.infer<typeof signUpSchema>;
