"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Dynamic API URL that works for both local and production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://kira-fastapi.onrender.com';

// For debugging - remove this in production
console.log('Current API URL:', API_BASE_URL);

// Update API_ENDPOINTS to use the dynamic base URL
const API_ENDPOINTS = {
    login: `${API_BASE_URL}/login`,
    register: `${API_BASE_URL}/register`,
    me: `${API_BASE_URL}/users/me`,
    logout: `${API_BASE_URL}/logout`,
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = async (token: string) => {
        try {
            const response = await fetch(API_ENDPOINTS.me, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username: string, password: string): Promise<void> => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            console.log('Attempting login to:', API_ENDPOINTS.login);
            const response = await fetch(API_ENDPOINTS.login, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Login failed');
            }

            localStorage.setItem('token', data.access_token);
            await fetchUser(data.access_token);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username: string, email: string, password: string): Promise<void> => {
        try {
            console.log('Attempting registration at:', API_ENDPOINTS.register);
            
            const response = await fetch(API_ENDPOINTS.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
                mode: 'cors'
            });

            let data;
            try {
                data = await response.json();
            } catch (e) {
                console.error('Error parsing response:', e);
                throw new Error('Server response was not in the expected format');
            }

            if (!response.ok) {
                // Handle specific error cases
                if (response.status === 409) {
                    throw new Error('Username or email already exists');
                }
                throw new Error(data.detail || 'Registration failed');
            }

            // After successful registration, redirect to login
            router.push('/login?registered=true');
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
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