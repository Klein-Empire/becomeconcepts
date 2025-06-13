import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Image, Eye, EyeOff, Lock, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "@/components/FileUpload";
import InteractionTracker from "@/components/InteractionTracker";

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
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
}

interface CrawlNews {
  id: number;
  text: string;
  image?: string;
  isActive: boolean;
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
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
  description: string;
  content: string;
  image?: string;
  pdf?: string;
  author: string;
  publishDate: string;
  isActive: boolean;
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
}

interface Teaching {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string;
  video?: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isActive: boolean;
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
}

interface TrendingNews {
  id: number;
  title: string;
  category: string;
  time: string;
  isActive: boolean;
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
}

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

interface Agricultural {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image?: string;
  publishDate: string;
  isActive: boolean;
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
}

interface Education {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image?: string;
  publishDate: string;
  isActive: boolean;
  views: number;
  likes: number;
  comments: Array<{id: number; author: string; content: string; time: string}>;
}

interface AdminAccount {
  username: string;
  email: string;
  fullName: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
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

  // All data states
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "Major Technology Breakthrough Changes Industry Standards",
      excerpt: "Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide.",
      category: "Technology",
      author: "Michael Chen",
      time: "2 hours ago",
      images: ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"],
      content: "Full article content here...",
      isActive: true,
      views: 1250,
      likes: 89,
      comments: []
    }
  ]);

  const [crawlNews, setCrawlNews] = useState<CrawlNews[]>([
    { id: 1, text: "Stock markets hit record highs as tech sector surges 15%", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=50&h=50&fit=crop&crop=face", isActive: true, views: 500, likes: 25, comments: [] }
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
    }
  ]);

  const [publications, setPublications] = useState<Publication[]>([
    {
      id: 1,
      title: "Digital Marketing Handbook 2024",
      description: "Complete guide to modern digital marketing strategies",
      content: "Comprehensive handbook covering all aspects of digital marketing...",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop",
      author: "Marketing Team",
      publishDate: "2024-01-15",
      isActive: true,
      views: 750,
      likes: 45,
      comments: []
    }
  ]);

  const [teachings, setTeachings] = useState<Teaching[]>([
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn the basics of web development from scratch",
      content: "Complete course covering HTML, CSS, and JavaScript fundamentals...",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      instructor: "John Smith",
      duration: "40 hours",
      level: 'Beginner',
      isActive: true,
      views: 980,
      likes: 67,
      comments: []
    }
  ]);

  // New data states
  const [trendingNews, setTrendingNews] = useState<TrendingNews[]>([
    {
      id: 1,
      title: "Breaking: Major Policy Changes Announced",
      category: "Politics",
      time: "30 min ago",
      isActive: true,
      views: 2340,
      likes: 156,
      comments: []
    }
  ]);

  const [becomeTVs, setBecomeTVs] = useState<BecomeTV[]>([
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
    }
  ]);

  const [agriculturals, setAgriculturals] = useState<Agricultural[]>([
    {
      id: 1,
      title: "Modern Farming Techniques Boost Crop Yields",
      excerpt: "New sustainable farming methods are revolutionizing agriculture across the continent",
      content: "Detailed content about modern farming...",
      author: "Agricultural Expert",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
      publishDate: "2024-01-20",
      isActive: true,
      views: 892,
      likes: 67,
      comments: []
    }
  ]);

  const [educations, setEducations] = useState<Education[]>([
    {
      id: 1,
      title: "Digital Learning Revolution in Schools",
      excerpt: "How technology is transforming education for the better",
      content: "Comprehensive analysis of digital learning trends...",
      author: "Education Specialist",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      publishDate: "2024-01-18",
      isActive: true,
      views: 1120,
      likes: 89,
      comments: []
    }
  ]);

  // Dialog states - keeping existing ones and adding new ones
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingCrawl, setEditingCrawl] = useState<CrawlNews | null>(null);
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [editingTeaching, setEditingTeaching] = useState<Teaching | null>(null);
  const [editingTrending, setEditingTrending] = useState<TrendingNews | null>(null);
  const [editingBecomeTV, setEditingBecomeTV] = useState<BecomeTV | null>(null);
  const [editingAgricultural, setEditingAgricultural] = useState<Agricultural | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isCrawlDialogOpen, setIsCrawlDialogOpen] = useState(false);
  const [isAdDialogOpen, setIsAdDialogOpen] = useState(false);
  const [isPublicationDialogOpen, setIsPublicationDialogOpen] = useState(false);
  const [isTeachingDialogOpen, setIsTeachingDialogOpen] = useState(false);
  const [isTrendingDialogOpen, setIsTrendingDialogOpen] = useState(false);
  const [isBecomeTVDialogOpen, setIsBecomeTVDialogOpen] = useState(false);
  const [isAgriculturalDialogOpen, setIsAgriculturalDialogOpen] = useState(false);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);

  // Form data states - keeping existing ones and adding new ones
  const [articleFormData, setArticleFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    author: "",
    content: "",
    images: [""],
    isActive: true
  });

  const [crawlFormData, setCrawlFormData] = useState({
    text: "",
    image: "",
    isActive: true
  });

  const [adFormData, setAdFormData] = useState({
    title: "",
    description: "",
    image: "",
    video: "",
    link: "",
    type: 'banner' as 'banner' | 'sidebar' | 'inline',
    isActive: true
  });

  const [publicationFormData, setPublicationFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    pdf: "",
    author: "",
    publishDate: "",
    isActive: true
  });

  const [teachingFormData, setTeachingFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    video: "",
    instructor: "",
    duration: "",
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    isActive: true
  });

  // New form data states
  const [trendingFormData, setTrendingFormData] = useState({
    title: "",
    category: "",
    time: "",
    isActive: true
  });

  const [becomeTVFormData, setBecomeTVFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    thumbnail: "",
    isActive: true
  });

  const [agriculturalFormData, setAgriculturalFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    publishDate: "",
    isActive: true
  });

  const [educationFormData, setEducationFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    image: "",
    publishDate: "",
    isActive: true
  });

  const categories = ["Technology", "Business", "Politics", "Sports", "Entertainment", "Health", "World", "Agricultural", "Education"];

  const predefinedImages = [
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop"
  ];

  // Account management handlers
  const handleAccountFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountSave = () => {
    if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
      alert("New passwords don't match");
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

  // Login/logout handlers
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
    setLoginForm({ username: "", password: "" });
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
      images: article.images,
      isActive: article.isActive
    });
    setIsArticleDialogOpen(true);
  };

  const handleSaveArticle = () => {
    if (editingArticle) {
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...articleFormData }
          : article
      ));
    } else {
      const newArticle: Article = {
        id: Math.max(...articles.map(a => a.id)) + 1,
        ...articleFormData,
        time: "Just now",
        views: 0,
        likes: 0,
        comments: []
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
      images: [""],
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

  // Crawl news handlers
  const handleEditCrawl = (crawl: CrawlNews) => {
    setEditingCrawl(crawl);
    setCrawlFormData({
      text: crawl.text,
      image: crawl.image || "",
      isActive: crawl.isActive
    });
    setIsCrawlDialogOpen(true);
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
        ...crawlFormData,
        views: 0,
        likes: 0,
        comments: []
      };
      setCrawlNews([...crawlNews, newCrawl]);
    }
    resetCrawlForm();
  };

  const resetCrawlForm = () => {
    setEditingCrawl(null);
    setCrawlFormData({
      text: "",
      image: "",
      isActive: true
    });
    setIsCrawlDialogOpen(false);
  };

  const handleDeleteCrawl = (id: number) => {
    setCrawlNews(crawlNews.filter(crawl => crawl.id !== id));
  };

  const toggleCrawlStatus = (id: number) => {
    setCrawlNews(crawlNews.map(crawl => 
      crawl.id === id ? { ...crawl, isActive: !crawl.isActive } : crawl
    ));
  };

  // Advertisement handlers
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
      type: 'banner',
      isActive: true
    });
    setIsAdDialogOpen(false);
  };

  const handleDeleteAd = (id: number) => {
    setAdvertisements(advertisements.filter(ad => ad.id !== id));
  };

  const toggleAdStatus = (id: number) => {
    setAdvertisements(advertisements.map(ad => 
      ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
    ));
  };

  // Publication handlers
  const handleEditPublication = (publication: Publication) => {
    setEditingPublication(publication);
    setPublicationFormData({
      title: publication.title,
      description: publication.description,
      content: publication.content,
      image: publication.image || "",
      pdf: publication.pdf || "",
      author: publication.author,
      publishDate: publication.publishDate,
      isActive: publication.isActive
    });
    setIsPublicationDialogOpen(true);
  };

  const handleSavePublication = () => {
    if (editingPublication) {
      setPublications(publications.map(publication => 
        publication.id === editingPublication.id 
          ? { ...publication, ...publicationFormData }
          : publication
      ));
    } else {
      const newPublication: Publication = {
        id: Math.max(...publications.map(p => p.id)) + 1,
        ...publicationFormData,
        views: 0,
        likes: 0,
        comments: []
      };
      setPublications([...publications, newPublication]);
    }
    resetPublicationForm();
  };

  const resetPublicationForm = () => {
    setEditingPublication(null);
    setPublicationFormData({
      title: "",
      description: "",
      content: "",
      image: "",
      pdf: "",
      author: "",
      publishDate: "",
      isActive: true
    });
    setIsPublicationDialogOpen(false);
  };

  const handleDeletePublication = (id: number) => {
    setPublications(publications.filter(publication => publication.id !== id));
  };

  const togglePublicationStatus = (id: number) => {
    setPublications(publications.map(publication => 
      publication.id === id ? { ...publication, isActive: !publication.isActive } : publication
    ));
  };

  // Teaching handlers
  const handleEditTeaching = (teaching: Teaching) => {
    setEditingTeaching(teaching);
    setTeachingFormData({
      title: teaching.title,
      description: teaching.description,
      content: teaching.content,
      image: teaching.image || "",
      video: teaching.video || "",
      instructor: teaching.instructor,
      duration: teaching.duration,
      level: teaching.level,
      isActive: teaching.isActive
    });
    setIsTeachingDialogOpen(true);
  };

  const handleSaveTeaching = () => {
    if (editingTeaching) {
      setTeachings(teachings.map(teaching => 
        teaching.id === editingTeaching.id 
          ? { ...teaching, ...teachingFormData }
          : teaching
      ));
    } else {
      const newTeaching: Teaching = {
        id: Math.max(...teachings.map(t => t.id)) + 1,
        ...teachingFormData,
        views: 0,
        likes: 0,
        comments: []
      };
      setTeachings([...teachings, newTeaching]);
    }
    resetTeachingForm();
  };

  const resetTeachingForm = () => {
    setEditingTeaching(null);
    setTeachingFormData({
      title: "",
      description: "",
      content: "",
      image: "",
      video: "",
      instructor: "",
      duration: "",
      level: 'Beginner',
      isActive: true
    });
    setIsTeachingDialogOpen(false);
  };

  const handleDeleteTeaching = (id: number) => {
    setTeachings(teachings.filter(teaching => teaching.id !== id));
  };

  const toggleTeachingStatus = (id: number) => {
    setTeachings(teachings.map(teaching => 
      teaching.id === id ? { ...teaching, isActive: !teaching.isActive } : teaching
    ));
  };

  // New handlers for trending news
  const handleEditTrending = (trending: TrendingNews) => {
    setEditingTrending(trending);
    setTrendingFormData({
      title: trending.title,
      category: trending.category,
      time: trending.time,
      isActive: trending.isActive
    });
    setIsTrendingDialogOpen(true);
  };

  const handleSaveTrending = () => {
    if (editingTrending) {
      setTrendingNews(trendingNews.map(trending => 
        trending.id === editingTrending.id 
          ? { ...trending, ...trendingFormData }
          : trending
      ));
    } else {
      const newTrending: TrendingNews = {
        id: Math.max(...trendingNews.map(t => t.id)) + 1,
        ...trendingFormData,
        views: 0,
        likes: 0,
        comments: []
      };
      setTrendingNews([...trendingNews, newTrending]);
    }
    resetTrendingForm();
  };

  const resetTrendingForm = () => {
    setEditingTrending(null);
    setTrendingFormData({
      title: "",
      category: "",
      time: "",
      isActive: true
    });
    setIsTrendingDialogOpen(false);
  };

  // Handlers for Become TV
  const handleEditBecomeTV = (tv: BecomeTV) => {
    setEditingBecomeTV(tv);
    setBecomeTVFormData({
      title: tv.title,
      description: tv.description,
      youtubeUrl: tv.youtubeUrl,
      thumbnail: tv.thumbnail || "",
      isActive: tv.isActive
    });
    setIsBecomeTVDialogOpen(true);
  };

  const handleSaveBecomeTV = () => {
    if (editingBecomeTV) {
      setBecomeTVs(becomeTVs.map(tv => 
        tv.id === editingBecomeTV.id 
          ? { ...tv, ...becomeTVFormData }
          : tv
      ));
    } else {
      const newBecomeTV: BecomeTV = {
        id: Math.max(...becomeTVs.map(t => t.id)) + 1,
        ...becomeTVFormData,
        views: 0,
        likes: 0,
        comments: []
      };
      setBecomeTVs([...becomeTVs, newBecomeTV]);
    }
    resetBecomeTVForm();
  };

  const resetBecomeTVForm = () => {
    setEditingBecomeTV(null);
    setBecomeTVFormData({
      title: "",
      description: "",
      youtubeUrl: "",
      thumbnail: "",
      isActive: true
    });
    setIsBecomeTVDialogOpen(false);
  };

  // Handlers for Agricultural
  const handleEditAgricultural = (agricultural: Agricultural) => {
    setEditingAgricultural(agricultural);
    setAgriculturalFormData({
      title: agricultural.title,
      excerpt: agricultural.excerpt,
      content: agricultural.content,
      author: agricultural.author,
      image: agricultural.image || "",
      publishDate: agricultural.publishDate,
      isActive: agricultural.isActive
    });
    setIsAgriculturalDialogOpen(true);
  };

  const handleSaveAgricultural = () => {
    if (editingAgricultural) {
      setAgriculturals(agriculturals.map(agricultural => 
        agricultural.id === editingAgricultural.id 
          ? { ...agricultural, ...agriculturalFormData }
          : agricultural
      ));
    } else {
      const newAgricultural: Agricultural = {
        id: Math.max(...agriculturals.map(a => a.id)) + 1,
        ...agriculturalFormData,
        views: 0,
        likes: 0,
        comments: []
      };
      setAgriculturals([...agriculturals, newAgricultural]);
    }
    resetAgriculturalForm();
  };

  const resetAgriculturalForm = () => {
    setEditingAgricultural(null);
    setAgriculturalFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      image: "",
      publishDate: "",
      isActive: true
    });
    setIsAgriculturalDialogOpen(false);
  };

  // Handlers for Education
  const handleEditEducation = (education: Education) => {
    setEditingEducation(education);
    setEducationFormData({
      title: education.title,
      excerpt: education.excerpt,
      content: education.content,
      author: education.author,
      image: education.image || "",
      publishDate: education.publishDate,
      isActive: education.isActive
    });
    setIsEducationDialogOpen(true);
  };

  const handleSaveEducation = () => {
    if (editingEducation) {
      setEducations(educations.map(education => 
        education.id === editingEducation.id 
          ? { ...education, ...educationFormData }
          : education
      ));
    } else {
      const newEducation: Education = {
        id: Math.max(...educations.map(e => e.id)) + 1,
        ...educationFormData,
        views: 0,
        likes: 0,
        comments: []
      };
      setEducations([...educations, newEducation]);
    }
    resetEducationForm();
  };

  const resetEducationForm = () => {
    setEditingEducation(null);
    setEducationFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      image: "",
      publishDate: "",
      isActive: true
    });
    setIsEducationDialogOpen(false);
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
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (loginForm.username === adminAccount.username && loginForm.password === "admin123") {
              setIsAuthenticated(true);
              setLoginError("");
            } else {
              setLoginError("Invalid credentials");
            }
          }} className="space-y-6">
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
          <div className="flex space-x-4">
            <Button 
              onClick={() => {
                setAccountForm({
                  username: adminAccount.username,
                  email: adminAccount.email,
                  fullName: adminAccount.fullName,
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: ""
                });
                setIsAccountDialogOpen(true);
              }}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button 
              onClick={() => {
                setIsAuthenticated(false);
                setLoginForm({ username: "", password: "" });
              }}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-white rounded-xl shadow-lg">
            <TabsTrigger value="articles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Articles
            </TabsTrigger>
            <TabsTrigger value="crawl" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              News Crawl
            </TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Trending
            </TabsTrigger>
            <TabsTrigger value="becometv" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Become TV
            </TabsTrigger>
            <TabsTrigger value="ads" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Ads
            </TabsTrigger>
            <TabsTrigger value="publications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Publications
            </TabsTrigger>
            <TabsTrigger value="teaching" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Teaching
            </TabsTrigger>
            <TabsTrigger value="agricultural" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Agricultural
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-xs">
              Education
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Articles</h2>
              <Button 
                onClick={() => setIsArticleDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Article
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
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
                        <img src={article.images[0]} alt={article.title} className="w-16 h-12 object-cover rounded-lg" />
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${article.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {article.title}
                          </h3>
                          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                            {article.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{article.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>By {article.author}</span>
                          <span>•</span>
                          <span>{article.time}</span>
                          <span>•</span>
                          <span>{article.views} views</span>
                          <span>•</span>
                          <span>{article.likes} likes</span>
                        </div>
                      </div>
                      
                      <InteractionTracker 
                        type="news"
                        itemId={article.id}
                        views={article.views}
                        likes={article.likes}
                        comments={article.comments}
                      />
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
                ))}
              </div>
            </div>
          </TabsContent>

          {/* News Crawl Tab */}
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
                      
                      {crawl.image && (
                        <img src={crawl.image} alt="" className="w-10 h-10 object-cover rounded-full" />
                      )}
                      
                      <div className="flex-1">
                        <p className={`text-sm ${crawl.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {crawl.text}
                        </p>
                      </div>
                      
                      <InteractionTracker 
                        type="news"
                        itemId={crawl.id}
                        views={crawl.views}
                        likes={crawl.likes}
                        comments={crawl.comments}
                      />
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

          {/* Trending News Tab */}
          <TabsContent value="trending" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Trending News</h2>
              <Button 
                onClick={() => setIsTrendingDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Trending News
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {trendingNews.map((trending) => (
                  <div key={trending.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => setTrendingNews(trendingNews.map(t => 
                          t.id === trending.id ? { ...t, isActive: !t.isActive } : t
                        ))}
                        className={`p-2 rounded-lg transition-colors ${
                          trending.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {trending.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${trending.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {trending.title}
                          </h3>
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                            {trending.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{trending.time}</span>
                          <span>•</span>
                          <span>{trending.views} views</span>
                          <span>•</span>
                          <span>{trending.likes} likes</span>
                        </div>
                      </div>
                      
                      <InteractionTracker 
                        type="news"
                        itemId={trending.id}
                        views={trending.views}
                        likes={trending.likes}
                        comments={trending.comments}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTrending(trending)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTrendingNews(trendingNews.filter(t => t.id !== trending.id))}
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

          {/* Become TV Tab */}
          <TabsContent value="becometv" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Become TV</h2>
              <Button 
                onClick={() => setIsBecomeTVDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Video
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {becomeTVs.map((tv) => (
                  <div key={tv.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => setBecomeTVs(becomeTVs.map(t => 
                          t.id === tv.id ? { ...t, isActive: !t.isActive } : t
                        ))}
                        className={`p-2 rounded-lg transition-colors ${
                          tv.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {tv.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      {tv.thumbnail && (
                        <img src={tv.thumbnail} alt={tv.title} className="w-16 h-12 object-cover rounded-lg" />
                      )}
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${tv.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {tv.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{tv.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{tv.views} views</span>
                          <span>•</span>
                          <span>{tv.likes} likes</span>
                        </div>
                      </div>
                      
                      <InteractionTracker 
                        type="news"
                        itemId={tv.id}
                        views={tv.views}
                        likes={tv.likes}
                        comments={tv.comments}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBecomeTV(tv)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setBecomeTVs(becomeTVs.filter(t => t.id !== tv.id))}
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

          {/* Advertisements Tab */}
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
                      
                      {ad.image && (
                        <img src={ad.image} alt={ad.title} className="w-16 h-12 object-cover rounded-lg" />
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${ad.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {ad.title}
                          </h3>
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                            {ad.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{ad.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <a href={ad.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {ad.link}
                          </a>
                        </div>
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

          {/* Publications Tab */}
          <TabsContent value="publications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Publications</h2>
              <Button 
                onClick={() => setIsPublicationDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Publication
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {publications.map((publication) => (
                  <div key={publication.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => togglePublicationStatus(publication.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          publication.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {publication.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      {publication.image && (
                        <img src={publication.image} alt={publication.title} className="w-16 h-12 object-cover rounded-lg" />
                      )}
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${publication.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {publication.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{publication.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>By {publication.author}</span>
                          <span>•</span>
                          <span>{publication.publishDate}</span>
                          <span>•</span>
                          <span>{publication.views} views</span>
                        </div>
                      </div>
                      
                      <InteractionTracker 
                        type="publication"
                        itemId={publication.id}
                        views={publication.views}
                        likes={publication.likes}
                        comments={publication.comments}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPublication(publication)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePublication(publication.id)}
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

          {/* Teaching Tab */}
          <TabsContent value="teaching" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Teaching Content</h2>
              <Button 
                onClick={() => setIsTeachingDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Teaching Content
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {teachings.map((teaching) => (
                  <div key={teaching.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => toggleTeachingStatus(teaching.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          teaching.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {teaching.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      {teaching.image && (
                        <img src={teaching.image} alt={teaching.title} className="w-16 h-12 object-cover rounded-lg" />
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${teaching.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {teaching.title}
                          </h3>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                            {teaching.level}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{teaching.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>By {teaching.instructor}</span>
                          <span>•</span>
                          <span>{teaching.duration}</span>
                          <span>•</span>
                          <span>{teaching.views} views</span>
                        </div>
                      </div>
                      
                      <InteractionTracker 
                        type="teaching"
                        itemId={teaching.id}
                        views={teaching.views}
                        likes={teaching.likes}
                        comments={teaching.comments}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditTeaching(teaching)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTeaching(teaching.id)}
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

          {/* Agricultural Tab */}
          <TabsContent value="agricultural" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Agricultural Content</h2>
              <Button 
                onClick={() => setIsAgriculturalDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Agricultural Content
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {agriculturals.map((agricultural) => (
                  <div key={agricultural.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => setAgriculturals(agriculturals.map(a => 
                          a.id === agricultural.id ? { ...a, isActive: !a.isActive } : a
                        ))}
                        className={`p-2 rounded-lg transition-colors ${
                          agricultural.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {agricultural.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      {agricultural.image && (
                        <img src={agricultural.image} alt={agricultural.title} className="w-16 h-12 object-cover rounded-lg" />
                      )}
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${agricultural.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {agricultural.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{agricultural.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>By {agricultural.author}</span>
                          <span>•</span>
                          <span>{agricultural.publishDate}</span>
                          <span>•</span>
                          <span>{agricultural.views} views</span>
                          <span>•</span>
                          <span>{agricultural.likes} likes</span>
                        </div>
                      </div>
                      
                      <InteractionTracker 
                        type="news"
                        itemId={agricultural.id}
                        views={agricultural.views}
                        likes={agricultural.likes}
                        comments={agricultural.comments}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditAgricultural(agricultural)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAgriculturals(agriculturals.filter(a => a.id !== agricultural.id))}
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

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Manage Education Content</h2>
              <Button 
                onClick={() => setIsEducationDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Education Content
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="space-y-4 p-6">
                {educations.map((education) => (
                  <div key={education.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => setEducations(educations.map(e => 
                          e.id === education.id ? { ...e, isActive: !e.isActive } : e
                        ))}
                        className={`p-2 rounded-lg transition-colors ${
                          education.isActive 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        {education.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      
                      {education.image && (
                        <img src={education.image} alt={education.title} className="w-16 h-12 object-cover rounded-lg" />
                      )}
                      
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${education.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {education.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">{education.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>By {education.author}</span>
                          <span>•</span>
                          <span>{education.publishDate}</span>
                          <span>•</span>
                          <span>{education.views} views</span>
                          <span>•</span>
                          <span>{education.likes} likes</span>
                        </div>
                      </div>
                      
                      <InteractionTracker 
                        type="news"
                        itemId={education.id}
                        views={education.views}
                        likes={education.likes}
                        comments={education.comments}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEducation(education)}
                        className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEducations(educations.filter(e => e.id !== education.id))}
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
                    {categories.map(category => (
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
                  placeholder="Brief article summary"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <FileUpload
                  label="Article Image"
                  accept="image/*"
                  onFileSelect={(file) => {
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setArticleFormData({...articleFormData, images: [imageUrl]});
                    }
                  }}
                  preview={articleFormData.images[0]}
                  type="image"
                />
              </div>
              
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
                <input
                  type="text"
                  value={crawlFormData.text}
                  onChange={(e) => setCrawlFormData({...crawlFormData, text: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter news text"
                />
              </div>
              
              <div>
                <FileUpload
                  label="Icon Image (optional)"
                  accept="image/*"
                  onFileSelect={(file) => {
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setCrawlFormData({...crawlFormData, image: imageUrl});
                    }
                  }}
                  preview={crawlFormData.image}
                  type="image"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="crawlActive"
                  checked={crawlFormData.isActive}
                  onChange={(e) => setCrawlFormData({...crawlFormData, isActive: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="crawlActive" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingAd ? "Edit Advertisement" : "Add Advertisement"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <Textarea
                  value={adFormData.description}
                  onChange={(e) => setAdFormData({...adFormData, description: e.target.value})}
                  placeholder="Brief advertisement description"
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Advertisement Type</label>
                <select
                  value={adFormData.type}
                  onChange={(e) => setAdFormData({...adFormData, type: e.target.value as 'banner' | 'sidebar' | 'inline'})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="banner">Banner (top of page)</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="inline">Inline (between content)</option>
                </select>
              </div>
              
              <div>
                <FileUpload
                  label="Advertisement Image"
                  accept="image/*"
                  onFileSelect={(file) => {
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setAdFormData({...adFormData, image: imageUrl});
                    }
                  }}
                  preview={adFormData.image}
                  type="image"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="adActive"
                  checked={adFormData.isActive}
                  onChange={(e) => setAdFormData({...adFormData, isActive: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="adActive" className="text-sm font-medium text-gray-700">
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

        {/* Publication Dialog */}
        <Dialog open={isPublicationDialogOpen} onOpenChange={setIsPublicationDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingPublication ? "Edit Publication" : "Add Publication"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={publicationFormData.title}
                  onChange={(e) => setPublicationFormData({...publicationFormData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter publication title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={publicationFormData.author}
                    onChange={(e) => setPublicationFormData({...publicationFormData, author: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter author name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="date"
                    value={publicationFormData.publishDate}
                    onChange={(e) => setPublicationFormData({...publicationFormData, publishDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <Textarea
                  value={publicationFormData.description}
                  onChange={(e) => setPublicationFormData({...publicationFormData, description: e.target.value})}
                  placeholder="Brief publication description"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FileUpload
                    label="Cover Image"
                    accept="image/*"
                    onFileSelect={(file) => {
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setPublicationFormData({...publicationFormData, image: imageUrl});
                      }
                    }}
                    preview={publicationFormData.image}
                    type="image"
                  />
                </div>
                
                <div>
                  <FileUpload
                    label="PDF Document (optional)"
                    accept=".pdf"
                    onFileSelect={(file) => {
                      if (file) {
                        const pdfUrl = URL.createObjectURL(file);
                        setPublicationFormData({...publicationFormData, pdf: pdfUrl});
                      }
                    }}
                    preview={publicationFormData.pdf}
                    type="pdf"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                <Textarea
                  value={publicationFormData.content}
                  onChange={(e) => setPublicationFormData({...publicationFormData, content: e.target.value})}
                  placeholder="Full publication content"
                  rows={8}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="publicationActive"
                  checked={publicationFormData.isActive}
                  onChange={(e) => setPublicationFormData({...publicationFormData, isActive: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="publicationActive" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={resetPublicationForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSavePublication}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingPublication ? "Update" : "Create"} Publication
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Teaching Dialog */}
        <Dialog open={isTeachingDialogOpen} onOpenChange={setIsTeachingDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingTeaching ? "Edit Teaching Content" : "Add Teaching Content"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={teachingFormData.title}
                  onChange={(e) => setTeachingFormData({...teachingFormData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter course title"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor</label>
                  <input
                    type="text"
                    value={teachingFormData.instructor}
                    onChange={(e) => setTeachingFormData({...teachingFormData, instructor: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter instructor name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={teachingFormData.duration}
                    onChange={(e) => setTeachingFormData({...teachingFormData, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="e.g. 40 hours"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                  <select
                    value={teachingFormData.level}
                    onChange={(e) => setTeachingFormData({...teachingFormData, level: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced'})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <Textarea
                  value={teachingFormData.description}
                  onChange={(e) => setTeachingFormData({...teachingFormData, description: e.target.value})}
                  placeholder="Brief course description"
                  rows={3}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FileUpload
                    label="Course Image"
                    accept="image/*"
                    onFileSelect={(file) => {
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setTeachingFormData({...teachingFormData, image: imageUrl});
                      }
                    }}
                    preview={teachingFormData.image}
                    type="image"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Video URL (optional)</label>
                  <input
                    type="url"
                    value={teachingFormData.video || ""}
                    onChange={(e) => setTeachingFormData({...teachingFormData, video: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                <Textarea
                  value={teachingFormData.content}
                  onChange={(e) => setTeachingFormData({...teachingFormData, content: e.target.value})}
                  placeholder="Full course content or syllabus"
                  rows={8}
                  className="rounded-xl border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="teachingActive"
                  checked={teachingFormData.isActive}
                  onChange={(e) => setTeachingFormData({...teachingFormData, isActive: e.target.checked})}
                  className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="teachingActive" className="text-sm font-medium text-gray-700">
                  Active (visible on website)
                </label>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={resetTeachingForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveTeaching}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingTeaching ? "Update" : "Create"} Teaching Content
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Trending News Dialog */}
        <Dialog open={isTrendingDialogOpen} onOpenChange={setIsTrendingDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                {editingTrending ? "Edit Trending News" : "Add Trending News"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={trendingFormData.title}
                  onChange={(e) => setTrendingFormData({...trendingFormData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  placeholder="Enter trending news title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={trendingFormData.category}
                  onChange={(e) => setTrendingFormData({...trendingFormData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={resetTrendingForm}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveTrending}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingTrending ? "Update" : "Create"} Trending News
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
                  <input
                    type="text"
                    value={accountForm.username}
                    onChange={(e) => setAccountForm({...accountForm, username: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={accountForm.email}
                    onChange={(e) => setAccountForm({...accountForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={accountForm.fullName}
                  onChange={(e) => setAccountForm({...accountForm, fullName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={accountForm.currentPassword}
                      onChange={(e) => setAccountForm({...accountForm, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={accountForm.newPassword}
                        onChange={(e) => setAccountForm({...accountForm, newPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={accountForm.confirmPassword}
                        onChange={(e) => setAccountForm({...accountForm, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAccountDialogOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
                      alert("New passwords don't match");
                      return;
                    }
                    
                    setAdminAccount({
                      username: accountForm.username,
                      email: accountForm.email,
                      fullName: accountForm.fullName
                    });
                    
                    setIsAccountDialogOpen(false);
                    alert("Account updated successfully!");
                  }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
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
