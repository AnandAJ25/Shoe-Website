
// import { useState, useEffect } from 'react';
// import { Search, Sun, Moon } from 'lucide-react';
// import { NewsCategory } from '../hooks/useNewsApi';

// interface NavbarProps {
//   currentCategory: NewsCategory;
//   onCategoryChange: (category: NewsCategory) => void;
//   onSearch: (query: string) => void;
//   isDarkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const Navbar = ({ 
//   currentCategory, 
//   onCategoryChange, 
//   onSearch,
//   isDarkMode,
//   toggleDarkMode
// }: NavbarProps) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//   const categories: { id: NewsCategory; label: string }[] = [
//     { id: 'general', label: 'General' },
//     { id: 'business', label: 'Business' },
//     { id: 'entertainment', label: 'Entertainment' },
//     { id: 'health', label: 'Health' },
//     { id: 'science', label: 'Science' },
//     { id: 'sports', label: 'Sports' },
//     { id: 'technology', label: 'Technology' }
//   ];
  
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSearch(searchQuery);
//   };
  
//   return (
//     <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-10">
//       {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">NewsMania</span>
//           </div>
          
//           <div className="hidden md:block">
//             <div className="flex items-center space-x-4">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => onCategoryChange(category.id)}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                     currentCategory === category.id
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//                   }`}
//                 >
//                   {category.label}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             <form onSubmit={handleSubmit} className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search news..."
//                 className="w-48 sm:w-64 py-1.5 pl-3 pr-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
//               >
//                 <Search size={18} />
//               </button>
//             </form>
            
//             <button 
//               onClick={toggleDarkMode}
//               className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//               aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//             >
//               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>
            
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
//                 aria-label="Menu"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {isMenuOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden py-2 px-4 bg-white dark:bg-gray-900 shadow-inner">
//           <div className="flex flex-col space-y-2">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => {
//                   onCategoryChange(category.id);
//                   setIsMenuOpen(false);
//                 }}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   currentCategory === category.id
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
//                 }`}
//               >
//                 {category.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
