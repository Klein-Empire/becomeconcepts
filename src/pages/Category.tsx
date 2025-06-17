
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  media: Array<{ url: string; type: string }>;
  date: string;
  author: string;
}

const Category = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategoryArticles = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        const q = query(
          collection(db, 'news'),
          where('category', '==', category.charAt(0).toUpperCase() + category.slice(1)),
          where('status', '==', 'published')
        );
        const querySnapshot = await getDocs(q);
        const fetchedArticles = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Article[];
        
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Fallback to dummy data
        setArticles([
          {
            id: '1',
            title: `Latest ${category} News`,
            excerpt: "Stay updated with the latest developments in this category.",
            category: category || '',
            media: [{ url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop", type: "image" }],
            date: new Date().toISOString().split('T')[0],
            author: "NewsDaily Team"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryArticles();
  }, [category]);

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
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-bold text-slate-900 capitalize">
            {category} News
          </h1>
          <p className="text-slate-600 mt-2">
            Latest updates and stories from {category}
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading articles...</div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">There are currently no published articles in the {category} category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                key={article.id}
                to={`/article/${article.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden block"
              >
                {article.media && article.media.length > 0 && (
                  <img
                    src={article.media[0].url}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {getTimeAgo(article.date)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">By {article.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Category;
