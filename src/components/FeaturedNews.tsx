
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedNews = () => {
  const featuredArticles = [
    {
      id: 2,
      title: "Global Markets Show Strong Recovery Signs",
      excerpt: "Financial analysts report positive trends across major exchanges as investor confidence returns.",
      category: "Business",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      time: "3 hours ago",
      author: "Sarah Johnson"
    },
    {
      id: 3,
      title: "Climate Summit Reaches Historic Agreement",
      excerpt: "World leaders unite on ambitious climate goals with concrete action plans for the next decade.",
      category: "My Story",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      time: "5 hours ago",
      author: "Michael Chen"
    },
    {
      id: 4,
      title: "Revolutionary AI Tool Transforms Healthcare",
      excerpt: "New artificial intelligence system shows promise in early disease detection and treatment planning.",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      time: "6 hours ago",
      author: "Dr. Emily Rodriguez"
    }
  ];

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
                    src={article.image}
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
                      {article.time}
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
