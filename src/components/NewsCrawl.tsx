
import { useState, useEffect } from "react";

const NewsCrawl = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // In a real app, this would come from a global state management system or API
  const [crawlNews] = useState([
    {
      text: "Stock markets hit record highs as tech sector surges 15%",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=50&h=50&fit=crop&crop=face"
    },
    {
      text: "Breaking: International climate agreement signed by 50 nations",
      image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=50&h=50&fit=crop&crop=face"
    },
    {
      text: "Scientists discover breakthrough cancer treatment with 95% success rate",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=50&h=50&fit=crop&crop=face"
    },
    {
      text: "Global supply chain issues show signs of improvement in Q4",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    {
      text: "Revolutionary AI technology promises to transform healthcare industry",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=50&h=50&fit=crop&crop=face"
    }
  ]);

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
                <div key={index} className="w-full flex-shrink-0 flex items-center space-x-3">
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
