
import { useState } from "react";
import { Heart, MessageCircle, Eye, Trash2, Reply, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface EngagementData {
  views: number;
  likes: number;
  comments: Comment[];
}

interface EngagementTrackerProps {
  itemId: number;
  itemType: 'news' | 'publication' | 'teaching' | 'advertisement' | 'agricultural' | 'education';
  engagement: EngagementData;
  onUpdateEngagement: (engagement: EngagementData) => void;
  isAdmin?: boolean;
  showInteractionButtons?: boolean;
}

const EngagementTracker = ({ 
  itemId, 
  itemType, 
  engagement, 
  onUpdateEngagement, 
  isAdmin = false,
  showInteractionButtons = true
}: EngagementTrackerProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [userHasLiked, setUserHasLiked] = useState(false);

  const handleLike = () => {
    if (!userHasLiked) {
      onUpdateEngagement({
        ...engagement,
        likes: engagement.likes + 1
      });
      setUserHasLiked(true);
    }
  };

  const handleView = () => {
    onUpdateEngagement({
      ...engagement,
      views: engagement.views + 1
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: isAdmin ? "Admin" : "Anonymous User",
        content: newComment.trim(),
        timestamp: new Date().toLocaleString(),
        likes: 0,
        replies: []
      };
      
      onUpdateEngagement({
        ...engagement,
        comments: [...engagement.comments, comment]
      });
      setNewComment("");
    }
  };

  const handleAddReply = (parentId: number) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: Date.now(),
        author: isAdmin ? "Admin" : "Anonymous User",
        content: replyContent.trim(),
        timestamp: new Date().toLocaleString(),
        likes: 0
      };

      const updatedComments = engagement.comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply]
          };
        }
        return comment;
      });

      onUpdateEngagement({
        ...engagement,
        comments: updatedComments
      });
      setReplyContent("");
      setReplyTo(null);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    onUpdateEngagement({
      ...engagement,
      comments: engagement.comments.filter(c => c.id !== commentId)
    });
  };

  const handleLikeComment = (commentId: number) => {
    const updatedComments = engagement.comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });

    onUpdateEngagement({
      ...engagement,
      comments: updatedComments
    });
  };

  return (
    <div className="space-y-4">
      {/* Engagement Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{engagement.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className={`h-4 w-4 ${userHasLiked ? 'text-red-500 fill-current' : ''}`} />
            <span>{engagement.likes.toLocaleString()} likes</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{engagement.comments.length} comments</span>
          </div>
        </div>

        {/* Engagement Progress Bar */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
          </Badge>
          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((engagement.likes / 100) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {showInteractionButtons && !isAdmin && (
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLike}
            disabled={userHasLiked}
            className={`${userHasLiked ? 'border-red-500 text-red-500 bg-red-50' : ''}`}
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
      {(showComments || isAdmin) && (
        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  Comments ({engagement.comments.length})
                </h4>
                {isAdmin && (
                  <Badge variant="secondary" className="text-xs">
                    Admin View
                  </Badge>
                )}
              </div>
              
              {/* Add Comment */}
              {!isAdmin && (
                <div className="space-y-2">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    rows={2}
                    className="text-sm resize-none"
                  />
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      onClick={handleAddComment} 
                      disabled={!newComment.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Post Comment
                    </Button>
                  </div>
                </div>
              )}

              <Separator />

              {/* Comments List */}
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {engagement.comments.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  engagement.comments.map((comment) => (
                    <div key={comment.id} className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm text-gray-900">
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.timestamp}
                            </span>
                            {comment.author === "Admin" && (
                              <Badge variant="default" className="text-xs">Admin</Badge>
                            )}
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
                        <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span>{comment.likes}</span>
                            </button>
                            {!isAdmin && (
                              <button
                                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                                className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                              >
                                <Reply className="h-3 w-3" />
                                <span>Reply</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Reply Form */}
                        {replyTo === comment.id && (
                          <div className="mt-3 space-y-2">
                            <Textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Write a reply..."
                              rows={2}
                              className="text-sm resize-none"
                            />
                            <div className="flex justify-end space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setReplyTo(null)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleAddReply(comment.id)}
                                disabled={!replyContent.trim()}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-6 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="bg-blue-50 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm text-gray-900">
                                  {reply.author}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {reply.timestamp}
                                </span>
                                {reply.author === "Admin" && (
                                  <Badge variant="default" className="text-xs">Admin</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-700">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EngagementTracker;
