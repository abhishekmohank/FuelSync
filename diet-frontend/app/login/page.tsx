'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { auth } from '@/utils/api';
import { useAuthStore } from '@/utils/store';
import BrandLogo from '@/components/BrandLogo';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await auth.login(data);
      setToken(response.data.token);
      setUser(response.data.user);
      try {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (storageError) {
        console.warn('Could not persist user to storage, session will be in-memory only', storageError);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl border border-blue-800/50 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
        <div className="mb-6 flex justify-center">
          <BrandLogo size={300} textClassName="text-3xl font-bold" variant="dark" />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-blue-100">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="w-full rounded-lg border border-blue-800 bg-slate-950/70 px-4 py-2 text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-blue-100">Password</label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              className="w-full rounded-lg border border-blue-800 bg-slate-950/70 px-4 py-2 text-white placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-blue-100">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-300 hover:text-blue-200 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
