
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-123456',
    date: '2023-05-15',
    status: 'Delivered',
    total: 249.97,
    items: [
      {
        id: '1',
        name: 'Air Max Pulse',
        quantity: 1,
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
      },
      {
        id: '5',
        name: 'Chuck Taylor All Star',
        quantity: 1,
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3'
      },
      {
        id: '3',
        name: 'Classic Leather',
        quantity: 1,
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a'
      }
    ]
  },
  {
    id: 'ORD-789012',
    date: '2023-04-28',
    status: 'Shipped',
    total: 189.99,
    items: [
      {
        id: '2',
        name: 'Ultra Boost 22',
        quantity: 1,
        price: 189.99,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5'
      }
    ]
  }
];

const Orders = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Sign In to View Orders</h2>
          <p className="text-gray-600 mb-8">
            Please sign in to view your order history.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/order/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium mb-4">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded overflow-hidden shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders;
