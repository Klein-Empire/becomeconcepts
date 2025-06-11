
import { useState } from "react";
import { Heart, MessageCircle, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

interface InteractionData {
  views: number;
  likes: number;
  comments: Comment[];
}

interface InteractionTrackerProps {
  itemId: number;
  itemType: 'news' | 'publication' | 'teaching';
  interactions: InteractionData;
  onUpdateInteractions: (interactions: InteractionData) => void;
  isAdmin?: boolean;
}

const InteractionTracker = ({ 
  itemId, 
  itemType, 
  interactions, 
  onUpdateInteractions, 
  isAdmin = false 
}: InteractionTrackerProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [userHasLiked, setUserHasLiked] = useState(false);

  const handleLike = () => {
    if (!userHasLiked) {
      onUpdateInteractions({
        ...interactions,
        likes: interactions.likes + 1
      });
      setUserHasLiked(true);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        content: newComment.trim(),
        timestamp: new Date().toLocaleString()
      };
      
      onUpdateInteractions({
        ...interactions,
        comments: [...interactions.comments, comment]
      });
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId: number) => {
    onUpdateInteractions({
      ...interactions,
      comments: interactions.comments.filter(c => c.id !== commentId)
    });
  };

  return (
    <div className="space-y-4">
      {/* Interaction Stats */}
      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Eye className="h-4 w-4" />
          <span>{interactions.views} views</span>
        </div>
        <div className="flex items-center space-x-1">
          <Heart className={`h-4 w-4 ${userHasLiked ? 'text-red-500 fill-current' : ''}`} />
          <span>{interactions.likes} likes</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="h-4 w-4" />
          <span>{interactions.comments.length} comments</span>
        </div>
      </div>

      {/* Action Buttons */}
      {!isAdmin && (
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            disabled={userHasLiked}
            className={`${userHasLiked ? 'border-red-500 text-red-500' : ''}`}
          >
            <Heart className={`h-4 w-4 mr-1 ${userHasLiked ? 'fill-current' : ''}`} />
            {userHasLiked ? 'Liked' : 'Like'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Comment
          </Button>
        </div>
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-gray-900">Comments ({interactions.comments.length})</h4>
          
          {/* Add Comment */}
          {!isAdmin && (
            <div className="space-y-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={2}
                className="text-sm"
              />
              <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {interactions.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white h-6 w-6 p-0"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractionTracker;
