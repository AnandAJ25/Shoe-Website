
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  // Get product details
  const product = id ? getProductById(id) : undefined;
  
  // States for selection
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };
  
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-auto object-contain aspect-square" 
            />
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                onClick={() => setMainImage(image)}
                className={`w-20 h-20 bg-gray-50 rounded-lg overflow-hidden cursor-pointer ${mainImage === image ? 'ring-2 ring-purple-600' : ''}`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-1">{product.brand}</p>
          </div>
          
          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          {/* Select Size */}
          <div>
            <h3 className="text-lg font-medium mb-2">Select Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map(size => (
                <Button 
                  key={size}
                  type="button"
                  variant={selectedSize === size ? "default" : "outline"}
                  className={selectedSize === size ? "bg-purple-600" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Select Color */}
          <div>
            <h3 className="text-lg font-medium mb-2">Select Color</h3>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`h-10 px-4 rounded-md border flex items-center justify-center ${
                    selectedColor === color 
                      ? 'border-purple-600 bg-purple-50 text-purple-600 font-medium' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div>
            <h3 className="text-lg font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full md:w-auto px-12 bg-purple-600 hover:bg-purple-700"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
