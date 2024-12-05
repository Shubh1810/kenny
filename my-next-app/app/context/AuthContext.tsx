"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// API URLs from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
const API_ENDPOINTS = {
    login: `${API_BASE_URL}/token`,
    register: `${API_BASE_URL}/register`,
    me: `${API_BASE_URL}/users/me`,
};

interface User {
    username: string;
    email?: string;
    full_name?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, email: string, password: string) => Promise<void>;
}

interface ApiError {
    detail: string;
    status: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchUser = useCallback(async (token: string) => {
        try {
            const response = await fetch(API_ENDPOINTS.me, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                const error = await handleApiError(response);
                if (error.status === 401) {
                    localStorage.removeItem('token');
                    setUser(null);
                    router.push('/login');
                }
                throw new Error(error.detail);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                await fetchUser(token);
            } else {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [fetchUser]);

    const handleApiError = async (response: Response): Promise<ApiError> => {
        try {
            const data = await response.json();
            return {
                detail: data.detail || 'An error occurred',
                status: response.status
            };
        } catch {
            return {
                detail: 'Network error occurred',
                status: response.status
            };
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch(API_ENDPOINTS.login, {
                method: 'POST',
                body: formData,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const error = await handleApiError(response);
                throw new Error(error.detail);
            }

            const data = await response.json();
            
            if (!data.access_token) {
                throw new Error('No access token received');
            }

            localStorage.setItem('token', data.access_token);
            await fetchUser(data.access_token);
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            throw error instanceof Error ? error : new Error('Login failed');
        }
    };

    const logout = async () => {
        try {
            // Clear all auth-related storage
            localStorage.removeItem('token');
            sessionStorage.clear();
            
            // Clear user state
            setUser(null);

            // Optional: Call logout endpoint if you have one
            // await fetch(`${API_BASE_URL}/logout`, {
            //     method: 'POST',
            //     credentials: 'include'
            // });

            // Navigate to login
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear local state even if server logout fails
            setUser(null);
            router.push('/login');
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch(API_ENDPOINTS.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const error = await handleApiError(response);
                throw new Error(error.detail);
            }

            // After successful registration, log the user in
            await login(username, password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error instanceof Error ? error : new Error('Registration failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}