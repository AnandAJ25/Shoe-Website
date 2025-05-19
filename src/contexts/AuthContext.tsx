
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types/product';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@solestyle.com', isAdmin: true },
  { id: '2', name: 'Regular User', email: 'user@example.com', isAdmin: false },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // In a real app, you would verify credentials with an API
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password.length >= 6) { // Simple validation for demo
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error('Invalid email or password');
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      toast.error('User with this email already exists');
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name,
      email,
      isAdmin: false
    };
    
    // In a real app, you would send this to your API
    mockUsers.push(newUser);
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success('Registration successful!');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
