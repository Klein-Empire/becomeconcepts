
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  media: Array<{ url: string; type: string }>;
  date: string;
  author: string;
  featured: boolean;
}

const FeaturedNews = () => {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const q = query(
          collection(db, 'news'),
          where('status', '==', 'published'),
          where('featured', '==', true),
          orderBy('date', 'desc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        const fetchedArticles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Article[];
        
        setFeaturedArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching featured articles:", error);
        // Fallback to current Kenyan featured news
        setFeaturedArticles([
          {
            id: '2',
            title: "Kenya Signs Multi-Billion Dollar Trade Deal with UAE",
            excerpt: "The agreement is expected to boost bilateral trade by 40% and create thousands of jobs in both countries.",
            category: "Business",
            media: [{ url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop", type: "image" }],
            date: new Date().toISOString().split('T')[0],
            author: "John Kiprotich",
            featured: true
          },
          {
            id: '3',
            title: "Safaricom Launches 5G Network Across Major Kenyan Cities",
            excerpt: "The telecommunications giant expands its 5G coverage to Nairobi, Mombasa, Kisumu, and Nakuru.",
            category: "Tech",
            media: [{ url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop", type: "image" }],
            date: new Date().toISOString().split('T')[0],
            author: "Grace Wanjiru",
            featured: true
          },
          {
            id: '4',
            title: "Kenya's Coffee Exports Hit Record High in 2024",
            excerpt: "Farmers celebrate as international demand drives coffee prices to unprecedented levels.",
            category: "Agriculture",
            media: [{ url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", type: "image" }],
            date: new Date().toISOString().split('T')[0],
            author: "Peter Macharia",
            featured: true
          }
        ]);
      }
    };

    fetchFeaturedArticles();
  }, []);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const articleDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - articleDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent mb-2">
              Featured Stories
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          </div>
          <Link to="/category/all" className="text-indigo-600 hover:text-purple-600 font-semibold flex items-center group transition-colors duration-300">
            View All 
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Link key={article.id} to={`/article/${article.id}`} className="group">
              <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={article.media?.[0]?.url || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop"}
                    alt={article.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {getTimeAgo(article.date)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">By {article.author}</span>
                    <span className="text-indigo-600 hover:text-purple-600 font-semibold text-sm group-hover:underline">
                      Read More
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
