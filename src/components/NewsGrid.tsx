
import { Clock, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const NewsGrid = () => {
  const articles = [
    {
      id: 5,
      title: "Kenya Airways Reports 30% Increase in Passenger Traffic",
      excerpt: "The national carrier attributes growth to new routes and improved service delivery across African destinations.",
      category: "Business",
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
      time: "2 hours ago",
      author: "Mary Wambui",
      comments: 24
    },
    {
      id: 6,
      title: "Kenyan Startups Raise $200M in Venture Capital Funding",
      excerpt: "Fintech and agritech sectors lead investment surge as international investors show confidence in Kenya's innovation ecosystem.",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
      time: "4 hours ago",
      author: "David Mwangi",
      comments: 18
    },
    {
      id: 7,
      title: "Harambee Stars Qualify for AFCON 2025",
      excerpt: "Kenya's national football team secures qualification after decisive victory over Uganda in final qualifying match.",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
      time: "6 hours ago",
      author: "James Ochieng",
      comments: 156
    },
    {
      id: 8,
      title: "New Malaria Vaccine Shows 85% Efficacy in Kenyan Trials",
      excerpt: "Clinical trials conducted in Western Kenya demonstrate breakthrough results in malaria prevention among children.",
      category: "Health",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      time: "8 hours ago",
      author: "Dr. Faith Chepkemoi",
      comments: 42
    },
    {
      id: 9,
      title: "Teachers' Union Calls Off Strike After Government Agreement",
      excerpt: "TSC agrees to 7-9% salary increment and improved working conditions following two-week industrial action.",
      category: "Employment",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
      time: "12 hours ago",
      author: "Samuel Kiprotich",
      comments: 83
    },
    {
      id: 10,
      title: "Deputy President Leads Anti-Corruption Drive in Coast Region",
      excerpt: "Government intensifies efforts to tackle corruption in public service delivery and procurement processes.",
      category: "Politics",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      time: "1 day ago",
      author: "Rose Nyong'o",
      comments: 127
    }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent mb-2">
            Latest News
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-lg">
            Grid
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors">
            List
          </button>
        </div>
      </div>
      
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.id} className="border-b border-gray-200 pb-8 last:border-b-0 group">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Link to={`/article/${article.id}`}>
                  <div className="relative overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 md:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-3">
                  <Link to={`/category/${article.category.toLowerCase()}`}>
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full hover:from-indigo-600 hover:to-purple-600 transition-colors">
                      {article.category}
                    </span>
                  </Link>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.time}
                  </div>
                </div>
                <Link to={`/article/${article.id}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 cursor-pointer transition-colors duration-300 leading-tight">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">By {article.author}</span>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm font-medium">{article.comments}</span>
                    </button>
                    <button className="hover:text-indigo-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default NewsGrid;
