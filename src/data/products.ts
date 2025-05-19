
import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Air Max Pulse',
    brand: 'Nike',
    price: 149.99,
    sizes: [7, 8, 9, 10, 11],
    colors: ['Black', 'White', 'Red'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
    ],
    description: 'Legendary Air cushioning with modern updates. The Air Max Pulse delivers comfort and style in a sleek package.',
    featured: true,
    category: 'Running',
  },
  {
    id: '2',
    name: 'Ultra Boost 22',
    brand: 'Adidas',
    price: 189.99,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ['Black', 'White', 'Blue'],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb',
    ],
    description: 'Experience incredible energy return with every step. The Ultra Boost 22 features responsive Boost cushioning and a supportive fit.',
    featured: true,
    category: 'Running',
  },
  {
    id: '3',
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 79.99,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['White', 'Black', 'Beige'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
      'https://images.unsplash.com/photo-1604671801908-6f0c6a092c05',
    ],
    description: 'A timeless silhouette with premium leather and exceptional comfort. The Classic Leather stands as an iconic casual shoe.',
    featured: false,
    category: 'Lifestyle',
  },
  {
    id: '4',
    name: 'Old Skool',
    brand: 'Vans',
    price: 69.99,
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['Black/White', 'Navy', 'Burgundy'],
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
    ],
    description: 'The iconic side stripe shoe that has defined generations of skate style. Durable canvas and suede construction for lasting wear.',
    featured: false,
    category: 'Skateboarding',
  },
  {
    id: '5',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 59.99,
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    colors: ['Black', 'White', 'Red', 'Navy'],
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
      'https://images.unsplash.com/photo-1463100099107-aa0980c362e6',
    ],
    description: 'The original basketball shoe that became a cultural icon. Timeless canvas upper with the signature rubber toe cap.',
    featured: true,
    category: 'Lifestyle',
  },
  {
    id: '6',
    name: 'Jordan 1 Retro High',
    brand: 'Nike',
    price: 179.99,
    sizes: [8, 9, 10, 11, 12],
    colors: ['Red/Black', 'Blue/White', 'Chicago'],
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c',
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634',
    ],
    description: 'The shoe that started it all. The Air Jordan 1 High features premium materials and the iconic silhouette that changed basketball forever.',
    featured: true,
    category: 'Basketball',
  },
  {
    id: '7',
    name: 'Suede Classic',
    brand: 'Puma',
    price: 69.99,
    sizes: [7, 8, 9, 10, 11],
    colors: ['Blue', 'Red', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42',
    ],
    description: 'A street style legend since 1968. The Suede Classic features a soft suede upper and the iconic formstrip design.',
    featured: false,
    category: 'Lifestyle',
  },
  {
    id: '8',
    name: 'Gel-Kayano 28',
    brand: 'ASICS',
    price: 159.99,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Black/Blue', 'White/Silver', 'Grey/Orange'],
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
      'https://images.unsplash.com/photo-1539185441755-769473a23570',
    ],
    description: 'Premium stability and cushioning for long-distance runners. Features GEL® technology and DYNAMIC DUOMAX® support system.',
    featured: false,
    category: 'Running',
  },
  {
    id: '9',
    name: 'Fresh Foam 1080v11',
    brand: 'New Balance',
    price: 149.99,
    sizes: [8, 9, 10, 11],
    colors: ['Black', 'White', 'Blue'],
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570',
      'https://images.unsplash.com/photo-1605408499391-6368c628ef42',
    ],
    description: 'Plush cushioning meets responsive performance in this premium running shoe. The Fresh Foam midsole delivers an ultra-cushioned ride.',
    featured: true,
    category: 'Running',
  },
  {
    id: '10',
    name: 'Stan Smith',
    brand: 'Adidas',
    price: 89.99,
    sizes: [6, 7, 8, 9, 10, 11, 12],
    colors: ['White/Green', 'White/Navy', 'White/Red'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
    ],
    description: 'A tennis legend turned cultural icon. The Stan Smith features a clean leather upper with perforated 3-Stripes and a pop of color on the heel.',
    featured: false,
    category: 'Lifestyle',
  },
  {
    id: '11',
    name: 'Dunk Low',
    brand: 'Nike',
    price: 109.99,
    sizes: [8, 9, 10, 11],
    colors: ['University Blue', 'Black/White', 'Green/Yellow'],
    images: [
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
    ],
    description: 'Originally a basketball shoe, now a streetwear staple. The Nike Dunk Low returns with classic details and throwback hoops style.',
    featured: true,
    category: 'Lifestyle',
  },
  {
    id: '12',
    name: 'Speedcross 5',
    brand: 'Salomon',
    price: 129.99,
    sizes: [7, 8, 9, 10, 11, 12],
    colors: ['Black', 'Blue/Green', 'Red/Orange'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1584735175315-9d5df23be2c8',
    ],
    description: 'The ultimate trail running shoe for technical terrain. Features aggressive grip, precise foothold, and lightweight protection.',
    featured: false,
    category: 'Trail Running',
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getFilteredProducts = (
  searchTerm: string = '',
  brand: string[] = [],
  priceRange: [number, number] = [0, Infinity],
  sizes: number[] = [],
  category: string[] = []
): Product[] => {
  return products.filter(product => {
    // Search term filter
    const matchesSearch = searchTerm ? 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) : 
      true;
    
    // Brand filter
    const matchesBrand = brand.length > 0 ? brand.includes(product.brand) : true;
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Size filter
    const matchesSize = sizes.length > 0 ? 
      sizes.some(size => product.sizes.includes(size)) : true;
      
    // Category filter
    const matchesCategory = category.length > 0 ? category.includes(product.category) : true;
    
    return matchesSearch && matchesBrand && matchesPrice && matchesSize && matchesCategory;
  });
};

export const getAllBrands = (): string[] => {
  const brandsSet = new Set(products.map(product => product.brand));
  return Array.from(brandsSet);
};

export const getAllCategories = (): string[] => {
  const categoriesSet = new Set(products.map(product => product.category));
  return Array.from(categoriesSet);
};

export const getAllSizes = (): number[] => {
  const sizesSet = new Set<number>();
  products.forEach(product => {
    product.sizes.forEach(size => sizesSet.add(size));
  });
  return Array.from(sizesSet).sort((a, b) => a - b);
};
