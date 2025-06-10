
import { useState } from "react";
import { MessageSquare, User, Heart, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
  likes: number;
  replies: Comment[];
}

const Comments = ({ articleId }: { articleId: number }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Johnson",
      content: "This is a fascinating development. The implications for the industry are huge!",
      time: "2 hours ago",
      likes: 5,
      replies: [
        {
          id: 2,
          author: "Mike Chen",
          content: "I completely agree! This could change everything.",
          time: "1 hour ago",
          likes: 2,
          replies: []
        }
      ]
    },
    {
      id: 3,
      author: "Alex Thompson",
      content: "Great reporting! Would love to see more analysis on the economic impact.",
      time: "3 hours ago",
      likes: 8,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        content: newComment,
        time: "Just now",
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleSubmitReply = (parentId: number) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: Date.now(),
        author: "Anonymous User",
        content: replyContent,
        time: "Just now",
        likes: 0,
        replies: []
      };
      
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === commentId 
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center mb-8">
        <MessageSquare className="h-6 w-6 text-purple-600 mr-3" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add new comment */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Join the conversation</h4>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={4}
          className="mb-4 border-purple-200 focus:border-purple-500 focus:ring-purple-200"
        />
        <Button 
          onClick={handleSubmitComment}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Post Comment
        </Button>
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold text-gray-900">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.time}</span>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <Reply className="h-4 w-4" />
                    <span className="text-sm font-medium">Reply</span>
                  </button>
                </div>

                {/* Reply form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      rows={3}
                      className="mb-3 border-gray-300 focus:border-purple-500"
                    />
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleSubmitReply(comment.id)}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Reply
                      </Button>
                      <Button 
                        onClick={() => setReplyingTo(null)}
                        size="sm"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          <User className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900 text-sm">{reply.author}</span>
                            <span className="text-xs text-gray-500">{reply.time}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                          <button
                            onClick={() => handleLike(reply.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors"
                          >
                            <Heart className="h-3 w-3" />
                            <span className="text-xs font-medium">{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
