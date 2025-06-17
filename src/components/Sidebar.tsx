
import { TrendingUp, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase";
import BecomeTVSection from "./BecomeTVSection";
import Advertisement from "./Advertisement";

interface TrendingStory {
  id: string;
  title: string;
  category: string;
  date: string;
}

const Sidebar = () => {
  const [trendingStories, setTrendingStories] = useState<TrendingStory[]>([]);

  useEffect(() => {
    const fetchTrendingStories = async () => {
      try {
        const q = query(
          collection(db, 'news'),
          where('status', '==', 'published'),
          orderBy('date', 'desc'),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const fetchedStories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          category: doc.data().category,
          date: doc.data().date
        })) as TrendingStory[];
        
        setTrendingStories(fetchedStories);
      } catch (error) {
        console.error("Error fetching trending stories:", error);
        // Fallback to current Kenyan trending news
        setTrendingStories([
          {
            id: '11',
            title: "Parliament Debates New Finance Bill 2025",
            category: "Politics",
            date: new Date().toISOString().split('T')[0]
          },
          {
            id: '12',
            title: "KenGen Reports Record Clean Energy Production",
            category: "Business",
            date: new Date().toISOString().split('T')[0]
          },
          {
            id: '13',
            title: "NHIF Transitions to New Digital Health Platform",
            category: "Health",
            date: new Date().toISOString().split('T')[0]
          },
          {
            id: '14',
            title: "Kenyan Athletes Dominate World Championships",
            category: "Sports",
            date: new Date().toISOString().split('T')[0]
          },
          {
            id: '15',
            title: "Youth Employment Program Creates 50,000 Jobs",
            category: "Employment",
            date: new Date().toISOString().split('T')[0]
          }
        ]);
      }
    };

    fetchTrendingStories();
  }, []);

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const articleDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - articleDate.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return '30 min ago';
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

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
                    <span>{getTimeAgo(story.date)}</span>
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

      {/* Sidebar Advertisement */}
      <Advertisement type="sidebar" />

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
