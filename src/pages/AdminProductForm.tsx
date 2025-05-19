
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../data/products';
import { Product } from '../types/product';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '../contexts/AuthContext';

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Get existing product or initialize new one
  const existingProduct = id ? getProductById(id) : null;
  
  const [formData, setFormData] = useState<Partial<Product>>(existingProduct || {
    name: '',
    brand: '',
    price: 0,
    sizes: [],
    colors: [],
    images: [''],
    description: '',
    featured: false,
    category: ''
  });
  
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  
  // Redirect if not admin
  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFeaturedChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };
  
  const handleSizeAdd = () => {
    const size = parseFloat(sizeInput);
    if (!isNaN(size) && !formData.sizes?.includes(size)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...(prev.sizes || []), size]
      }));
      setSizeInput('');
    }
  };
  
  const handleSizeRemove = (size: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes?.filter(s => s !== size) || []
    }));
  };
  
  const handleColorAdd = () => {
    if (colorInput && !formData.colors?.includes(colorInput)) {
      setFormData(prev => ({
        ...prev,
        colors: [...(prev.colors || []), colorInput]
      }));
      setColorInput('');
    }
  };
  
  const handleColorRemove = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors?.filter(c => c !== color) || []
    }));
  };
  
  const handleImageAdd = () => {
    if (imageInput && !formData.images?.includes(imageInput)) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageInput]
      }));
      setImageInput('');
    }
  };
  
  const handleImageRemove = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter(img => img !== image) || []
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    console.log("Product data to save:", formData);
    
    // Navigate back to admin page
    navigate('/admin');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {existingProduct ? 'Edit Product' : 'Add New Product'}
        </h1>
        <Button variant="outline" onClick={() => navigate('/admin')}>
          Cancel
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>Select a category</option>
                <option value="Running">Running</option>
                <option value="Basketball">Basketball</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Skateboarding">Skateboarding</option>
                <option value="Trail Running">Trail Running</option>
              </select>
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          
          {/* Featured */}
          <div className="flex items-center">
            <Checkbox
              id="featured"
              checked={!!formData.featured}
              onCheckedChange={handleFeaturedChange}
            />
            <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
              Featured Product
            </label>
          </div>
          
          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sizes
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.sizes?.map(size => (
                <div 
                  key={size} 
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{size}</span>
                  <button 
                    type="button" 
                    onClick={() => handleSizeRemove(size)}
                    className="text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                placeholder="Add size (e.g. 8.5)"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button type="button" onClick={handleSizeAdd} variant="outline">
                Add
              </Button>
            </div>
          </div>
          
          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colors
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.colors?.map(color => (
                <div 
                  key={color} 
                  className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  <span>{color}</span>
                  <button 
                    type="button" 
                    onClick={() => handleColorRemove(color)}
                    className="text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="Add color (e.g. Red, Blue)"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button type="button" onClick={handleColorAdd} variant="outline">
                Add
              </Button>
            </div>
          </div>
          
          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (URLs)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {formData.images?.map(image => (
                <div key={image} className="relative group">
                  <img 
                    src={image} 
                    alt="Product" 
                    className="w-full h-40 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(image)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Add image URL"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button type="button" onClick={handleImageAdd} variant="outline">
                Add
              </Button>
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <Button 
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 px-8"
            >
              {existingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
