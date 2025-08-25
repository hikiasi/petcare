import Link from 'next/link';
import { AuthForm } from '@/components/forms/AuthForm';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full space-y-8">
        <AuthForm mode="register" />
        
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Уже есть аккаунт?{' '}
            <Link 
              href="/auth/login" 
              className="font-medium text-green-600 hover:text-green-500"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}