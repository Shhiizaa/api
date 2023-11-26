import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Пожалуйста, введите корректный email" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен содержать не менее 8 символов." })
    .refine((password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password), {
      message:
        "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру",
    }),
  date: z.number(),
});
