
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Shipping calculation
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild className="px-8 bg-purple-600 hover:bg-purple-700">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-5 bg-gray-50 p-4">
              <div className="col-span-2 font-medium">Product</div>
              <div className="font-medium text-center">Price</div>
              <div className="font-medium text-center">Quantity</div>
              <div className="font-medium text-right">Subtotal</div>
            </div>
            
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-5 p-4 gap-4">
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-2 flex gap-4">
                    <Link to={`/products/${item.product.id}`} className="w-20 h-20 rounded overflow-hidden shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </Link>
                    <div>
                      <Link to={`/products/${item.product.id}`} className="font-medium hover:text-purple-600">
                        {item.product.name}
                      </Link>
                      <p className="text-gray-500 text-sm">{item.product.brand}</p>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>Size: {item.selectedSize}</span>
                        <span className="mx-2">|</span>
                        <span>Color: {item.selectedColor}</span>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 text-sm mt-2 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="sm:text-center flex items-center sm:block">
                    <span className="sm:hidden font-medium mr-2">Price:</span>
                    ${item.product.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity */}
                  <div className="flex justify-start sm:justify-center items-center">
                    <div className="flex items-center">
                      <span className="sm:hidden font-medium mr-2">Quantity:</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-12 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="flex items-center justify-start sm:justify-end">
                    <span className="sm:hidden font-medium mr-2">Subtotal:</span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Link to="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  )}
                </span>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              {shipping > 0 && (
                <p className="text-sm text-gray-500 mb-4">
                  Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping.
                </p>
              )}
              
              <Button
                onClick={handleCheckout}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
