"use client";

import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Username validation (3-50 characters)
    if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
    } else if (formData.username.length < 3 || formData.username.length > 50) {
        newErrors.username = 'Username must be between 3 and 50 characters';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
        newErrors.username = 'Username can only contain letters, numbers, underscores, and hyphens';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
    }

    // Password validation (4 characters minimum)
    if (!formData.password) {
        newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
        newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm() || isLoading) return;

    setIsLoading(true);

    try {
      console.log('Starting registration process...');
      console.log('Form data being sent:', {
        username: formData.username,
        email: formData.email,
      });

      await register(formData.username, formData.email, formData.password);
      console.log('Registration successful, redirecting...');
      router.push('/login?registered=true');
    } catch (err: unknown) {
      console.error('Detailed signup error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setServerError(errorMessage);
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
      console.log('Registration process completed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-neutral-950/80 via-neutral-950/70 to-neutral-900/60">
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Join KIRA
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Create an account to start using your AI assistant
          </p>

          {serverError && (
            <div className="mt-4 p-3 text-sm text-red-400 bg-red-900/20 rounded border border-red-500/20">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                {serverError}
              </div>
            </div>
          )}

          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  if (errors.username) setErrors({ ...errors, username: undefined });
                }}
                placeholder="Choose a username"
                type="text"
                className={errors.username ? 'border-red-500' : ''}
                required
              />
              {errors.username && (
                <span className="text-sm text-red-500">{errors.username}</span>
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="Enter your email"
                type="email"
                className={errors.email ? 'border-red-500' : ''}
                required
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-8">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                placeholder="••••••••"
                type="password"
                className={errors.password ? 'border-red-500' : ''}
                required
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </LabelInputContainer>

            <button
              className={cn(
                "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
                {
                  'opacity-50 cursor-not-allowed': isLoading,
                  'hover:opacity-90': !isLoading,
                }
              )}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                  Creating Account...
                </div>
              ) : (
                'Sign up'
              )}
              <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            <p className="text-center text-sm text-neutral-600 dark:text-neutral-300 mt-4">
              Already have an account?{' '}
              <a
                href="/login"
                className="text-blue-500 hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};