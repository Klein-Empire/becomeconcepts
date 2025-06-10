
import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  time: string;
  image: string;
  content: string;
}

const Admin = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "Major Technology Breakthrough Changes Industry Standards",
      excerpt: "Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide.",
      category: "Technology",
      author: "Michael Chen",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      content: "Full article content here..."
    },
    {
      id: 2,
      title: "Global Markets Show Strong Recovery Signs",
      excerpt: "Financial analysts report positive trends across major exchanges as investor confidence returns.",
      category: "Business",
      author: "Sarah Johnson",
      time: "3 hours ago",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop",
      content: "Full article content here..."
    }
  ]);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    author: "",
    content: "",
    image: ""
  });

  const categories = ["Technology", "Business", "Politics", "Sports", "Entertainment", "Health", "World"];

  const predefinedImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop"
  ];

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      content: article.content,
      image: article.image
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleSave = () => {
    if (editingArticle) {
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...formData, time: "Just updated" }
          : article
      ));
    } else {
      const newArticle: Article = {
        id: Math.max(...articles.map(a => a.id)) + 1,
        ...formData,
        time: "Just now"
      };
      setArticles([newArticle, ...articles]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      author: "",
      content: "",
      image: predefinedImages[0]
    });
    setIsDialogOpen(false);
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      author: "",
      content: "",
      image: predefinedImages[0]
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent mb-2">
              News Admin Panel
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          </div>
          <Button 
            onClick={handleAddNew}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Article
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Article
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-16 w-16 object-cover rounded-lg mr-4 shadow-md"
                        />
                        <div className="max-w-xs">
                          <div className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {article.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {article.time}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(article)}
                          className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                          className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingArticle ? "Edit Article" : "Add New Article"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                    placeholder="Enter article title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                  placeholder="Enter author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt
                </label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Brief article summary"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Image className="inline h-4 w-4 mr-2" />
                  Featured Image
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                  {predefinedImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-3 transition-all duration-300 ${
                        formData.image === imageUrl 
                          ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-lg' 
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => setFormData({...formData, image: imageUrl})}
                    >
                      <img
                        src={imageUrl}
                        alt={`Option ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                      {formData.image === imageUrl && (
                        <div className="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Selected: {formData.image || "No image selected"}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Full article content"
                  rows={8}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={resetForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingArticle ? "Update" : "Create"} Article
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;
