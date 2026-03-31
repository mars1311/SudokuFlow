import * as z from 'zod';

const baseSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const authSchema = z.discriminatedUnion('mode', [
  z.object({
    mode: z.literal('signin'),
    ...baseSchema.shape,
  }),
  z.object({
    mode: z.literal('signup'),
    ...baseSchema.shape,
    name: z.string().min(2, 'Name is required'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
]);

export type AuthFormData = z.infer<typeof authSchema>;