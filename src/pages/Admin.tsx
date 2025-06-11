import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Image, Eye, EyeOff, Lock, User, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "@/components/FileUpload";
import InteractionTracker from "@/components/InteractionTracker";
import { useTimeAgo } from "@/hooks/useTimeAgo";
interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  time: string;
  images: string[];
  content: string;
  isActive: boolean;
  interactions: {
    views: number;
    likes: number;
    comments: Array<{
      id: number;
      author: string;
      content: string;
      timestamp: string;
    }>;
  };
}
interface CrawlNews {
  id: number;
  text: string;
  image?: string;
  timestamp: string;
  isActive: boolean;
  interactions: {
    views: number;
    likes: number;
    comments: Array<{
      id: number;
      author: string;
      content: string;
      timestamp: string;
    }>;
  };
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
interface Publication {
  id: number;
  title: string;
  authors: string;
  year: string;
  abstract: string;
  content: string;
  image?: string;
  pdf?: string;
  publishDate: string;
  isActive: boolean;
  interactions: {
    views: number;
    likes: number;
    comments: Array<{
      id: number;
      author: string;
      content: string;
      timestamp: string;
    }>;
  };
}
interface Teaching {
  id: number;
  courseName: string;
  semester: string;
  year: string;
  description: string;
  content: string;
  image?: string;
  pdf?: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isActive: boolean;
  interactions: {
    views: number;
    likes: number;
    comments: Array<{
      id: number;
      author: string;
      content: string;
      timestamp: string;
    }>;
  };
}
interface AdminAccount {
  username: string;
  email: string;
  fullName: string;
}
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });
  const [loginError, setLoginError] = useState("");

  // Admin account management
  const [adminAccount, setAdminAccount] = useState<AdminAccount>({
    username: "admin",
    email: "admin@becomeconcepts.com",
    fullName: "Admin User"
  });
  const [accountForm, setAccountForm] = useState({
    username: "",
    email: "",
    fullName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);

  // Enhanced articles with interactions
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "Major Technology Breakthrough Changes Industry Standards",
      excerpt: "Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide.",
      category: "Technology",
      author: "Michael Chen",
      time: new Date().toISOString(),
      images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"],
      content: "Full article content here...",
      isActive: true,
      interactions: {
        views: 1250,
        likes: 45,
        comments: []
      }
    },
    {
      id: 2,
      title: "Global Markets Show Strong Recovery Signs",
      excerpt: "Financial analysts report positive trends across major exchanges as investor confidence returns.",
      category: "Business",
      author: "Sarah Johnson",
      time: new Date(Date.now() - 180000).toISOString(),
      images: ["https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop"],
      content: "Full article content here...",
      isActive: true,
      interactions: {
        views: 890,
        likes: 32,
        comments: []
      }
    },
    {
      id: 3,
      title: "Political Reform Bills Pass Through Senate",
      excerpt: "Historic legislation addressing key policy reforms receives bipartisan support in recent vote.",
      category: "Politics",
      author: "David Wilson",
      time: new Date(Date.now() - 300000).toISOString(),
      images: ["https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop"],
      content: "Full article content here...",
      isActive: true,
      interactions: {
        views: 2100,
        likes: 67,
        comments: []
      }
    }
  ]);

  // Enhanced data with interactions
  const [crawlNews, setCrawlNews] = useState<CrawlNews[]>([{
    id: 1,
    text: "Stock markets hit record highs as tech sector surges 15%",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=50&h=50&fit=crop&crop=face",
    timestamp: new Date().toISOString(),
    isActive: true,
    interactions: {
      views: 245,
      likes: 12,
      comments: []
    }
  }, {
    id: 2,
    text: "Breaking: International climate agreement signed by 50 nations",
    image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=50&h=50&fit=crop&crop=face",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    isActive: true,
    interactions: {
      views: 189,
      likes: 8,
      comments: []
    }
  }]);
  const [publications, setPublications] = useState<Publication[]>([{
    id: 1,
    title: "Digital Marketing Strategies in 2024",
    authors: "Dr. Sarah Johnson, Prof. Michael Chen",
    year: "2024",
    abstract: "Comprehensive analysis of modern digital marketing approaches and their effectiveness",
    content: "Detailed publication content...",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop",
    publishDate: "2024-01-15",
    isActive: true,
    interactions: {
      views: 456,
      likes: 23,
      comments: []
    }
  }]);
  const [teachings, setTeachings] = useState<Teaching[]>([{
    id: 1,
    courseName: "Web Development Fundamentals",
    semester: "Fall",
    year: "2024",
    description: "Introduction to modern web development technologies",
    content: "Complete course curriculum...",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    instructor: "John Smith",
    duration: "40 hours",
    level: 'Beginner',
    isActive: true,
    interactions: {
      views: 324,
      likes: 18,
      comments: []
    }
  }]);

  // Advertisements state
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([{
    id: 1,
    title: "Professional Web Development",
    description: "Build your dream website with our expert team",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    link: "https://example.com",
    type: 'banner',
    isActive: true
  }]);

  // Dialog states
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingCrawl, setEditingCrawl] = useState<CrawlNews | null>(null);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [editingTeaching, setEditingTeaching] = useState<Teaching | null>(null);
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isCrawlDialogOpen, setIsCrawlDialogOpen] = useState(false);
  const [isPublicationDialogOpen, setIsPublicationDialogOpen] = useState(false);
  const [isTeachingDialogOpen, setIsTeachingDialogOpen] = useState(false);

  // Form data states
  const [articleFormData, setArticleFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    author: "",
    content: "",
    images: null as File | null,
    isActive: true
  });
  const [crawlFormData, setCrawlFormData] = useState({
    text: "",
    image: null as File | null,
    isActive: true
  });
  const [publicationFormData, setPublicationFormData] = useState({
    title: "",
    authors: "",
    year: "",
    abstract: "",
    content: "",
    image: null as File | null,
    pdf: null as File | null,
    publishDate: "",
    isActive: true
  });
  const [teachingFormData, setTeachingFormData] = useState({
    courseName: "",
    semester: "",
    year: "",
    description: "",
    content: "",
    image: null as File | null,
    pdf: null as File | null,
    instructor: "",
    duration: "",
    level: "Beginner" as 'Beginner' | 'Intermediate' | 'Advanced',
    isActive: true
  });

  const categories = ["Technology", "Business", "Politics", "Sports", "Entertainment", "Health", "World"];

  // Account management handlers
  const handleEditAccount = () => {
    setAccountForm({
      username: adminAccount.username,
      email: adminAccount.email,
      fullName: adminAccount.fullName,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsAccountDialogOpen(true);
  };
  const handleSaveAccount = () => {
    if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    if (accountForm.currentPassword !== "admin123") {
      alert("Current password is incorrect");
      return;
    }
    setAdminAccount({
      username: accountForm.username,
      email: accountForm.email,
      fullName: accountForm.fullName
    });
    setIsAccountDialogOpen(false);
    alert("Account updated successfully!");
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === adminAccount.username && loginForm.password === "admin123") {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({
      username: "",
      password: ""
    });
  };

  // File upload simulation (in real app, this would upload to server)
  const simulateFileUpload = (file: File): string => {
    return `/uploads/${Date.now()}_${file.name}`;
  };

  // Article handlers
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleFormData({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      content: article.content,
      images: null,
      isActive: article.isActive
    });
    setIsArticleDialogOpen(true);
  };

  const handleSaveArticle = () => {
    const imageUrl = articleFormData.images ? simulateFileUpload(articleFormData.images) : editingArticle?.images[0];
    
    if (editingArticle) {
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...article, 
              ...articleFormData, 
              images: imageUrl ? [imageUrl] : article.images,
              time: new Date().toISOString()
            }
          : article
      ));
    } else {
      const newArticle: Article = {
        id: Math.max(...articles.map(a => a.id)) + 1,
        ...articleFormData,
        images: imageUrl ? [imageUrl] : [],
        time: new Date().toISOString(),
        interactions: {
          views: 0,
          likes: 0,
          comments: []
        }
      };
      setArticles([...articles, newArticle]);
    }
    resetArticleForm();
  };

  const resetArticleForm = () => {
    setEditingArticle(null);
    setArticleFormData({
      title: "",
      excerpt: "",
      category: "",
      author: "",
      content: "",
      images: null,
      isActive: true
    });
    setIsArticleDialogOpen(false);
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const toggleArticleStatus = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, isActive: !article.isActive } : article
    ));
  };

  const updateArticleInteractions = (articleId: number, interactions: any) => {
    setArticles(articles.map(article => article.id === articleId ? {
      ...article,
      interactions
    } : article));
  };

  // Enhanced CRUD handlers for Publications
  const handleEditPublication = (publication: Publication) => {
    setEditingPublication(publication);
    setPublicationFormData({
      title: publication.title,
      authors: publication.authors,
      year: publication.year,
      abstract: publication.abstract,
      content: publication.content,
      image: null,
      pdf: null,
      publishDate: publication.publishDate,
      isActive: publication.isActive
    });
    setIsPublicationDialogOpen(true);
  };
  const handleSavePublication = () => {
    const imageUrl = publicationFormData.image ? simulateFileUpload(publicationFormData.image) : editingPublication?.image;
    const pdfUrl = publicationFormData.pdf ? simulateFileUpload(publicationFormData.pdf) : editingPublication?.pdf;
    if (editingPublication) {
      setPublications(publications.map(pub => pub.id === editingPublication.id ? {
        ...pub,
        ...publicationFormData,
        image: imageUrl,
        pdf: pdfUrl
      } : pub));
    } else {
      const newPublication: Publication = {
        id: Math.max(...publications.map(p => p.id)) + 1,
        ...publicationFormData,
        image: imageUrl,
        pdf: pdfUrl,
        interactions: {
          views: 0,
          likes: 0,
          comments: []
        }
      };
      setPublications([...publications, newPublication]);
    }
    resetPublicationForm();
  };
  const resetPublicationForm = () => {
    setEditingPublication(null);
    setPublicationFormData({
      title: "",
      authors: "",
      year: "",
      abstract: "",
      content: "",
      image: null,
      pdf: null,
      publishDate: "",
      isActive: true
    });
    setIsPublicationDialogOpen(false);
  };
  const handleDeletePublication = (id: number) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  // Enhanced CRUD handlers for Teaching
  const handleEditTeaching = (teaching: Teaching) => {
    setEditingTeaching(teaching);
    setTeachingFormData({
      courseName: teaching.courseName,
      semester: teaching.semester,
      year: teaching.year,
      description: teaching.description,
      content: teaching.content,
      image: null,
      pdf: null,
      instructor: teaching.instructor,
      duration: teaching.duration,
      level: teaching.level,
      isActive: teaching.isActive
    });
    setIsTeachingDialogOpen(true);
  };
  const handleSaveTeaching = () => {
    const imageUrl = teachingFormData.image ? simulateFileUpload(teachingFormData.image) : editingTeaching?.image;
    const pdfUrl = teachingFormData.pdf ? simulateFileUpload(teachingFormData.pdf) : editingTeaching?.pdf;
    if (editingTeaching) {
      setTeachings(teachings.map(teach => teach.id === editingTeaching.id ? {
        ...teach,
        ...teachingFormData,
        image: imageUrl,
        pdf: pdfUrl
      } : teach));
    } else {
      const newTeaching: Teaching = {
        id: Math.max(...teachings.map(t => t.id)) + 1,
        ...teachingFormData,
        image: imageUrl,
        pdf: pdfUrl,
        interactions: {
          views: 0,
          likes: 0,
          comments: []
        }
      };
      setTeachings([...teachings, newTeaching]);
    }
    resetTeachingForm();
  };
  const resetTeachingForm = () => {
    setEditingTeaching(null);
    setTeachingFormData({
      courseName: "",
      semester: "",
      year: "",
      description: "",
      content: "",
      image: null,
      pdf: null,
      instructor: "",
      duration: "",
      level: "Beginner",
      isActive: true
    });
    setIsTeachingDialogOpen(false);
  };
  const handleDeleteTeaching = (id: number) => {
    setTeachings(teachings.filter(teach => teach.id !== id));
  };

  // Enhanced crawl handlers with image upload and interactions
  const handleEditCrawl = (crawl: CrawlNews) => {
    setEditingCrawl(crawl);
    setCrawlFormData({
      text: crawl.text,
      image: null,
      isActive: crawl.isActive
    });
    setIsCrawlDialogOpen(true);
  };
  const handleSaveCrawl = () => {
    const imageUrl = crawlFormData.image ? simulateFileUpload(crawlFormData.image) : editingCrawl?.image;
    if (editingCrawl) {
      setCrawlNews(crawlNews.map(crawl => crawl.id === editingCrawl.id ? {
        ...crawl,
        ...crawlFormData,
        image: imageUrl,
        timestamp: new Date().toISOString()
      } : crawl));
    } else {
      const newCrawl: CrawlNews = {
        id: Math.max(...crawlNews.map(c => c.id)) + 1,
        ...crawlFormData,
        image: imageUrl,
        timestamp: new Date().toISOString(),
        interactions: {
          views: 0,
          likes: 0,
          comments: []
        }
      };
      setCrawlNews([...crawlNews, newCrawl]);
    }
    resetCrawlForm();
  };
  const resetCrawlForm = () => {
    setEditingCrawl(null);
    setCrawlFormData({
      text: "",
      image: null,
      isActive: true
    });
    setIsCrawlDialogOpen(false);
  };
  const handleDeleteCrawl = (id: number) => {
    setCrawlNews(crawlNews.filter(crawl => crawl.id !== id));
  };

  // Interaction handlers
  const updateCrawlInteractions = (crawlId: number, interactions: any) => {
    setCrawlNews(crawlNews.map(crawl => crawl.id === crawlId ? {
      ...crawl,
      interactions
    } : crawl));
  };
  const updatePublicationInteractions = (pubId: number, interactions: any) => {
    setPublications(publications.map(pub => pub.id === pubId ? {
      ...pub,
      interactions
    } : pub));
  };
  const updateTeachingInteractions = (teachId: number, interactions: any) => {
    setTeachings(teachings.map(teach => teach.id === teachId ? {
      ...teach,
      interactions
    } : teach));
  };

  // Toggle status handlers
  const toggleCrawlStatus = (id: number) => {
    setCrawlNews(crawlNews.map(crawl => crawl.id === id ? {
      ...crawl,
      isActive: !crawl.isActive
    } : crawl));
  };
  const togglePublicationStatus = (id: number) => {
    setPublications(publications.map(pub => pub.id === id ? {
      ...pub,
      isActive: !pub.isActive
    } : pub));
  };
  const toggleTeachingStatus = (id: number) => {
    setTeachings(teachings.map(teach => teach.id === id ? {
      ...teach,
      isActive: !teach.isActive
    } : teach));
  };

  // Time ago component
  const TimeAgo = ({
    timestamp
  }: {
    timestamp: string;
  }) => {
    const timeAgo = useTimeAgo(timestamp);
    return <span>{timeAgo}</span>;
  };
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Please sign in to access the admin panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input type="text" value={loginForm.username} onChange={e => setLoginForm({
              ...loginForm,
              username: e.target.value
            })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter username" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" value={loginForm.password} onChange={e => setLoginForm({
              ...loginForm,
              password: e.target.value
            })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter password" required />
            </div>
            
            {loginError && <div className="text-red-600 text-sm text-center">{loginError}</div>}
            
            <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl">
              Sign In
            </Button>
          </form>
          
          
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent mb-2">
              Enhanced Admin Panel
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleEditAccount} variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
              <User className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white rounded-xl shadow-lg">
            <TabsTrigger value="articles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Articles
            </TabsTrigger>
            <TabsTrigger value="crawl" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              News Crawl
            </TabsTrigger>
            <TabsTrigger value="publications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Publications
            </TabsTrigger>
            <TabsTrigger value="teaching" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              Teaching
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Articles</h2>
              <Button onClick={() => setIsArticleDialogOpen(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Article
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-6 p-6">
                {articles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 flex-1">
                        <button
                          onClick={() => toggleArticleStatus(article.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            article.isActive 
                              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {article.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        
                        {article.images[0] && (
                          <img 
                            src={article.images[0]} 
                            alt={article.title} 
                            className="w-16 h-12 object-cover rounded-lg" 
                          />
                        )}
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-semibold ${article.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                              {article.title}
                            </h3>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                              {article.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{article.excerpt}</p>
                          <p className="text-xs text-gray-500">
                            By {article.author} | <TimeAgo timestamp={article.time} /> | {article.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                      </div>
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
                    </div>
                    
                    <InteractionTracker 
                      itemId={article.id} 
                      itemType="article" 
                      interactions={article.interactions} 
                      onUpdateInteractions={(interactions) => updateArticleInteractions(article.id, interactions)}
                      isAdmin={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Enhanced News Crawl Tab */}
          <TabsContent value="crawl" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage News Crawl</h2>
              <Button onClick={() => setIsCrawlDialogOpen(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add News Item
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-6 p-6">
                {crawlNews.map(crawl => <div key={crawl.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 flex-1">
                        <button onClick={() => toggleCrawlStatus(crawl.id)} className={`p-2 rounded-lg transition-colors ${crawl.isActive ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                          {crawl.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        
                        {crawl.image && <img src={crawl.image} alt="News" className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />}
                        
                        <div className="flex-1">
                          <p className={`font-medium ${crawl.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {crawl.text}
                          </p>
                          <p className="text-sm text-gray-500">
                            <TimeAgo timestamp={crawl.timestamp} /> | {crawl.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditCrawl(crawl)} className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteCrawl(crawl.id)} className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <InteractionTracker itemId={crawl.id} itemType="news" interactions={crawl.interactions} onUpdateInteractions={interactions => updateCrawlInteractions(crawl.id, interactions)} isAdmin={true} />
                  </div>)}
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Publications Tab */}
          <TabsContent value="publications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Publications</h2>
              <Button onClick={() => setIsPublicationDialogOpen(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Publication
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-6 p-6">
                {publications.map(publication => <div key={publication.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 flex-1">
                        <button onClick={() => togglePublicationStatus(publication.id)} className={`p-2 rounded-lg transition-colors ${publication.isActive ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                          {publication.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        
                        {publication.image && <img src={publication.image} alt={publication.title} className="w-16 h-12 object-cover rounded-lg" />}
                        
                        <div className="flex-1">
                          <h3 className={`font-semibold ${publication.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {publication.title}
                          </h3>
                          <p className="text-sm text-gray-600">By {publication.authors} ({publication.year})</p>
                          <p className="text-sm text-gray-500 mt-1">{publication.abstract}</p>
                          {publication.pdf && <Button variant="outline" size="sm" className="mt-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white" onClick={() => window.open(publication.pdf, '_blank')}>
                              <Download className="h-4 w-4 mr-1" />
                              Download PDF
                            </Button>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditPublication(publication)} className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeletePublication(publication.id)} className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <InteractionTracker itemId={publication.id} itemType="publication" interactions={publication.interactions} onUpdateInteractions={interactions => updatePublicationInteractions(publication.id, interactions)} isAdmin={true} />
                  </div>)}
              </div>
            </div>
          </TabsContent>

          {/* Enhanced Teaching Tab */}
          <TabsContent value="teaching" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Teaching Materials</h2>
              <Button onClick={() => setIsTeachingDialogOpen(true)} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Course
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-6 p-6">
                {teachings.map(teaching => <div key={teaching.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4 flex-1">
                        <button onClick={() => toggleTeachingStatus(teaching.id)} className={`p-2 rounded-lg transition-colors ${teaching.isActive ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                          {teaching.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        </button>
                        
                        {teaching.image && <img src={teaching.image} alt={teaching.courseName} className="w-16 h-12 object-cover rounded-lg" />}
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-semibold ${teaching.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                              {teaching.courseName}
                            </h3>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                              {teaching.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{teaching.description}</p>
                          <p className="text-xs text-gray-500">
                            {teaching.semester} {teaching.year} | Instructor: {teaching.instructor} | {teaching.duration}
                          </p>
                          {teaching.pdf && <Button variant="outline" size="sm" className="mt-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white" onClick={() => window.open(teaching.pdf, '_blank')}>
                              <Download className="h-4 w-4 mr-1" />
                              Download Materials
                            </Button>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditTeaching(teaching)} className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteTeaching(teaching.id)} className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <InteractionTracker itemId={teaching.id} itemType="teaching" interactions={teaching.interactions} onUpdateInteractions={interactions => updateTeachingInteractions(teaching.id, interactions)} isAdmin={true} />
                  </div>)}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Account Settings Dialog */}
        <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Account Settings
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <input type="text" value={accountForm.username} onChange={e => setAccountForm({
                  ...accountForm,
                  username: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input type="email" value={accountForm.email} onChange={e => setAccountForm({
                  ...accountForm,
                  email: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input type="text" value={accountForm.fullName} onChange={e => setAccountForm({
                ...accountForm,
                fullName: e.target.value
              })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <input type="password" value={accountForm.currentPassword} onChange={e => setAccountForm({
                    ...accountForm,
                    currentPassword: e.target.value
                  })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <input type="password" value={accountForm.newPassword} onChange={e => setAccountForm({
                      ...accountForm,
                      newPassword: e.target.value
                    })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <input type="password" value={accountForm.confirmPassword} onChange={e => setAccountForm({
                      ...accountForm,
                      confirmPassword: e.target.value
                    })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setIsAccountDialogOpen(false)} className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveAccount} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Article Dialog */}
        <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                    value={articleFormData.title}
                    onChange={(e) => setArticleFormData({...articleFormData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter article title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={articleFormData.category}
                    onChange={(e) => setArticleFormData({...articleFormData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                <input
                  type="text"
                  value={articleFormData.author}
                  onChange={(e) => setArticleFormData({...articleFormData, author: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
                <Textarea
                  value={articleFormData.excerpt}
                  onChange={(e) => setArticleFormData({...articleFormData, excerpt: e.target.value})}
                  placeholder="Brief article excerpt"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <FileUpload
                label="Article Image"
                accept="image/*"
                type="image"
                preview={editingArticle?.images[0]}
                onFileSelect={(file) => setArticleFormData({...articleFormData, images: file})}
              />
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                <Textarea
                  value={articleFormData.content}
                  onChange={(e) => setArticleFormData({...articleFormData, content: e.target.value})}
                  placeholder="Full article content"
                  rows={8}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="articleActive"
                  checked={articleFormData.isActive}
                  onChange={(e) => setArticleFormData({...articleFormData, isActive: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="articleActive" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
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

        {/* Enhanced Publication Dialog */}
        <Dialog open={isPublicationDialogOpen} onOpenChange={setIsPublicationDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingPublication ? "Edit Publication" : "Add New Publication"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input type="text" value={publicationFormData.title} onChange={e => setPublicationFormData({
                  ...publicationFormData,
                  title: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter publication title" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Authors</label>
                  <input type="text" value={publicationFormData.authors} onChange={e => setPublicationFormData({
                  ...publicationFormData,
                  authors: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter author names" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                  <input type="text" value={publicationFormData.year} onChange={e => setPublicationFormData({
                  ...publicationFormData,
                  year: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Publication year" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Date</label>
                  <input type="date" value={publicationFormData.publishDate} onChange={e => setPublicationFormData({
                  ...publicationFormData,
                  publishDate: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Abstract</label>
                <Textarea value={publicationFormData.abstract} onChange={e => setPublicationFormData({
                ...publicationFormData,
                abstract: e.target.value
              })} placeholder="Brief publication abstract" rows={3} className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              </div>

              <FileUpload label="Publication Image" accept="image/*" type="image" preview={editingPublication?.image} onFileSelect={file => setPublicationFormData({
              ...publicationFormData,
              image: file
            })} />

              <FileUpload label="PDF Document" accept=".pdf" type="pdf" onFileSelect={file => setPublicationFormData({
              ...publicationFormData,
              pdf: file
            })} />
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                <Textarea value={publicationFormData.content} onChange={e => setPublicationFormData({
                ...publicationFormData,
                content: e.target.value
              })} placeholder="Full publication content" rows={8} className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              </div>
              
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="publicationActive" checked={publicationFormData.isActive} onChange={e => setPublicationFormData({
                ...publicationFormData,
                isActive: e.target.checked
              })} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
                <label htmlFor="publicationActive" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={resetPublicationForm} className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSavePublication} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg">
                  <Save className="h-4 w-4 mr-2" />
                  {editingPublication ? "Update" : "Create"} Publication
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Enhanced Teaching Dialog */}
        <Dialog open={isTeachingDialogOpen} onOpenChange={setIsTeachingDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingTeaching ? "Edit Course" : "Add New Course"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
                  <input type="text" value={teachingFormData.courseName} onChange={e => setTeachingFormData({
                  ...teachingFormData,
                  courseName: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter course name" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor</label>
                  <input type="text" value={teachingFormData.instructor} onChange={e => setTeachingFormData({
                  ...teachingFormData,
                  instructor: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Enter instructor name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Semester</label>
                  <input type="text" value={teachingFormData.semester} onChange={e => setTeachingFormData({
                  ...teachingFormData,
                  semester: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="e.g., Fall, Spring" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                  <input type="text" value={teachingFormData.year} onChange={e => setTeachingFormData({
                  ...teachingFormData,
                  year: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="Academic year" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                  <select value={teachingFormData.level} onChange={e => setTeachingFormData({
                  ...teachingFormData,
                  level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <Textarea value={teachingFormData.description} onChange={e => setTeachingFormData({
                ...teachingFormData,
                description: e.target.value
              })} placeholder="Course description" rows={3} className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              </div>

              <FileUpload label="Course Image" accept="image/*" type="image" preview={editingTeaching?.image} onFileSelect={file => setTeachingFormData({
              ...teachingFormData,
              image: file
            })} />

              <FileUpload label="Course Materials (PDF)" accept=".pdf" type="pdf" onFileSelect={file => setTeachingFormData({
              ...teachingFormData,
              pdf: file
            })} />
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Content</label>
                <Textarea value={teachingFormData.content} onChange={e => setTeachingFormData({
                ...teachingFormData,
                content: e.target.value
              })} placeholder="Full course content and curriculum" rows={8} className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <input type="text" value={teachingFormData.duration} onChange={e => setTeachingFormData({
                  ...teachingFormData,
                  duration: e.target.value
                })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" placeholder="e.g., 40 hours" />
                </div>
                
                <div className="flex items-center space-x-3 pt-8">
                  <input type="checkbox" id="teachingActive" checked={teachingFormData.isActive} onChange={e => setTeachingFormData({
                  ...teachingFormData,
                  isActive: e.target.checked
                })} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
                  <label htmlFor="teachingActive" className="text-sm font-medium text-gray-700">
                    Active (visible on website)
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={resetTeachingForm} className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveTeaching} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg">
                  <Save className="h-4 w-4 mr-2" />
                  {editingTeaching ? "Update" : "Create"} Course
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Enhanced Crawl Dialog */}
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
                <Textarea value={crawlFormData.text} onChange={e => setCrawlFormData({
                ...crawlFormData,
                text: e.target.value
              })} placeholder="Enter breaking news text" rows={3} className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200" />
              </div>

              <FileUpload label="News Image" accept="image/*" type="image" preview={editingCrawl?.image} onFileSelect={file => setCrawlFormData({
              ...crawlFormData,
              image: file
            })} />
              
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="crawlActive" checked={crawlFormData.isActive} onChange={e => setCrawlFormData({
                ...crawlFormData,
                isActive: e.target.checked
              })} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500" />
                <label htmlFor="crawlActive" className="text-sm font-medium text-gray-700">
                  Active (visible in news crawl)
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={resetCrawlForm} className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSaveCrawl} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg">
                  <Save className="h-4 w-4 mr-2" />
                  {editingCrawl ? "Update" : "Create"} News Item
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>;
};
export default Admin;
