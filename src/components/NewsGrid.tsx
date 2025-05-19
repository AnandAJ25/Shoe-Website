// import { useEffect, useState } from 'react';
// import NewsCard from './NewsCard';
// import { useNewsApi, NewsCategory } from '../hooks/useNewsApi';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// interface NewsGridProps {
//   category: NewsCategory;
//   searchQuery: string;
// }

// const NewsGrid = ({ category, searchQuery }: NewsGridProps) => {
//   const { news, loading, error, fetchNews, totalResults } = useNewsApi();
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 40;
  
//   useEffect(() => {
//     fetchNews(category, currentPage, itemsPerPage, searchQuery);
    
//     if (searchQuery || category) {
//       setCurrentPage(1);
//     }
//   }, [category, searchQuery]);

//   useEffect(() => {
//     fetchNews(category, currentPage, itemsPerPage, searchQuery);
//   }, [currentPage]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-red-500 mb-4">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//           </svg>
//         </div>
//         <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Error Loading News</h3>
//         <p className="text-gray-600 dark:text-gray-400">{error}</p>
//         <button 
//           onClick={() => fetchNews(category, currentPage, itemsPerPage, searchQuery)}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (news.length === 0) {
//     return (
//       <div className="text-center py-10">
//         <div className="text-gray-500 mb-4">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//           </svg>
//         </div>
//         <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">No News Found</h3>
//         <p className="text-gray-600 dark:text-gray-400">Try a different category or search term</p>
//       </div>
//     );
//   }

//   const totalPages = Math.ceil(totalResults / itemsPerPage);
  
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
    
//     if (totalPages <= maxPagesToShow) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       pageNumbers.push(1);
      
//       let startPage = Math.max(2, currentPage - 1);
//       let endPage = Math.min(totalPages - 1, currentPage + 1);
      
//       if (currentPage <= 2) {
//         endPage = 4;
//       } else if (currentPage >= totalPages - 1) {
//         startPage = totalPages - 3;
//       }
      
//       if (startPage > 2) {
//         pageNumbers.push('...');
//       }
      
//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//       }
      
//       if (endPage < totalPages - 1) {
//         pageNumbers.push('...');
//       }
      
//       if (totalPages > 1) {
//         pageNumbers.push(totalPages);
//       }
//     }
    
//     return pageNumbers;
//   };

//   const handlePageChange = (page: number) => {
//     if (page !== currentPage) {
//       setCurrentPage(page);
//       window.scrollTo(0, 0);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {news.map((article, index) => (
//           <NewsCard key={`${article.title}-${index}-${currentPage}`} article={article} />
//         ))}
//       </div>
      
//       {totalPages > 1 && (
//         <Pagination>
//           <PaginationContent>
//             {currentPage > 1 && (
//               <PaginationItem>
//                 <PaginationPrevious 
//                   href="#" 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handlePageChange(currentPage - 1);
//                   }}
//                 />
//               </PaginationItem>
//             )}
            
//             {getPageNumbers().map((page, index) => (
//               <PaginationItem key={index}>
//                 {page === '...' ? (
//                   <span className="px-4 py-2">...</span>
//                 ) : (
//                   <PaginationLink 
//                     href="#" 
//                     isActive={page === currentPage}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       if (typeof page === 'number') {
//                         handlePageChange(page);
//                       }
//                     }}
//                   >
//                     {page}
//                   </PaginationLink>
//                 )}
//               </PaginationItem>
//             ))}
            
//             {currentPage < totalPages && (
//               <PaginationItem>
//                 <PaginationNext 
//                   href="#" 
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handlePageChange(currentPage + 1);
//                   }}
//                 />
//               </PaginationItem>
//             )}
//           </PaginationContent>
//         </Pagination>
//       )}
//     </div>
//   );
// };

// export default NewsGrid;
