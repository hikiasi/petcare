import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Некорректный email адрес'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(128, 'Пароль слишком длинный'),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email обязателен')
      .email('Некорректный email адрес'),
    password: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .max(128, 'Пароль слишком длинный')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру'
      ),
    confirmPassword: z.string(),
    petName: z
      .string()
      .min(1, 'Имя питомца обязательно')
      .max(50, 'Имя питомца слишком длинное')
      .optional(),
    fullName: z
      .string()
      .max(100, 'Имя слишком длинное')
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Некорректный email адрес'),
});

export const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .max(128, 'Пароль слишком длинный')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;