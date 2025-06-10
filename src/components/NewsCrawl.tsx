
import { useState, useEffect } from "react";

const NewsCrawl = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const crawlNews = [
    "Stock markets hit record highs as tech sector surges 15%",
    "Breaking: International climate agreement signed by 50 nations",
    "Scientists discover breakthrough cancer treatment with 95% success rate",
    "Major cryptocurrency exchange announces new regulatory compliance measures",
    "Global supply chain issues show signs of improvement in Q4",
    "Revolutionary AI technology promises to transform healthcare industry"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % crawlNews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [crawlNews.length]);

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-2 overflow-hidden shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-white text-red-600 px-3 py-1 text-xs font-bold rounded mr-4 animate-pulse">
            LIVE
          </div>
          <div className="flex-1 relative h-6 overflow-hidden">
            <div 
              className="absolute inset-0 flex items-center transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {crawlNews.map((news, index) => (
                <div key={index} className="w-full flex-shrink-0 text-sm font-medium">
                  {news}
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
