import { z } from "zod";

export const registerSchema = z
  .object({
    firstname: z.string().min(1, { message: "compulsory field" }),
    lastname: z.string().min(2, { message: "compulsory field" }),
    email: z.string().email("invalid email"),
    phone: z.string().min(11, { message: "enter a valid number" }),
    gender: z.string().min(1, { message: "select gender" }),
    username: z.string().min(1, { message: "compulsory field" }),
    password: z
      .string()
      .min(6, { message: "password should be 6 digits or more" }),
    confirm: z.string(),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "check the box to accept TCs",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  email: z.string().min(1, 'Enter registered email').email("invalid email"),
  password: z.string().min(1, "Enter your password"),
});
