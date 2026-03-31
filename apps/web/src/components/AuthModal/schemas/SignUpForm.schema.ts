import { z } from 'zod';

const passwordSchema = z
  .string()
  .trim()
  .min(6, "Password must be at least 6 characters")
  // .min(8, "Password must be at least 8 characters")
  // .max(64, "Password is too long")
  // .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Must contain at least one lowercase letter")
  // .regex(/\d/, "Must contain at least one number")
  // .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");


export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Name should be at least 2 symbols"),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email")
      .refine(
        (val) => z.string().email().safeParse(val).success,
        { message: "Invalid email" }
      ),

    password: passwordSchema,

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });