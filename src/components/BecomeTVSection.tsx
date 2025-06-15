import { useState, useEffect } from "react";
import { Youtube, Eye, Heart, MessageCircle, Play } from "lucide-react";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface BecomeTV {
  id: string;
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
  const [videos, setVideos] = useState<BecomeTV[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const videosCollection = collection(db, "youtube");
        const q = query(videosCollection, where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        
        const fetchedVideos: BecomeTV[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            description: data.description,
            youtubeUrl: data.url,
            isActive: data.isActive,
            views: data.engagement?.views || 0,
            likes: data.engagement?.likes || 0,
            comments: data.engagement?.comments || [],
            thumbnail: data.thumbnail,
          };
        });
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Failed to load videos from Firestore:", error);
      }
      setLoading(false);
    };

    fetchVideos();
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handleVideoClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  if (loading) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
            <p>Loading Videos...</p>
        </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Youtube className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-bold text-slate-900">Become TV</h3>
      </div>
      
      {videos.length > 0 ? (
        <div className="space-y-4">
          {videos.map((video) => (
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
      ) : (
        <div className="text-center text-slate-500 py-8">
            <p>No videos available at the moment.</p>
            <p className="text-sm">An admin can add videos from the admin panel.</p>
        </div>
      )}
    </div>
  );
};

export default BecomeTVSection;
