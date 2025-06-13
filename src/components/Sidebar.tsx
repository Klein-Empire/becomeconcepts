
import { TrendingUp, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BecomeTVSection from "./BecomeTVSection";

const Sidebar = () => {
  const trendingStories = [
    {
      id: 11,
      title: "Breaking: Major Policy Changes Announced",
      category: "Politics",
      time: "30 min ago"
    },
    {
      id: 12,
      title: "Tech Giant Reports Record Profits",
      category: "Business",
      time: "1 hour ago"
    },
    {
      id: 13,
      title: "Celebrity Wedding Shocks Fans",
      category: "Entertainment",
      time: "2 hours ago"
    },
    {
      id: 14,
      title: "Scientific Breakthrough in Medicine",
      category: "Health",
      time: "3 hours ago"
    },
    {
      id: 15,
      title: "Championship Team Wins Title",
      category: "Sports",
      time: "4 hours ago"
    }
  ];

  const quickLinks = ["Weather", "Stock Market", "Election Updates", "COVID-19 Updates", "Opinion"];

  return (
    <aside className="space-y-8">
      {/* Trending Stories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-bold text-slate-900">Trending Now</h3>
        </div>
        <div className="space-y-4">
          {trendingStories.map((story, index) => (
            <div key={story.id} className="border-b border-slate-100 pb-3 last:border-b-0">
              <div className="flex items-start space-x-3">
                <span className="text-red-500 font-bold text-lg">{index + 1}</span>
                <div className="flex-1">
                  <Link to={`/article/${story.id}`}>
                    <h4 className="text-sm font-medium text-slate-900 mb-1 hover:text-blue-600 cursor-pointer line-clamp-2">
                      {story.title}
                    </h4>
                  </Link>
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <Link to={`/category/${story.category.toLowerCase()}`}>
                      <span className="hover:text-blue-600">{story.category}</span>
                    </Link>
                    <span>•</span>
                    <span>{story.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become TV Section */}
      <BecomeTVSection />

      {/* Newsletter Signup */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Mail className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Stay Updated</h3>
        </div>
        <p className="text-slate-600 mb-4 text-sm">
          Get the latest news delivered to your inbox every morning.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Subscribe
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Advertisement Space */}
      <div className="bg-slate-100 rounded-lg p-6 text-center">
        <p className="text-slate-500 text-sm mb-3">Advertisement</p>
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-8">
          <p className="text-slate-400 text-sm">Ad Space Available</p>
          <p className="text-slate-400 text-xs mt-1">300x250</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
        <div className="space-y-3">
          {quickLinks.map((link) => (
            <Link
              key={link}
              to={`/category/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between text-slate-700 hover:text-blue-600 text-sm"
            >
              <span>{link}</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
