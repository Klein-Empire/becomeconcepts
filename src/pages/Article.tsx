
import { useParams, Link } from "react-router-dom";
import { Clock, User, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";
import Advertisement from "@/components/Advertisement";

const Article = () => {
  const { id } = useParams();
  
  // Mock article data - in a real app this would come from an API
  const article = {
    id: parseInt(id || "1"),
    title: "Major Technology Breakthrough Changes Industry Standards",
    content: `
      <p>Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide. This groundbreaking development represents a significant milestone in technological advancement.</p>
      
      <p>The breakthrough, announced earlier today, has already garnered attention from major industry leaders and technology companies. According to preliminary reports, this innovation could reduce operational costs by up to 40% while improving efficiency across multiple sectors.</p>
      
      <p>Dr. Sarah Johnson, a leading technology analyst, commented: "This development represents a paradigm shift in how we approach digital transformation. The implications for businesses and consumers alike are profound."</p>
      
      <p>Key benefits of this new technology include:</p>
      <ul>
        <li>Enhanced processing capabilities</li>
        <li>Improved energy efficiency</li>
        <li>Reduced environmental impact</li>
        <li>Lower implementation costs</li>
      </ul>
      
      <p>The technology is expected to be rolled out across various industries over the next 18 months, with early adopters already reporting positive preliminary results.</p>
    `,
    excerpt: "Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide.",
    category: "Technology",
    author: "Michael Chen",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    comments: 24
  };

  const relatedArticles = [
    {
      id: 2,
      title: "Global Markets Show Strong Recovery Signs",
      category: "Business",
      time: "3 hours ago"
    },
    {
      id: 3,
      title: "Climate Summit Reaches Historic Agreement",
      category: "World",
      time: "5 hours ago"
    },
    {
      id: 4,
      title: "Revolutionary AI Tool Transforms Healthcare",
      category: "Tech",
      time: "6 hours ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 text-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center text-slate-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.time}
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-purple-100">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-600 font-medium">By {article.author}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-sky-200 text-sky-600 hover:bg-sky-50">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover rounded-2xl mb-8 shadow-lg"
            />
            
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-purple-100">
              <div 
                className="prose prose-lg max-w-none prose-purple"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            {/* Inline Advertisement */}
            <div className="mb-8">
              <Advertisement type="inline" />
            </div>
            
            <Comments articleId={article.id} />
            
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link 
                    key={related.id} 
                    to={`/article/${related.id}`}
                    className="block bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-purple-100"
                  >
                    <span className="text-xs font-medium text-purple-600 mb-2 block">
                      {related.category}
                    </span>
                    <h4 className="font-semibold text-slate-900 mb-2 hover:text-purple-600 transition-colors">
                      {related.title}
                    </h4>
                    <span className="text-sm text-slate-500">{related.time}</span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Advertisement type="sidebar" />
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
                <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                  Trending Now
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((article, index) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="block group"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <span className="text-xs text-gray-500">{article.time}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Article;
