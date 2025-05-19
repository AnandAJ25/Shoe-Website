
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getFilteredProducts, getAllBrands, getAllCategories, getAllSizes } from '../data/products';
import { Product } from '../types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Filter } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get all available filter options
  const allBrands = getAllBrands();
  const allCategories = getAllCategories();
  const allSizes = getAllSizes();
  
  // Handle URL params on initial load and when they change
  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('q');
    
    // Set states based on URL parameters
    const newCategories = category ? [category] : [];
    const newBrands = brand ? [brand] : [];
    const newSearch = search || '';
    
    setSelectedCategories(newCategories);
    setSelectedBrands(newBrands);
    setSearchTerm(newSearch);
    
    // Apply filters
    applyFilters(
      newSearch,
      newBrands,
      [0, 1000],
      [],
      newCategories
    );
  }, [searchParams]);
  
  // Apply filters function
  const applyFilters = (
    search: string = searchTerm,
    brands: string[] = selectedBrands,
    price: [number, number] = priceRange,
    sizes: number[] = selectedSizes,
    categories: string[] = selectedCategories
  ) => {
    const filtered = getFilteredProducts(search, brands, price, sizes, categories);
    setProducts(filtered);
    
    // Update URL params
    const params = new URLSearchParams();
    
    if (search) params.set('q', search);
    if (brands.length === 1) params.set('brand', brands[0]);
    if (categories.length === 1) params.set('category', categories[0]);
    
    setSearchParams(params);
  };
  
  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
      
    setSelectedBrands(newSelectedBrands);
    applyFilters(searchTerm, newSelectedBrands, priceRange, selectedSizes, selectedCategories);
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
      
    setSelectedCategories(newSelectedCategories);
    applyFilters(searchTerm, selectedBrands, priceRange, selectedSizes, newSelectedCategories);
  };
  
  // Handle size selection
  const handleSizeChange = (size: number) => {
    const newSelectedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
      
    setSelectedSizes(newSelectedSizes);
    applyFilters(searchTerm, selectedBrands, priceRange, newSelectedSizes, selectedCategories);
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(searchTerm, selectedBrands, priceRange, selectedSizes, selectedCategories);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, 1000]);
    setSearchTerm('');
    applyFilters('', [], [0, 1000], [], []);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Shoes</h1>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="md:hidden flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-medium mb-4">Search</h3>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search shoes..."
                  className="flex-grow w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button type="submit" size="sm">
                  Go
                </Button>
              </form>
            </div>
            
            {/* Brand Filter */}
            <div>
              <h3 className="font-medium mb-4">Brand</h3>
              <div className="space-y-2">
                {allBrands.map(brand => (
                  <div className="flex items-center" key={brand}>
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-600 cursor-pointer">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <h3 className="font-medium mb-4">Category</h3>
              <div className="space-y-2">
                {allCategories.map(category => (
                  <div className="flex items-center" key={category}>
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-600 cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Size Filter */}
            <div>
              <h3 className="font-medium mb-4">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    className={`text-sm ${selectedSizes.includes(size) ? 'bg-purple-600' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Reset Filters */}
            <Button
              onClick={resetFilters}
              variant="outline"
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </aside>
        
        {/* Products Grid */}
        <div className="flex-grow">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
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
                      <p className="font-bold">${product.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
              <Button onClick={resetFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
