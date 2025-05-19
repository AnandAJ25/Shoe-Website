
import { useState } from 'react';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export type NewsCategory = 'general' | 'business' | 'entertainment' | 'health' | 'science' | 'sports' | 'technology';

// Array of diverse image URLs for mock news
const mockImages = [
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&h=300',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&h=300'
];

// Generate a random date in the last 7 days
const getRandomDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 7));
  return date.toISOString();
};

// Generate a random word from a list
const getRandomWord = (wordList: string[]) => {
  return wordList[Math.floor(Math.random() * wordList.length)];
};

// Generate mock news data based on category
const generateMockNews = (category: NewsCategory, page: number = 1, pageSize: number = 40, query: string = ''): NewsArticle[] => {
  const sourceNames = ['Daily News', 'Tech Today', 'Global Herald', 'Science Weekly', 'Sports Chronicle', 'Entertainment Now', 'Health Digest', 'Business Insider'];
  const authorFirstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Jennifer', 'Robert', 'Lisa', 'William', 'Olivia'];
  const authorLastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'White'];
  
  // Topic-specific words for each category
  const categorySpecificWords: Record<NewsCategory, { topics: string[], verbs: string[], adjectives: string[] }> = {
    general: {
      topics: ['Community', 'Event', 'Government', 'Society', 'World', 'Election', 'Policy', 'Law', 'Development', 'Crisis'],
      verbs: ['Announces', 'Reports', 'Confirms', 'Reveals', 'Launches', 'Investigates', 'Examines', 'Plans'],
      adjectives: ['Major', 'Breaking', 'Historic', 'Controversial', 'Unexpected', 'Important', 'Critical', 'Nationwide']
    },
    business: {
      topics: ['Market', 'Stock', 'Economy', 'Company', 'Startup', 'Investment', 'Industry', 'Trade', 'Finance', 'CEO'],
      verbs: ['Acquires', 'Launches', 'Reports', 'Announces', 'Invests', 'Expands', 'Partners', 'Forecasts'],
      adjectives: ['Record-Breaking', 'Profitable', 'Strategic', 'Revolutionary', 'Innovative', 'Global', 'Market-Leading']
    },
    entertainment: {
      topics: ['Movie', 'Celebrity', 'Film', 'Music', 'TV Show', 'Award', 'Concert', 'Album', 'Actor', 'Festival'],
      verbs: ['Stars', 'Releases', 'Announces', 'Reveals', 'Performs', 'Wins', 'Premieres', 'Launches'],
      adjectives: ['Blockbuster', 'Hit', 'Award-Winning', 'Acclaimed', 'Popular', 'Trending', 'Viral', 'Sensational']
    },
    health: {
      topics: ['Study', 'Research', 'Treatment', 'Medicine', 'Vaccine', 'Disease', 'Fitness', 'Nutrition', 'Mental Health', 'Healthcare'],
      verbs: ['Discovers', 'Confirms', 'Reveals', 'Develops', 'Improves', 'Treats', 'Prevents', 'Recommends'],
      adjectives: ['Breakthrough', 'Lifesaving', 'Groundbreaking', 'Effective', 'Promising', 'Revolutionary', 'Essential']
    },
    science: {
      topics: ['Research', 'Discovery', 'Innovation', 'Technology', 'Space', 'Climate', 'AI', 'Robotics', 'Experiment', 'Theory'],
      verbs: ['Discovers', 'Develops', 'Reveals', 'Explains', 'Explores', 'Creates', 'Invents', 'Analyzes'],
      adjectives: ['Groundbreaking', 'Revolutionary', 'Historic', 'Scientific', 'Advanced', 'Futuristic', 'Cutting-Edge']
    },
    sports: {
      topics: ['Team', 'Player', 'Match', 'Tournament', 'Championship', 'League', 'Olympics', 'World Cup', 'Record', 'Season'],
      verbs: ['Wins', 'Defeats', 'Signs', 'Announces', 'Scores', 'Dominates', 'Leads', 'Secures'],
      adjectives: ['Record-Breaking', 'Stunning', 'Historic', 'Dramatic', 'Impressive', 'Championship', 'Victorious']
    },
    technology: {
      topics: ['AI', 'Software', 'Hardware', 'App', 'Device', 'Startup', 'Cybersecurity', 'Innovation', 'Data', 'Cloud'],
      verbs: ['Launches', 'Develops', 'Introduces', 'Reveals', 'Updates', 'Creates', 'Designs', 'Transforms'],
      adjectives: ['Cutting-Edge', 'Revolutionary', 'Smart', 'Advanced', 'Innovative', 'Futuristic', 'Next-Generation']
    }
  };
  
  const words = categorySpecificWords[category];
  
  // Generate 150 unique mock articles
  const totalArticles = 150;
  const allArticles: NewsArticle[] = [];
  
  for (let i = 0; i < totalArticles; i++) {
    const topicWord = getRandomWord(words.topics);
    const verbWord = getRandomWord(words.verbs);
    const adjWord = getRandomWord(words.adjectives);
    
    // Create varied titles and descriptions
    const title = `${adjWord} ${topicWord} ${verbWord} New ${category.charAt(0).toUpperCase() + category.slice(1)} Initiative`;
    const description = `A ${adjWord.toLowerCase()} development in the ${category} sector has emerged as ${getRandomWord(sourceNames)} ${verbWord.toLowerCase()} groundbreaking changes to how we understand ${topicWord.toLowerCase()}s.`;
    
    allArticles.push({
      source: {
        id: `source-${i}`,
        name: getRandomWord(sourceNames)
      },
      author: `${getRandomWord(authorFirstNames)} ${getRandomWord(authorLastNames)}`,
      title,
      description,
      url: 'https://example.com/news/' + i,
      urlToImage: mockImages[i % mockImages.length], // Cycle through available images
      publishedAt: getRandomDate(),
      content: `${description} This article discusses the implications and future prospects of this development.`
    });
  }
  
  // Filter based on search query if provided
  let filteredArticles = allArticles;
  if (query) {
    const queryLower = query.toLowerCase();
    filteredArticles = allArticles.filter(article => 
      article.title.toLowerCase().includes(queryLower) || 
      (article.description && article.description.toLowerCase().includes(queryLower))
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  return paginatedArticles;
};

export const useNewsApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [totalResults, setTotalResults] = useState<number>(150); // Default to 150 mock articles
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('newsApiKey') || 'mock-api-key');

  const saveApiKey = (key: string) => {
    localStorage.setItem('newsApiKey', key);
    setApiKey(key);
  };

  const fetchNews = async (
    category: NewsCategory = 'general',
    page: number = 1,
    pageSize: number = 40,
    query: string = ''
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Generate mock news instead of fetching from API
      setTimeout(() => {
        const mockArticles = generateMockNews(category, page, pageSize, query);
        setNews(mockArticles);
        
        // Set total results based on filtering
        if (query) {
          const allMockArticles = generateMockNews(category, 1, 150, query);
          setTotalResults(allMockArticles.length);
        } else {
          setTotalResults(150); // Default total
        }
        
        setLoading(false);
      }, 800); // Add a small delay to simulate network request
    } catch (err: any) {
      console.error('Mock News Error:', err);
      setError('Failed to generate news data');
      setLoading(false);
    }
  };

  return { news, loading, error, totalResults, fetchNews, apiKey, saveApiKey };
};
