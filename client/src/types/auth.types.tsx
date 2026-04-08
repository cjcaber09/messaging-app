import z from "zod";

export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email" }),
    username: z.string().min(1, "Last name is required"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: z
      .string()
      .min(8, "Confirm password is required")
      .regex(/^[a-zA-Z0-9]{3,30}$/),
    lastname: z.string().min(1, "Last name is required"),
    firstname: z.string().min(1, "First name is required"),
    is_active: z.boolean().default(true).optional(),
    is_verified: z.boolean().default(false).optional(),
  })
  .refine((val) => val.password === val.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterData = z.infer<typeof registerSchema>;

export type UserData = {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  is_active?: boolean;
  is_verified?: boolean;
} | null;

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(6, {
    message: "Minimum 6 chars",
  }),
});

export type LoginData = z.infer<typeof loginSchema>;
