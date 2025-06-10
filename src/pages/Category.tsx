
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Category = () => {
  const { category } = useParams();
  
  // Mock articles for the category
  const categoryArticles = [
    {
      id: 1,
      title: "Space Exploration Reaches New Milestone",
      excerpt: "Private space companies achieve breakthrough in sustainable rocket technology, reducing costs by 40%.",
      category: "Tech",
      image: "/placeholder.svg",
      time: "1 hour ago",
      author: "Alex Thompson"
    },
    {
      id: 2,
      title: "Revolutionary AI Tool Transforms Healthcare",
      excerpt: "New artificial intelligence system shows promise in early disease detection and treatment planning.",
      category: "Tech",
      image: "/placeholder.svg",
      time: "6 hours ago",
      author: "Dr. Emily Rodriguez"
    },
    {
      id: 3,
      title: "Quantum Computing Advances Promise New Possibilities",
      excerpt: "Scientists achieve quantum supremacy breakthrough that could revolutionize computing power.",
      category: "Tech",
      image: "/placeholder.svg",
      time: "1 day ago",
      author: "Dr. Michael Chang"
    }
  ];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryArticles.map((article) => (
            <Link 
              key={article.id}
              to={`/article/${article.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden block"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.time}
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
      </div>
      
      <Footer />
    </div>
  );
};

export default Category;
