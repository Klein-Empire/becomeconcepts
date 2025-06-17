
import { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";

interface Ad {
  id: number;
  title: string;
  description: string;
  image?: string;
  video?: string;
  link: string;
  type: 'banner' | 'sidebar' | 'inline';
  isActive: boolean;
}

interface AdvertisementProps {
  type: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

const Advertisement = ({ type, className = "" }: AdvertisementProps) => {
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 1,
      title: "Professional Web Development",
      description: "Build your dream website with our expert team",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop",
      link: "https://example.com",
      type: 'banner',
      isActive: true
    },
    {
      id: 2,
      title: "Learn Digital Marketing",
      description: "Master the art of digital marketing",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=250&fit=crop",
      link: "https://example.com",
      type: 'sidebar',
      isActive: true
    },
    {
      id: 3,
      title: "Investment Opportunities",
      description: "Grow your wealth with smart investments",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      link: "https://example.com",
      type: 'inline',
      isActive: true
    }
  ]);

  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const filteredAds = ads.filter(ad => ad.type === type && ad.isActive);

  useEffect(() => {
    if (filteredAds.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % filteredAds.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [filteredAds.length]);

  if (!isVisible || filteredAds.length === 0) {
    return null;
  }

  const currentAd = filteredAds[currentAdIndex];

  const getAdStyles = () => {
    switch (type) {
      case 'banner':
        return "w-full h-32 md:h-40";
      case 'sidebar':
        return "w-full h-64";
      case 'inline':
        return "w-full h-48 md:h-56";
      default:
        return "w-full h-32";
    }
  };

  return (
    <div className={`relative bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 overflow-hidden shadow-lg ${className}`}>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800 rounded-full p-1 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="absolute top-2 left-2 z-10">
        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
          Advertisement
        </span>
      </div>

      <a
        href={currentAd.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className={`relative ${getAdStyles()}`}>
          {currentAd.video ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={currentAd.video} type="video/mp4" />
            </video>
          ) : currentAd.image ? (
            <img
              src={currentAd.image}
              alt={currentAd.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="font-bold text-lg mb-1">{currentAd.title}</h3>
                <p className="text-sm opacity-90">{currentAd.description}</p>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-bold text-lg mb-1">{currentAd.title}</h3>
              <p className="text-sm opacity-90 mb-2">{currentAd.description}</p>
              <div className="flex items-center text-sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                Learn More
              </div>
            </div>
          </div>
        </div>
      </a>

      {filteredAds.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {filteredAds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAdIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentAdIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Advertisement;
