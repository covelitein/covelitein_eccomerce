import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "compulsory field" }),
    lastName: z.string().min(1, { message: "compulsory field" }),
    email: z.string().email("invalid email"),
    phone: z.string().min(1, { message: "compulsory field" }),
    address: z.string().min(11, { message: "compulsory field" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, "Enter registered email").email("invalid email"),
  password: z.string().min(1, "Enter your password"),
});
