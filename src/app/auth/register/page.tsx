import Link from 'next/link';
import { AuthForm } from '@/components/forms/AuthForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthForm mode="register" showPetName />
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
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