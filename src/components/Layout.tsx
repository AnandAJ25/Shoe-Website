
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            SoleStyle
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${location.pathname === '/' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium ${location.pathname === '/products' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
            >
              All Shoes
            </Link>
            <Link 
              to="/categories" 
              className={`font-medium ${location.pathname === '/categories' ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}
            >
              Categories
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-6 w-6 text-gray-600 hover:text-purple-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <Button variant="ghost" className="p-2">
                  <User className="h-5 w-5" />
                </Button>
                <div className="hidden group-hover:block absolute right-0 w-48 bg-white shadow-lg rounded-md mt-2 py-2 z-20">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  {user?.isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                  )}
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Orders
                  </Link>
                  <button 
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SoleStyle</h3>
              <p className="text-gray-300">Your destination for premium footwear.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-gray-300 hover:text-white">All Shoes</Link></li>
                <li><Link to="/products?category=Running" className="text-gray-300 hover:text-white">Running</Link></li>
                <li><Link to="/products?category=Lifestyle" className="text-gray-300 hover:text-white">Lifestyle</Link></li>
                <li><Link to="/products?category=Basketball" className="text-gray-300 hover:text-white">Basketball</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-300 hover:text-white">Sign In</Link></li>
                <li><Link to="/register" className="text-gray-300 hover:text-white">Register</Link></li>
                <li><Link to="/orders" className="text-gray-300 hover:text-white">Order History</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <address className="text-gray-300 not-italic">
                <p> 123 Delhi</p>
                <p>Laxmi Nagar, FC 12345</p>
                <p className="mt-2">support@solestyle.com</p>
                <p>(555) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SoleStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
