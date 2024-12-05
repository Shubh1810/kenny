"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('token_type');
        if (token && tokenType) {
            fetchUser(token, tokenType);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = async (token: string, tokenType: string) => {
        try {
            const response = await fetch('http://localhost:8001/users/me', {
                headers: {
                    'Authorization': `${tokenType} ${token}`,
                },
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('token_type');
                setUser(null);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('token_type');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username: string, password: string) => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch('http://localhost:8001/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || 'Invalid username or password.');
            }

            const { access_token, token_type } = data;
            if (!access_token || !token_type) {
                throw new Error('No token returned from server');
            }

            localStorage.setItem('token', access_token);
            localStorage.setItem('token_type', token_type);

            // Fetch user data
            const userResponse = await fetch('http://localhost:8001/users/me', {
                headers: {
                    'Authorization': `${token_type} ${access_token}`,
                },
            });

            if (!userResponse.ok) {
                const errorData = await userResponse.json();
                console.error('Error fetching user data:', errorData);
                throw new Error(errorData.detail || 'Failed to fetch user data');
            }

            const userData = await userResponse.json();
            setUser(userData);

        } catch (error: unknown) {
            console.error('Login error:', error);
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('An unexpected error occurred');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_type');
        setUser(null);
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch('http://localhost:8001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Registration failed');
            }

            // After successful registration, automatically log the user in
            try {
                await login(username, password);
            } catch (error: unknown) {
                console.error('Auto-login after registration failed:', error);
                if (error instanceof Error) {
                    throw new Error(`Registration successful, but login failed: ${error.message}`);
                }
                throw new Error('Registration successful, but login failed. Please try logging in manually.');
            }
        } catch (error: unknown) {
            console.error('Registration error:', error);
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('An unexpected error occurred during registration');
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