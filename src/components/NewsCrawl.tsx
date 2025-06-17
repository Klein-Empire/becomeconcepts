
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/firebase";

interface NewsCrawlItem {
  id: string;
  text: string;
  image: string;
  isActive: boolean;
  order: number;
}

const NewsCrawl = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [crawlNews, setCrawlNews] = useState<NewsCrawlItem[]>([]);

  useEffect(() => {
    const fetchCrawlNews = async () => {
      try {
        const q = query(
          collection(db, 'newsCrawl'),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedNews = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsCrawlItem[];
        
        setCrawlNews(fetchedNews);
      } catch (error) {
        console.error("Error fetching news crawl:", error);
        // Fallback to dummy data
        setCrawlNews([
          {
            id: '1',
            text: "Stock markets hit record highs as tech sector surges 15%",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=50&h=50&fit=crop&crop=face",
            isActive: true,
            order: 1
          },
          {
            id: '2',
            text: "Breaking: International climate agreement signed by 50 nations",
            image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=50&h=50&fit=crop&crop=face",
            isActive: true,
            order: 2
          }
        ]);
      }
    };

    fetchCrawlNews();
  }, []);

  useEffect(() => {
    if (crawlNews.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % crawlNews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [crawlNews.length]);

  if (crawlNews.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-3 overflow-hidden shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-white text-purple-600 px-3 py-1 text-xs font-bold rounded mr-4 animate-pulse">
            LIVE
          </div>
          <div className="flex-1 relative h-8 overflow-hidden">
            <div 
              className="absolute inset-0 flex items-center transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {crawlNews.map((news, index) => (
                <div key={news.id} className="w-full flex-shrink-0 flex items-center space-x-3">
                  <img
                    src={news.image}
                    alt="News"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <span className="text-sm font-medium">{news.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCrawl;
