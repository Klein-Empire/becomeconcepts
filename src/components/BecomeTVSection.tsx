
import { Play, Eye, Heart, MessageCircle } from "lucide-react";
import { useTimeAgo } from "@/hooks/useTimeAgo";

interface BecomeTV {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
  thumbnail?: string;
  isActive: boolean;
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
}

const BecomeTVSection = () => {
  // This would normally come from a context or API
  const videos: BecomeTV[] = [
    {
      id: 1,
      title: "Latest News Update",
      description: "Stay updated with our latest news broadcast",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
      isActive: true,
      views: 1500,
      likes: 89,
      comments: []
    },
    {
      id: 2,
      title: "Weekly Business Report",
      description: "Comprehensive analysis of this week's business trends",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      isActive: true,
      views: 2340,
      likes: 156,
      comments: []
    }
  ];

  const activeVideos = videos.filter(video => video.isActive);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handleVideoClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  if (activeVideos.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Play className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-bold text-slate-900">Become TV</h3>
      </div>
      
      <div className="space-y-4">
        {activeVideos.map((video) => (
          <div key={video.id} className="border border-slate-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className="relative cursor-pointer group"
              onClick={() => handleVideoClick(video.youtubeUrl)}
            >
              <img
                src={video.thumbnail || `https://img.youtube.com/vi/${getYouTubeVideoId(video.youtubeUrl)}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="bg-red-600 text-white rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play className="h-6 w-6 ml-1" />
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-semibold text-slate-900 mb-2 hover:text-blue-600 cursor-pointer" 
                  onClick={() => handleVideoClick(video.youtubeUrl)}>
                {video.title}
              </h4>
              <p className="text-sm text-slate-600 mb-3">{video.description}</p>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{video.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{video.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BecomeTVSection;
