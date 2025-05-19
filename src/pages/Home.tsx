
import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../data/products';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div className="space-y-16 ">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <img 
            src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
            alt="Shoe collection background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Step Into Style</h1>
            <p className="text-xl md:text-2xl mb-8">Discover premium footwear designed for comfort, performance, and style.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white text-purple-700 hover:bg-gray-100">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-purple-600 font-medium hover:text-purple-800">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <AspectRatio ratio={1 / 1}>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="object-cover w-full h-full" 
                  />
                </AspectRatio>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-500 mb-2">{product.brand}</p>
                  <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products?category=Running" className="group">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
                  alt="Running shoes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">Running</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Lifestyle" className="group">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77" 
                  alt="Lifestyle shoes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">Lifestyle</h3>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Basketball" className="group">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556906781-9a412961c28c" 
                  alt="Basketball shoes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold">Basketball</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose SoleStyle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Authentic Products</h3>
            <p className="text-gray-600">All our products are 100% authentic and sourced directly from authorized retailers and brands.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
            <p className="text-gray-600">Enjoy free shipping on all orders above $100. Fast and reliable delivery to your doorstep.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">30-Day Returns</h3>
            <p className="text-gray-600">Not satisfied? Return within 30 days for a full refund. No questions asked.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
