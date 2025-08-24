'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, registerSchema } from '@/lib/validations/auth';
import type { LoginFormData, RegisterFormData } from '@/lib/validations/auth';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
  showPetName?: boolean;
}

export function AuthForm({ mode, onSuccess, showPetName = false }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { login, register: registerUser, isLoading } = useAuth();

  const isLogin = mode === 'login';
  const schema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      setError(null);
      setSuccess(null);

      if (isLogin) {
        await login(data as LoginFormData);
        onSuccess?.();
      } else {
        await registerUser(data as RegisterFormData);
        setSuccess(
          'Регистрация успешна! Проверьте вашу почту для подтверждения email адреса.'
        );
        reset();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin
            ? 'Введите ваши данные для входа'
            : 'Заполните форму для регистрации'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Полное имя (необязательно)</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Ваше имя"
                {...register('fullName' as keyof RegisterFormData)}
              />
              {'fullName' in errors && errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Повторите пароль"
                  {...register('confirmPassword' as keyof RegisterFormData)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {'confirmPassword' in errors && errors.confirmPassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {!isLogin && showPetName && (
            <div className="space-y-2">
              <Label htmlFor="petName">Имя питомца</Label>
              <Input
                id="petName"
                type="text"
                placeholder="Как зовут вашего питомца?"
                {...register('petName' as keyof RegisterFormData)}
              />
              {'petName' in errors && errors.petName && (
                <p className="text-sm text-red-600">{errors.petName.message}</p>
              )}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}