
import { useParams, Link } from "react-router-dom";
import { Clock, User, ArrowLeft, Share2, Facebook, Twitter, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    image: "/placeholder.svg",
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
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded">
              {article.category}
            </span>
            <div className="flex items-center text-slate-500 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {article.time}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-slate-600">By {article.author}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-80 object-cover rounded-lg mb-8"
        />
        
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <div className="border-t border-slate-200 pt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-slate-500" />
              <span className="text-slate-600">{article.comments} Comments</span>
            </div>
            <Button>Leave a Comment</Button>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link 
                key={related.id} 
                to={`/article/${related.id}`}
                className="block bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors"
              >
                <span className="text-xs font-medium text-blue-600 mb-2 block">
                  {related.category}
                </span>
                <h4 className="font-semibold text-slate-900 mb-2">
                  {related.title}
                </h4>
                <span className="text-sm text-slate-500">{related.time}</span>
              </Link>
            ))}
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default Article;
