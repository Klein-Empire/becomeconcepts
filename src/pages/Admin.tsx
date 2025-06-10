import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Image, Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  time: string;
  images: string[];
  content: string;
}

interface CrawlNews {
  id: number;
  text: string;
  isActive: boolean;
}

interface Advertisement {
  id: number;
  title: string;
  description: string;
  image?: string;
  video?: string;
  link: string;
  type: 'banner' | 'sidebar' | 'inline';
  isActive: boolean;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "Major Technology Breakthrough Changes Industry Standards",
      excerpt: "Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide.",
      category: "Technology",
      author: "Michael Chen",
      time: "2 hours ago",
      images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"],
      content: "Full article content here..."
    },
    {
      id: 2,
      title: "Global Markets Show Strong Recovery Signs",
      excerpt: "Financial analysts report positive trends across major exchanges as investor confidence returns.",
      category: "Business",
      author: "Sarah Johnson",
      time: "3 hours ago",
      images: ["https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop"],
      content: "Full article content here..."
    }
  ]);

  const [crawlNews, setCrawlNews] = useState<CrawlNews[]>([
    { id: 1, text: "Stock markets hit record highs as tech sector surges 15%", isActive: true },
    { id: 2, text: "Breaking: International climate agreement signed by 50 nations", isActive: true },
    { id: 3, text: "Scientists discover breakthrough cancer treatment with 95% success rate", isActive: true },
    { id: 4, text: "Major cryptocurrency exchange announces new regulatory compliance measures", isActive: false },
    { id: 5, text: "Global supply chain issues show signs of improvement in Q4", isActive: true },
    { id: 6, text: "Revolutionary AI technology promises to transform healthcare industry", isActive: true }
  ]);

  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: 1,
      title: "Professional Web Development",
      description: "Build your dream website with our expert team",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      link: "https://example.com",
      type: 'banner',
      isActive: true
    },
    {
      id: 2,
      title: "Learn Digital Marketing",
      description: "Master the art of digital marketing",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=300&h=250&fit=crop",
      link: "https://example.com",
      type: 'sidebar',
      isActive: true
    }
  ]);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingCrawl, setEditingCrawl] = useState<CrawlNews | null>(null);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isCrawlDialogOpen, setIsCrawlDialogOpen] = useState(false);
  const [isAdDialogOpen, setIsAdDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    author: "",
    content: "",
    images: [""]
  });
  const [crawlFormData, setCrawlFormData] = useState({
    text: "",
    isActive: true
  });
  const [adFormData, setAdFormData] = useState({
    title: "",
    description: "",
    image: "",
    video: "",
    link: "",
    type: "banner" as 'banner' | 'sidebar' | 'inline',
    isActive: true
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in real app, this would be secure
    if (loginForm.username === "admin" && loginForm.password === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ username: "", password: "" });
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      content: article.content,
      images: article.images
    });
    setIsArticleDialogOpen(true);
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleSaveArticle = () => {
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
    resetArticleForm();
  };

  const resetArticleForm = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      author: "",
      content: "",
      images: [""]
    });
    setIsArticleDialogOpen(false);
  };

  const handleAddNewArticle = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      author: "",
      content: "",
      images: [""]
    });
    setIsArticleDialogOpen(true);
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""]
    });
  };

  const removeImageField = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const handleEditCrawl = (crawl: CrawlNews) => {
    setEditingCrawl(crawl);
    setCrawlFormData({
      text: crawl.text,
      isActive: crawl.isActive
    });
    setIsCrawlDialogOpen(true);
  };

  const handleDeleteCrawl = (id: number) => {
    setCrawlNews(crawlNews.filter(crawl => crawl.id !== id));
  };

  const handleSaveCrawl = () => {
    if (editingCrawl) {
      setCrawlNews(crawlNews.map(crawl => 
        crawl.id === editingCrawl.id 
          ? { ...crawl, ...crawlFormData }
          : crawl
      ));
    } else {
      const newCrawl: CrawlNews = {
        id: Math.max(...crawlNews.map(c => c.id)) + 1,
        ...crawlFormData
      };
      setCrawlNews([...crawlNews, newCrawl]);
    }
    resetCrawlForm();
  };

  const resetCrawlForm = () => {
    setEditingCrawl(null);
    setCrawlFormData({
      text: "",
      isActive: true
    });
    setIsCrawlDialogOpen(false);
  };

  const toggleCrawlStatus = (id: number) => {
    setCrawlNews(crawlNews.map(crawl => 
      crawl.id === id 
        ? { ...crawl, isActive: !crawl.isActive }
        : crawl
    ));
  };

  const handleEditAd = (ad: Advertisement) => {
    setEditingAd(ad);
    setAdFormData({
      title: ad.title,
      description: ad.description,
      image: ad.image || "",
      video: ad.video || "",
      link: ad.link,
      type: ad.type,
      isActive: ad.isActive
    });
    setIsAdDialogOpen(true);
  };

  const handleDeleteAd = (id: number) => {
    setAdvertisements(advertisements.filter(ad => ad.id !== id));
  };

  const handleSaveAd = () => {
    if (editingAd) {
      setAdvertisements(advertisements.map(ad => 
        ad.id === editingAd.id 
          ? { ...ad, ...adFormData }
          : ad
      ));
    } else {
      const newAd: Advertisement = {
        id: Math.max(...advertisements.map(a => a.id)) + 1,
        ...adFormData
      };
      setAdvertisements([...advertisements, newAd]);
    }
    resetAdForm();
  };

  const resetAdForm = () => {
    setEditingAd(null);
    setAdFormData({
      title: "",
      description: "",
      image: "",
      video: "",
      link: "",
      type: "banner",
      isActive: true
    });
    setIsAdDialogOpen(false);
  };

  const toggleAdStatus = (id: number) => {
    setAdvertisements(advertisements.map(ad => 
      ad.id === id 
        ? { ...ad, isActive: !ad.isActive }
        : ad
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Please sign in to access the admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                placeholder="Enter password"
                required
              />
            </div>
            
            {loginError && (
              <div className="text-red-600 text-sm text-center">{loginError}</div>
            )}
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Demo credentials: admin / admin123
          </div>
        </div>
      </div>
    );
  }

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
            onClick={handleLogout}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl shadow-lg">
            <TabsTrigger value="articles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Articles Management
            </TabsTrigger>
            <TabsTrigger value="crawl" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              News Crawl Management
            </TabsTrigger>
            <TabsTrigger value="ads" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Advertisement Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Articles</h2>
              <Button 
                onClick={handleAddNewArticle}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
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
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Article</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Author</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={article.images[0]}
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
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.author}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{article.time}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditArticle(article)}
                              className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteArticle(article.id)}
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
          </TabsContent>

          <TabsContent value="crawl" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage News Crawl</h2>
              <Button 
                onClick={() => setIsCrawlDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add News Item
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {crawlNews.map((crawl) => (
                  <div key={crawl.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => toggleCrawlStatus(crawl.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          crawl.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {crawl.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${crawl.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {crawl.text}
                        </p>
                        <p className="text-xs text-gray-500">
                          {crawl.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCrawl(crawl)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCrawl(crawl.id)}
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Advertisements</h2>
              <Button 
                onClick={() => setIsAdDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Advertisement
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {advertisements.map((ad) => (
                  <div key={ad.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => toggleAdStatus(ad.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          ad.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {ad.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      {(ad.image || ad.video) && (
                        <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          {ad.video ? (
                            <video className="w-full h-full object-cover" muted>
                              <source src={ad.video} type="video/mp4" />
                            </video>
                          ) : (
                            <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${ad.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {ad.title}
                          </h3>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                            {ad.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{ad.description}</p>
                        <p className="text-xs text-gray-500">
                          Link: {ad.link} | Status: {ad.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAd(ad)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAd(ad.id)}
                        className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Article Dialog */}
        <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingArticle ? "Edit Article" : "Add New Article"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter article title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  placeholder="Brief article summary"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    <Image className="inline h-4 w-4 mr-2" />
                    Article Images
                  </label>
                  <Button
                    type="button"
                    onClick={addImageField}
                    size="sm"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Image
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Image {index + 1}</span>
                        {formData.images.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeImageField(index)}
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Enter image URL"
                      />
                      
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {predefinedImages.map((imageUrl, imgIndex) => (
                          <div
                            key={imgIndex}
                            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                              image === imageUrl 
                                ? 'border-indigo-500 ring-2 ring-indigo-200' 
                                : 'border-gray-200 hover:border-indigo-300'
                            }`}
                            onClick={() => updateImageField(index, imageUrl)}
                          >
                            <img
                              src={imageUrl}
                              alt={`Option ${imgIndex + 1}`}
                              className="w-full h-16 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      
                      {image && (
                        <div className="mt-2">
                          <img
                            src={image}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
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
                  onClick={resetArticleForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveArticle}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingArticle ? "Update" : "Create"} Article
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Crawl News Dialog */}
        <Dialog open={isCrawlDialogOpen} onOpenChange={setIsCrawlDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingCrawl ? "Edit News Crawl" : "Add News Crawl"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">News Text</label>
                <Textarea
                  value={crawlFormData.text}
                  onChange={(e) => setCrawlFormData({...crawlFormData, text: e.target.value})}
                  placeholder="Enter breaking news text"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={crawlFormData.isActive}
                  onChange={(e) => setCrawlFormData({...crawlFormData, isActive: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (visible in news crawl)
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={resetCrawlForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveCrawl}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingCrawl ? "Update" : "Create"} News Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Advertisement Dialog */}
        <Dialog open={isAdDialogOpen} onOpenChange={setIsAdDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingAd ? "Edit Advertisement" : "Add New Advertisement"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={adFormData.title}
                    onChange={(e) => setAdFormData({...adFormData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter advertisement title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={adFormData.type}
                    onChange={(e) => setAdFormData({...adFormData, type: e.target.value as 'banner' | 'sidebar' | 'inline'})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="banner">Banner</option>
                    <option value="sidebar">Sidebar</option>
                    <option value="inline">Inline</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <Textarea
                  value={adFormData.description}
                  onChange={(e) => setAdFormData({...adFormData, description: e.target.value})}
                  placeholder="Advertisement description"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link URL</label>
                <input
                  type="url"
                  value={adFormData.link}
                  onChange={(e) => setAdFormData({...adFormData, link: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={adFormData.image}
                  onChange={(e) => setAdFormData({...adFormData, image: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter image URL"
                />
                
                {adFormData.image && (
                  <div className="mt-3">
                    <img
                      src={adFormData.image}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Video URL (Optional)</label>
                <input
                  type="url"
                  value={adFormData.video}
                  onChange={(e) => setAdFormData({...adFormData, video: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter video URL"
                />
                
                {adFormData.video && (
                  <div className="mt-3">
                    <video
                      src={adFormData.video}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      controls
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="adIsActive"
                  checked={adFormData.isActive}
                  onChange={(e) => setAdFormData({...adFormData, isActive: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="adIsActive" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={resetAdForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveAd}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingAd ? "Update" : "Create"} Advertisement
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

}
