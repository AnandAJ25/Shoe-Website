
// import { useState } from 'react';
// import { NewsArticle } from '../hooks/useNewsApi';
// import { ThumbsUp, ThumbsDown } from 'lucide-react';
// import { AspectRatio } from './ui/aspect-ratio';

// interface NewsCardProps {
//   article: NewsArticle;
// }

// const NewsCard = ({ article }: NewsCardProps) => {
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
  
//   const handleLike = () => {
//     setLikes(likes + 1);
//   };
  
//   const handleDislike = () => {
//     setDislikes(dislikes + 1);
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
//       <div className="relative w-full">
//         <AspectRatio ratio={16/9}>
//           {article.urlToImage ? (
//             <img 
//               src={article.urlToImage} 
//               alt={article.title}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 // Fallback image if the original fails to load
//                 (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=300';
//               }} 
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
//               <span className="text-gray-500 dark:text-gray-400">No Image</span>
//             </div>
//           )}
//         </AspectRatio>
//       </div>
      
//       <div className="p-4 flex-grow flex flex-col">
//         <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">{article.title}</h3>
        
//         <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
//           <span>{article.source.name}</span>
//           <span className="mx-2">•</span>
//           <span>{formatDate(article.publishedAt)}</span>
//         </div>
        
//         <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
//           {article.description || "No description available"}
//         </p>
        
//         <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
//           <a 
//             href={article.url} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
//           >
//             Read more
//           </a>
          
//           <div className="flex items-center space-x-3">
//             <button 
//               onClick={handleLike}
//               className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
//             >
//               <ThumbsUp size={18} />
//               <span>{likes}</span>
//             </button>
            
//             <button 
//               onClick={handleDislike}
//               className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
//             >
//               <ThumbsDown size={18} />
//               <span>{dislikes}</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsCard;
