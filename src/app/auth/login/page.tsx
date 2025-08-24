import Link from 'next/link';
import { AuthForm } from '@/components/forms/AuthForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthForm mode="login" />
        
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{' '}
            <Link 
              href="/auth/register" 
              className="font-medium text-green-600 hover:text-green-500"
            >
              Зарегистрироваться
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link 
              href="/auth/reset-password" 
              className="font-medium text-green-600 hover:text-green-500"
            >
              Забыли пароль?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}