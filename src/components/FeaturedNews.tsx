
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedNews = () => {
  const featuredArticles = [
    {
      id: 2,
      title: "Global Markets Show Strong Recovery Signs",
      excerpt: "Financial analysts report positive trends across major exchanges as investor confidence returns.",
      category: "Business",
      image: "/placeholder.svg",
      time: "3 hours ago",
      author: "Sarah Johnson"
    },
    {
      id: 3,
      title: "Climate Summit Reaches Historic Agreement",
      excerpt: "World leaders unite on ambitious climate goals with concrete action plans for the next decade.",
      category: "World",
      image: "/placeholder.svg",
      time: "5 hours ago",
      author: "Michael Chen"
    },
    {
      id: 4,
      title: "Revolutionary AI Tool Transforms Healthcare",
      excerpt: "New artificial intelligence system shows promise in early disease detection and treatment planning.",
      category: "Tech",
      image: "/placeholder.svg",
      time: "6 hours ago",
      author: "Dr. Emily Rodriguez"
    }
  ];

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Featured Stories</h2>
          <Link to="/category/all" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Link key={article.id} to={`/article/${article.id}`}>
              <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
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
                    <span className="text-blue-600 hover:text-blue-800 font-medium text-sm">
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
