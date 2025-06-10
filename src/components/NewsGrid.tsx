
import { Clock, MessageSquare, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const NewsGrid = () => {
  const articles = [
    {
      id: 5,
      title: "Space Exploration Reaches New Milestone",
      excerpt: "Private space companies achieve breakthrough in sustainable rocket technology, reducing costs by 40%.",
      category: "Tech",
      image: "/placeholder.svg",
      time: "1 hour ago",
      author: "Alex Thompson",
      comments: 24
    },
    {
      id: 6,
      title: "Economic Growth Accelerates in Q4",
      excerpt: "Latest quarterly reports show unprecedented growth across multiple sectors, exceeding economist predictions.",
      category: "Business",
      image: "/placeholder.svg",
      time: "2 hours ago",
      author: "Maria Garcia",
      comments: 18
    },
    {
      id: 7,
      title: "Championship Finals Draw Record Viewership",
      excerpt: "Sports broadcasting history made as global audience surpasses all previous records for live streaming.",
      category: "Sports",
      image: "/placeholder.svg",
      time: "4 hours ago",
      author: "David Kim",
      comments: 56
    },
    {
      id: 8,
      title: "Healthcare Innovation Saves Lives",
      excerpt: "New medical device approved for emergency use, promising to revolutionize emergency medicine protocols.",
      category: "Health",
      image: "/placeholder.svg",
      time: "6 hours ago",
      author: "Dr. Lisa Wang",
      comments: 12
    },
    {
      id: 9,
      title: "Entertainment Industry Embraces Virtual Reality",
      excerpt: "Major studios announce massive investments in VR content creation, signaling industry transformation.",
      category: "Entertainment",
      image: "/placeholder.svg",
      time: "8 hours ago",
      author: "Chris Brown",
      comments: 33
    },
    {
      id: 10,
      title: "Political Reform Bill Passes Legislature",
      excerpt: "Landmark legislation addressing voting rights and election security receives bipartisan support.",
      category: "Politics",
      image: "/placeholder.svg",
      time: "10 hours ago",
      author: "Jennifer Adams",
      comments: 89
    }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Latest News</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Grid</button>
          <button className="px-3 py-1 bg-slate-200 text-slate-700 rounded-md text-sm hover:bg-slate-300">List</button>
        </div>
      </div>
      
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.id} className="border-b border-slate-200 pb-8 last:border-b-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Link to={`/article/${article.id}`}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 md:h-32 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                </Link>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-2">
                  <Link to={`/category/${article.category.toLowerCase()}`}>
                    <span className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 rounded hover:bg-slate-200">
                      {article.category}
                    </span>
                  </Link>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.time}
                  </div>
                </div>
                <Link to={`/article/${article.id}`}>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-slate-600 mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">By {article.author}</span>
                  <div className="flex items-center space-x-4 text-slate-500">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm">{article.comments}</span>
                    </button>
                    <button className="hover:text-blue-600">
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
