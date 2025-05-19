
import React from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../data/products';
import { Button } from '@/components/ui/button';

const Categories = () => {
  const allCategories = getAllCategories();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Shop by Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allCategories.map(category => (
          <Link to={`/products?category=${category}`} key={category} className="group">
            <div className="relative h-80 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
              <img 
                src={getCategoryImage(category)} 
                alt={`${category} shoes`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold">{category}</h3>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button>Shop {category}</Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Helper function to get category images
const getCategoryImage = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'running':
      return "https://images.unsplash.com/photo-1542291026-7eec264c27ff";
    case 'lifestyle':
      return "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77";
    case 'basketball':
      return "https://images.unsplash.com/photo-1556906781-9a412961c28c";
    case 'training':
      return "https://images.unsplash.com/photo-1605408499391-6368c628ef42";
    case 'soccer':
      return "https://images.unsplash.com/photo-1514125669375-59ee3985d08b";
    default:
      return "https://images.unsplash.com/photo-1491553895911-0055eca6402d";
  }
};

export default Categories;
