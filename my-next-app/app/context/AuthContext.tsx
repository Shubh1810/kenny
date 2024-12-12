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
            console.group('%c Registration Debug', 'background: #222; color: #bada55');
            console.log('1. Request Data:', { username, email });
            console.log('2. API Endpoint:', API_ENDPOINTS.register);

            const response = await fetch(API_ENDPOINTS.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                })
            });

            console.log('3. Response Status:', response.status);
            
            let data;
            try {
                data = await response.json();
                console.log('4. Response Data:', data);
            } catch (e) {
                console.error('5. JSON Parse Error:', e);
                throw new Error('Invalid server response format');
            }

            if (!response.ok) {
                console.error('6. Error Response:', data);
                if (response.status === 422) {
                    throw new Error('Invalid input data');
                } else if (response.status === 409) {
                    throw new Error('Username or email already exists');
                } else if (response.status === 500) {
                    throw new Error('Internal server error - please try again');
                }
                throw new Error(data.detail || 'Registration failed');
            }

            console.log('7. Registration Successful');
            console.groupEnd();

            // After successful registration, redirect to login
            router.push('/login?registered=true');
        } catch (error) {
            console.error('8. Registration Error:', error);
            console.groupEnd();
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