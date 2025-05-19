
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const OrderConfirmation = () => {
  // Generate a random order number
  const orderNumber = `SOL-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is now being processed.
        </p>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-medium">
                {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            We've sent a confirmation email with details of your order.
            You can track your order status in your account.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link to="/orders">View My Orders</Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
