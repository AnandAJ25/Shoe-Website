
// import { useState, useEffect } from 'react';
// // import Navbar from '../components/Navbar';
// // import NewsGrid from '../components/NewsGrid';
// // import Footer from '../components/Footer';
// import { NewsCategory } from '../hooks/useNewsApi';

// const Index = () => {
//   const [currentCategory, setCurrentCategory] = useState<NewsCategory>('general');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     // Check if user has dark mode preference saved
//     const savedMode = localStorage.getItem('darkMode');
//     return savedMode ? savedMode === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });

//   useEffect(() => {
//     // Apply dark mode to document body
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
    
//     // Save preference to localStorage
//     localStorage.setItem('darkMode', isDarkMode.toString());
//   }, [isDarkMode]);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleCategoryChange = (category: NewsCategory) => {
//     setCurrentCategory(category);
//     setSearchQuery('');
//   };

//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
//       <Navbar 
//         currentCategory={currentCategory}
//         onCategoryChange={handleCategoryChange}
//         onSearch={handleSearch}
//         isDarkMode={isDarkMode}
//         toggleDarkMode={toggleDarkMode}
//       />
      
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <header className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">
//             {searchQuery ? `Search Results: ${searchQuery}` : `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} News`}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             {searchQuery 
//               ? `Showing latest news for "${searchQuery}"`
//               : `Stay updated with the latest ${currentCategory} news from around the world`
//             }
//           </p>
//         </header>
        
//         <NewsGrid 
//           category={currentCategory}
//           searchQuery={searchQuery}
//         />
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default Index;
