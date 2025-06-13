import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Edit, Plus, Upload, User, Settings, LogOut, Eye, EyeOff, FileText, Image, Video, Sprout, GraduationCap, TrendingUp, BookOpen, Newspaper, Calendar, Clock, MapPin, Users, Star, MessageCircle, ThumbsUp } from "lucide-react";
import InteractionTracker from "@/components/InteractionTracker";
import FileUpload from "@/components/FileUpload";
import BecomeTVSection from "@/components/BecomeTVSection";
import AdminProfile from "@/components/AdminProfile";
import MediaUpload from "@/components/MediaUpload";
import EngagementTracker from "@/components/EngagementTracker";

const Admin = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  
  // Enhanced admin profile state
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@becomeconcepts.com",
    role: "Super Admin",
    avatar: "/placeholder.svg?height=100&width=100",
    whatsappNumber: "254798890521",
    bio: "Experienced administrator managing BecomeConcepts platform with expertise in content management and user engagement."
  });

  // Content States with enhanced data structures
  const [trendingNews, setTrendingNews] = useState([
    {
      id: 1,
      title: "Breaking: Major Policy Change Announced",
      content: "The government has announced a significant policy shift that will affect various sectors across the country. This comprehensive reform aims to modernize infrastructure and boost economic growth through strategic investments.",
      excerpt: "Government announces significant policy shift affecting multiple sectors...",
      media: [
        {
          id: "1",
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop",
          name: "policy-announcement.jpg",
          size: 245760
        }
      ],
      category: "Politics",
      tags: ["policy", "government", "reform"],
      author: "News Team",
      date: "2024-01-15",
      status: "published" as const,
      featured: true,
      priority: "high" as const,
      engagement: {
        views: 1245,
        likes: 89,
        comments: [
          { id: 1, author: "John Doe", content: "This is a game changer!", timestamp: "2024-01-15 14:30", likes: 5, replies: [] },
          { id: 2, author: "Jane Smith", content: "I'm not sure about this...", timestamp: "2024-01-15 15:45", likes: 2, replies: [] }
        ]
      }
    },
    {
      id: 2,
      title: "New Research Reveals Breakthrough in Renewable Energy",
      content: "Scientists have discovered a new method for harnessing solar energy with unprecedented efficiency rates. This breakthrough could revolutionize the renewable energy sector and accelerate the transition to clean energy sources.",
      excerpt: "Scientists discover new solar energy method with unprecedented efficiency...",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop",
      category: "Science",
      tags: ["renewable", "solar", "research"],
      author: "Science Desk",
      date: "2024-01-14",
      status: "published",
      featured: false,
      priority: "medium",
      views: 982,
      likes: 76,
      comments: [
        { id: 3, author: "Robert Johnson", content: "Amazing progress!", timestamp: "2024-01-14 10:15" }
      ]
    }
  ]);

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "The Future of Sustainable Agriculture",
      content: "Exploring innovative approaches to farming that prioritize environmental stewardship while maintaining productivity. This comprehensive analysis examines cutting-edge techniques and their potential impact on global food security.",
      excerpt: "Exploring innovative approaches to sustainable farming practices...",
      author: "Dr. Emily Chen",
      authorBio: "Agricultural scientist with 15 years of experience in sustainable farming",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
      category: "Agriculture",
      tags: ["sustainability", "farming", "environment"],
      date: "2024-01-10",
      readTime: "8 min read",
      status: "published",
      featured: true,
      views: 756,
      likes: 42,
      comments: [
        { id: 1, author: "Michael Brown", content: "Great insights!", timestamp: "2024-01-11 09:20" }
      ]
    }
  ]);

  const [newsCrawl, setNewsCrawl] = useState([
    {
      id: 1,
      text: "Stock markets reach all-time high amid economic recovery",
      link: "/news/stock-markets",
      date: "2024-01-15",
      category: "Finance",
      priority: "high",
      status: "active",
      duration: 30,
      views: 345,
      likes: 21,
      comments: []
    }
  ]);

  const [publications, setPublications] = useState([
    {
      id: 1,
      title: "Advancements in Machine Learning Applications",
      authors: "Dr. Alan Smith, Dr. Lisa Johnson",
      journal: "Journal of Artificial Intelligence",
      year: "2023",
      volume: "15",
      issue: "3",
      pages: "45-67",
      doi: "10.1234/jai.2023.15.3.45",
      abstract: "This paper explores recent advancements in machine learning applications across various industries...",
      keywords: ["machine learning", "AI", "applications"],
      pdfFile: null,
      link: "/publications/machine-learning",
      category: "Technology",
      status: "published",
      views: 412,
      likes: 37,
      comments: []
    }
  ]);

  const [teaching, setTeaching] = useState([
    {
      id: 1,
      title: "Introduction to Data Science",
      description: "A comprehensive course covering the fundamentals of data science and analytics, including statistical methods, data visualization, and machine learning basics.",
      content: "This course provides a solid foundation in data science principles and practical applications using modern tools and techniques.",
      code: "CS401",
      credits: 3,
      semester: "Fall 2024",
      schedule: "Mon/Wed/Fri 10:00-11:00 AM",
      location: "Science Building, Room 305",
      capacity: 30,
      enrolled: 28,
      prerequisites: "Statistics 101, Programming Fundamentals",
      textbooks: "Introduction to Statistical Learning, Python for Data Analysis",
      level: "Beginner" as const,
      media: [
        {
          id: "1",
          type: "pdf" as const,
          url: "/syllabus-data-science.pdf",
          name: "Data Science Syllabus.pdf",
          size: 156720
        }
      ],
      status: "active" as const,
      engagement: {
        views: 678,
        likes: 52,
        comments: [
          { id: 1, author: "Student123", content: "Great course structure!", timestamp: "2024-01-20 14:15", likes: 8, replies: [] }
        ]
      }
    }
  ]);

  const [becomeTVVideos, setBecomeTVVideos] = useState([
    {
      id: 1,
      title: "Understanding Market Trends",
      description: "Expert analysis of current market conditions and future projections with insights from leading economists.",
      videoUrl: "https://www.youtube.com/embed/example1",
      youtubeId: "example1",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      duration: "15:30",
      category: "Finance",
      tags: ["market", "trends", "analysis"],
      date: "2024-01-01",
      status: "published",
      featured: true,
      views: 1245,
      likes: 98,
      comments: [
        { id: 1, author: "InvestorPro", content: "Very insightful analysis!", timestamp: "2024-01-02 10:30" }
      ]
    }
  ]);

  const [agriculturalItems, setAgriculturalItems] = useState([
    {
      id: 1,
      title: "Sustainable Farming Practices",
      description: "A comprehensive guide to implementing eco-friendly farming techniques that improve soil health and crop yields.",
      content: "Detailed analysis of sustainable farming methods including crop rotation, organic fertilizers, and water conservation techniques...",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop",
      category: "Farming Techniques",
      tags: ["sustainable", "organic", "soil health"],
      author: "Agricultural Team",
      date: "2024-01-20",
      region: "East Africa",
      cropTypes: ["maize", "beans", "vegetables"],
      season: "Rainy Season",
      difficulty: "Intermediate",
      cost: "Low",
      status: "published",
      views: 876,
      likes: 64,
      comments: [
        { id: 1, author: "FarmerJoe", content: "These methods have worked well for me!", timestamp: "2024-01-21 09:45" }
      ]
    }
  ]);

  const [educationItems, setEducationItems] = useState([
    {
      id: 1,
      title: "Modern Teaching Methodologies",
      description: "Exploring innovative approaches to education in the digital age, including blended learning and technology integration.",
      content: "Comprehensive overview of contemporary teaching methods that engage students and improve learning outcomes...",
      media: [
        {
          id: "1",
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop",
          name: "teaching-methods.jpg",
          size: 287340
        }
      ],
      category: "Teaching Methods",
      tags: ["education", "technology", "innovation"],
      author: "Education Team",
      date: "2024-01-10",
      level: "Intermediate" as const,
      subject: "General Education",
      duration: "Professional Development",
      certification: "CPD Credits Available",
      status: "published" as const,
      engagement: {
        views: 645,
        likes: 47,
        comments: [
          { id: 1, author: "TeacherX", content: "I've implemented some of these methods with great results!", timestamp: "2024-01-11 14:20", likes: 12, replies: [] }
        ]
      }
    }
  ]);

  // Add new advertisements state
  const [advertisements, setAdvertisements] = useState([
    {
      id: 1,
      title: "Premium Business Solutions",
      description: "Discover our comprehensive business solutions designed to accelerate your company's growth and success.",
      content: "Our premium business solutions offer cutting-edge technology, expert consultation, and ongoing support to help your business thrive in today's competitive market.",
      media: [
        {
          id: "1",
          type: "image" as const,
          url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          name: "business-solutions.jpg",
          size: 342560
        }
      ],
      category: "Business",
      tags: ["business", "solutions", "growth"],
      author: "Marketing Team",
      date: "2024-01-20",
      status: "published" as const,
      featured: true,
      targetAudience: "Business Owners",
      budget: 5000,
      duration: "30 days",
      engagement: {
        views: 892,
        likes: 64,
        comments: [
          { id: 1, author: "Business Owner", content: "Interested in learning more!", timestamp: "2024-01-20 10:30", likes: 3, replies: [] }
        ]
      }
    }
  ]);

  // UI State Management
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemType, setItemType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Enhanced Form State
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    description: "",
    media: [] as any[],
    date: "",
    author: "",
    category: "",
    tags: "",
    status: "draft" as const,
    featured: false,
    priority: "medium" as const,
    level: "Beginner" as const,
    targetAudience: "",
    budget: "",
    duration: "",
    subject: "",
    certification: "",
    code: "",
    credits: "",
    schedule: "",
    location: "",
    capacity: "",
    enrolled: "",
    prerequisites: "",
    textbooks: "",
    semester: "",
    image: "",
    authorBio: "",
    link: "",
    videoUrl: "",
    youtubeId: "",
    text: "",
    authors: "",
    journal: "",
    year: "",
    volume: "",
    issue: "",
    pages: "",
    doi: "",
    abstract: "",
    keywords: "",
    pdfFile: null,
    syllabus: null,
    thumbnail: "",
    region: "",
    cropTypes: "",
    season: "",
    difficulty: "",
    cost: "",
    readTime: ""
  });

  // Authentication Functions
  const handleLogin = () => {
    if (loginForm.username === "admin" && loginForm.password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: "", password: "" });
  };

  // CRUD Operations
  const handleAddItem = () => {
    const baseItem = {
      id: Date.now(),
      engagement: {
        views: 0,
        likes: 0,
        comments: []
      },
      status: formData.status,
      date: formData.date,
      author: formData.author,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      media: formData.media
    };

    let newItem;

    switch (activeTab) {
      case "trending":
        newItem = {
          ...baseItem,
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          featured: formData.featured,
          priority: formData.priority
        };
        setTrendingNews([...trendingNews, newItem]);
        break;

      case "advertisements":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          featured: formData.featured,
          targetAudience: formData.targetAudience,
          budget: parseInt(formData.budget) || 0,
          duration: formData.duration
        };
        setAdvertisements([...advertisements, newItem]);
        break;

      case "teaching":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          code: formData.code,
          credits: parseInt(formData.credits) || 3,
          semester: formData.semester,
          schedule: formData.schedule,
          location: formData.location,
          capacity: parseInt(formData.capacity) || 30,
          enrolled: parseInt(formData.enrolled) || 0,
          prerequisites: formData.prerequisites,
          textbooks: formData.textbooks,
          level: formData.level
        };
        setTeaching([...teaching, newItem]);
        break;

      case "education":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          level: formData.level,
          subject: formData.subject,
          duration: formData.duration,
          certification: formData.certification
        };
        setEducationItems([...educationItems, newItem]);
        break;

      case "articles":
        newItem = {
          ...baseItem,
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          author: formData.author,
          authorBio: formData.authorBio,
          image: formData.image,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          date: formData.date,
          readTime: formData.readTime,
          featured: formData.featured
        };
        setArticles([...articles, newItem]);
        break;
      case "news":
        newItem = {
          ...baseItem,
          text: formData.text,
          link: formData.link,
          date: formData.date,
          category: formData.category,
          priority: formData.priority,
          duration: parseInt(formData.duration) || 30
        };
        setNewsCrawl([...newsCrawl, newItem]);
        break;
      case "publications":
        newItem = {
          ...baseItem,
          title: formData.title,
          authors: formData.authors,
          journal: formData.journal,
          year: formData.year,
          volume: formData.volume,
          issue: formData.issue,
          pages: formData.pages,
          doi: formData.doi,
          abstract: formData.abstract,
          keywords: formData.keywords.split(',').map(keyword => keyword.trim()),
          pdfFile: formData.pdfFile,
          link: formData.link,
          category: formData.category
        };
        setPublications([...publications, newItem]);
        break;
      case "become-tv":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          videoUrl: formData.videoUrl,
          youtubeId: formData.youtubeId,
          thumbnail: formData.thumbnail,
          duration: formData.duration,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          date: formData.date,
          featured: formData.featured
        };
        setBecomeTVVideos([...becomeTVVideos, newItem]);
        break;
      case "agricultural":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          content: formData.content,
          image: formData.image,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          author: formData.author,
          date: formData.date,
          region: formData.region,
          cropTypes: formData.cropTypes.split(',').map(crop => crop.trim()),
          season: formData.season,
          difficulty: formData.difficulty,
          cost: formData.cost
        };
        setAgriculturalItems([...agriculturalItems, newItem]);
        break;
      default:
        break;
    }

    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditItem = () => {
    let updatedItem;

    switch (itemType) {
      case "trending":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          image: formData.image,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          author: formData.author,
          date: formData.date,
          featured: formData.featured,
          priority: formData.priority,
          status: formData.status
        };
        setTrendingNews(trendingNews.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "articles":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          author: formData.author,
          authorBio: formData.authorBio,
          image: formData.image,
          category: formData.category,
          tags: formData.tags.split(',').map(tag => tag.trim()),
          date: formData.date,
          readTime: formData.readTime,
          featured: formData.featured,
          status: formData.status
        };
        setArticles(articles.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      default:
        break;
    }

    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeleteItem = () => {
    switch (itemType) {
      case "trending":
        setTrendingNews(trendingNews.filter(item => item.id !== currentItem.id));
        break;
      case "articles":
        setArticles(articles.filter(item => item.id !== currentItem.id));
        break;
      case "news":
        setNewsCrawl(newsCrawl.filter(item => item.id !== currentItem.id));
        break;
      case "publications":
        setPublications(publications.filter(item => item.id !== currentItem.id));
        break;
      case "teaching":
        setTeaching(teaching.filter(item => item.id !== currentItem.id));
        break;
      case "become-tv":
        setBecomeTVVideos(becomeTVVideos.filter(item => item.id !== currentItem.id));
        break;
      case "agricultural":
        setAgriculturalItems(agriculturalItems.filter(item => item.id !== currentItem.id));
        break;
      case "education":
        setEducationItems(educationItems.filter(item => item.id !== currentItem.id));
        break;
      case "advertisements":
        setAdvertisements(advertisements.filter(item => item.id !== currentItem.id));
        break;
      default:
        break;
    }

    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (item, type) => {
    setCurrentItem(item);
    setItemType(type);
    setFormData({
      title: item.title || "",
      content: item.content || "",
      excerpt: item.excerpt || "",
      image: item.image || "",
      date: item.date || "",
      author: item.author || "",
      authorBio: item.authorBio || "",
      link: item.link || "",
      videoUrl: item.videoUrl || "",
      youtubeId: item.youtubeId || "",
      description: item.description || "",
      text: item.text || "",
      authors: item.authors || "",
      journal: item.journal || "",
      year: item.year || "",
      volume: item.volume || "",
      issue: item.issue || "",
      pages: item.pages || "",
      doi: item.doi || "",
      abstract: item.abstract || "",
      keywords: Array.isArray(item.keywords) ? item.keywords.join(', ') : item.keywords || "",
      pdfFile: item.pdfFile || null,
      semester: item.semester || "",
      schedule: item.schedule || "",
      location: item.location || "",
      capacity: item.capacity?.toString() || "",
      enrolled: item.enrolled?.toString() || "",
      code: item.code || "",
      credits: item.credits?.toString() || "",
      prerequisites: item.prerequisites || "",
      textbooks: item.textbooks || "",
      syllabus: item.syllabus || null,
      thumbnail: item.thumbnail || "",
      duration: item.duration || "",
      category: item.category || "",
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || "",
      status: item.status || "draft",
      featured: item.featured || false,
      priority: item.priority || "medium",
      region: item.region || "",
      cropTypes: Array.isArray(item.cropTypes) ? item.cropTypes.join(', ') : item.cropTypes || "",
      season: item.season || "",
      difficulty: item.difficulty || "",
      cost: item.cost || "",
      level: item.level || "Beginner",
      subject: item.subject || "",
      certification: item.certification || "",
      readTime: item.readTime || "",
      media: item.media || [],
      targetAudience: item.targetAudience || "",
      budget: item.budget?.toString() || ""
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item, type) => {
    setCurrentItem(item);
    setItemType(type);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "",
      date: "",
      author: "",
      authorBio: "",
      link: "",
      videoUrl: "",
      youtubeId: "",
      description: "",
      text: "",
      authors: "",
      journal: "",
      year: "",
      volume: "",
      issue: "",
      pages: "",
      doi: "",
      abstract: "",
      keywords: "",
      pdfFile: null,
      semester: "",
      schedule: "",
      location: "",
      capacity: "",
      enrolled: "",
      code: "",
      credits: "",
      prerequisites: "",
      textbooks: "",
      syllabus: null,
      thumbnail: "",
      duration: "",
      category: "",
      tags: "",
      status: "draft",
      featured: false,
      priority: "medium",
      region: "",
      cropTypes: "",
      season: "",
      difficulty: "",
      cost: "",
      level: "Beginner",
      subject: "",
      certification: "",
      readTime: "",
      media: [],
      targetAudience: "",
      budget: ""
    });
    setCurrentItem(null);
    setItemType("");
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileSelect = (file, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: file
    });
  };

  const handleMediaSelect = (media) => {
    setFormData({
      ...formData,
      media: media
    });
  };

  const updateAdminProfile = (newProfile) => {
    setAdminProfile(newProfile);
    // Here you would typically save to backend
    console.log("Profile updated:", newProfile);
  };

  const toggleItemStatus = (item, type) => {
    const newStatus = item.status === 'published' ? 'draft' : 'published';
    
    switch (type) {
      case "trending":
        setTrendingNews(trendingNews.map(news => 
          news.id === item.id ? { ...news, status: newStatus } : news
        ));
        break;
      case "articles":
        setArticles(articles.map(article => 
          article.id === item.id ? { ...article, status: newStatus } : article
        ));
        break;
      default:
        break;
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sign in to access the admin dashboard
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Enter your username"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="Enter your password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              Sign In
            </Button>
            <div className="text-center text-sm text-gray-500">
              Demo credentials: admin / password
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Manage your content and settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={adminProfile.avatar}
                  alt="Admin"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{adminProfile.name}</p>
                  <p className="text-xs text-gray-500">{adminProfile.role}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="advertisements">Ads</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="agricultural">Agriculture</TabsTrigger>
            <TabsTrigger value="become-tv">TV</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Total Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{articles.length}</div>
                  <p className="text-blue-100 text-sm">Published content</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Trending News</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{trendingNews.length}</div>
                  <p className="text-green-100 text-sm">Active stories</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Publications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{publications.length}</div>
                  <p className="text-purple-100 text-sm">Research papers</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium">Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{becomeTVVideos.length}</div>
                  <p className="text-orange-100 text-sm">Become TV content</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest content updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...trendingNews, ...articles].slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <Badge variant="secondary">{item.status || 'published'}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Content Statistics</CardTitle>
                  <CardDescription>Performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Views</span>
                      <span className="font-bold">
                        {[...trendingNews, ...articles, ...publications, ...becomeTVVideos].reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Likes</span>
                      <span className="font-bold">
                        {[...trendingNews, ...articles, ...publications, ...becomeTVVideos].reduce((sum, item) => sum + (item.likes || 0), 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Comments</span>
                      <span className="font-bold">
                        {[...trendingNews, ...articles, ...publications, ...becomeTVVideos].reduce((sum, item) => sum + (item.comments?.length || 0), 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* New Admin Profile Tab */}
          <TabsContent value="profile">
            <AdminProfile 
              profile={adminProfile}
              onUpdateProfile={updateAdminProfile}
            />
          </TabsContent>

          {/* Enhanced Trending News Management */}
          <TabsContent value="trending">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span>Trending News Management</span>
                    </CardTitle>
                    <CardDescription>Manage breaking news and trending stories with rich media</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("trending");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add News
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trendingNews.map((news) => (
                    <Card key={news.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-48 h-32 rounded-lg overflow-hidden bg-gray-100">
                            {news.media?.[0] && news.media[0].type === 'image' && (
                              <img 
                                src={news.media[0].url} 
                                alt={news.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {!news.media && news.image && (
                              <img 
                                src={news.image} 
                                alt={news.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-lg text-gray-900">{news.title}</h3>
                                {news.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                <Badge variant={news.priority === 'high' ? 'destructive' : news.priority === 'medium' ? 'default' : 'secondary'}>
                                  {news.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={news.status === 'published'}
                                  onCheckedChange={() => toggleItemStatus(news, "trending")}
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openEditDialog(news, "trending")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => openDeleteDialog(news, "trending")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">{news.excerpt || news.content}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-4">
                                <span>{news.date}</span>
                                <span>{news.author}</span>
                                <Badge variant="outline">{news.category}</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                {news.media?.length > 0 && (
                                  <Badge variant="secondary" className="text-xs">
                                    {news.media.length} Media
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            {news.engagement ? (
                              <EngagementTracker
                                itemType="news"
                                itemId={news.id}
                                engagement={news.engagement}
                                onUpdateEngagement={(engagement) => {
                                  setTrendingNews(prev => prev.map(n => 
                                    n.id === news.id ? { ...n, engagement } : n
                                  ));
                                }}
                                isAdmin={true}
                              />
                            ) : (
                              <InteractionTracker
                                itemType="news"
                                itemId={news.id}
                                interactions={{
                                  views: news.views,
                                  likes: news.likes,
                                  comments: news.comments
                                }}
                                onUpdateInteractions={(interactions) => {
                                  setTrendingNews(prev => prev.map(n => 
                                    n.id === news.id ? { ...n, ...interactions } : n
                                  ));
                                }}
                                isAdmin={true}
                              />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Advertisements Management */}
          <TabsContent value="advertisements">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Image className="h-5 w-5 text-green-600" />
                      <span>Advertisement Management</span>
                    </CardTitle>
                    <CardDescription>Create and manage advertisements with rich media content</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("advertisements");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Advertisement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {advertisements.map((ad) => (
                    <Card key={ad.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-48 h-32 rounded-lg overflow-hidden bg-gray-100">
                            {ad.media?.[0] && ad.media[0].type === 'image' && (
                              <img 
                                src={ad.media[0].url} 
                                alt={ad.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-lg text-gray-900">{ad.title}</h3>
                                {ad.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                <Badge variant="outline">${ad.budget}</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openEditDialog(ad, "advertisements")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => openDeleteDialog(ad, "advertisements")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">{ad.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-4">
                                <span>{ad.duration}</span>
                                <span>{ad.targetAudience}</span>
                                <Badge variant="outline">{ad.category}</Badge>
                              </div>
                            </div>
                            
                            <EngagementTracker
                              itemType="advertisement"
                              itemId={ad.id}
                              engagement={ad.engagement}
                              onUpdateEngagement={(engagement) => {
                                setAdvertisements(prev => prev.map(a => 
                                  a.id === ad.id ? { ...a, engagement } : a
                                ));
                              }}
                              isAdmin={true}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Teaching Management with Levels */}
          <TabsContent value="teaching">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                      <span>Teaching Management</span>
                    </CardTitle>
                    <CardDescription>Manage courses and teaching materials with difficulty levels</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("teaching");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teaching.map((course) => (
                    <Card key={course.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
                            <Badge variant={
                              course.level === 'Beginner' ? 'secondary' : 
                              course.level === 'Intermediate' ? 'default' : 'destructive'
                            }>
                              {course.level}
                            </Badge>
                            <Badge variant="outline">{course.code}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditDialog(course, "teaching")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => openDeleteDialog(course, "teaching")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{course.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                          <div>
                            <span className="font-medium">Credits:</span> {course.credits}
                          </div>
                          <div>
                            <span className="font-medium">Enrolled:</span> {course.enrolled}/{course.capacity}
                          </div>
                          <div>
                            <span className="font-medium">Schedule:</span> {course.schedule}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {course.location}
                          </div>
                        </div>
                        
                        {course.engagement ? (
                          <EngagementTracker
                            itemType="teaching"
                            itemId={course.id}
                            engagement={course.engagement}
                            onUpdateEngagement={(engagement) => {
                              setTeaching(prev => prev.map(t => 
                                t.id === course.id ? { ...t, engagement } : t
                              ));
                            }}
                            isAdmin={true}
                          />
                        ) : (
                          <InteractionTracker
                            itemType="teaching"
                            itemId={course.id}
                            interactions={{
                              views: course.views || 0,
                              likes: course.likes || 0,
                              comments: course.comments || []
                            }}
                            onUpdateInteractions={(interactions) => {
                              setTeaching(prev => prev.map(t => 
                                t.id === course.id ? { ...t, ...interactions } : t
                              ));
                            }}
                            isAdmin={true}
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Education Management with Levels */}
          <TabsContent value="education">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                      <span>Education Content Management</span>
                    </CardTitle>
                    <CardDescription>Manage educational resources with difficulty levels</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("education");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {educationItems.map((item) => (
                    <Card key={item.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-48 h-32 rounded-lg overflow-hidden bg-gray-100">
                            {item.media?.[0] && item.media[0].type === 'image' && (
                              <img 
                                src={item.media[0].url} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                            {!item.media && item.image && (
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                                <Badge variant={
                                  item.level === 'Beginner' ? 'secondary' : 
                                  item.level === 'Intermediate' ? 'default' : 'destructive'
                                }>
                                  {item.level}
                                </Badge>
                                <Badge variant="outline">{item.subject}</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openEditDialog(item, "education")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => openDeleteDialog(item, "education")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-4">
                                <span>{item.duration}</span>
                                <span>{item.certification}</span>
                                <Badge variant="outline">{item.category}</Badge>
                              </div>
                            </div>
                            
                            {item.engagement ? (
                              <EngagementTracker
                                itemType="education"
                                itemId={item.id}
                                engagement={item.engagement}
                                onUpdateEngagement={(engagement) => {
                                  setEducationItems(prev => prev.map(e => 
                                    e.id === item.id ? { ...e, engagement } : e
                                  ));
                                }}
                                isAdmin={true}
                              />
                            ) : (
                              <InteractionTracker
                                itemType="education"
                                itemId={item.id}
                                interactions={{
                                  views: item.views || 0,
                                  likes: item.likes || 0,
                                  comments: item.comments || []
                                }}
                                onUpdateInteractions={(interactions) => {
                                  setEducationItems(prev => prev.map(e => 
                                    e.id === item.id ? { ...e, ...interactions } : e
                                  ));
                                }}
                                isAdmin={true}
                              />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agricultural Content Management */}
          <TabsContent value="agricultural">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Sprout className="h-5 w-5 text-green-600" />
                      <span>Agricultural Content Management</span>
                    </CardTitle>
                    <CardDescription>Manage farming and agricultural resources</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("agricultural");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Agricultural Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {agriculturalItems.map((item) => (
                    <Card key={item.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-48 h-32 rounded-lg overflow-hidden bg-gray-100">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                                <Badge variant="outline">{item.difficulty}</Badge>
                                <Badge variant="secondary">{item.region}</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openEditDialog(item, "agricultural")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => openDeleteDialog(item, "agricultural")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{item.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-4">
                                <span>{item.season}</span>
                                <span>Cost: {item.cost}</span>
                                <Badge variant="outline">{item.category}</Badge>
                              </div>
                            </div>
                            
                            <InteractionTracker
                              itemType="agricultural"
                              itemId={item.id}
                              interactions={{
                                views: item.views,
                                likes: item.likes,
                                comments: item.comments
                              }}
                              onUpdateInteractions={(interactions) => {
                                setAgriculturalItems(prev => prev.map(a => 
                                  a.id === item.id ? { ...a, ...interactions } : a
                                ));
                              }}
                              isAdmin={true}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Become TV Management */}
          <TabsContent value="become-tv">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Video className="h-5 w-5 text-red-600" />
                      <span>Become TV Management</span>
                    </CardTitle>
                    <CardDescription>Manage video content and YouTube integrations</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("become-tv");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {becomeTVVideos.map((video) => (
                    <Card key={video.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="lg:w-48 h-32 rounded-lg overflow-hidden bg-gray-100 relative">
                            {video.thumbnail && (
                              <>
                                <img 
                                  src={video.thumbnail} 
                                  alt={video.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                  <div className="bg-red-600 text-white rounded-full p-2">
                                    <Video className="h-5 w-5" />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-lg text-gray-900">{video.title}</h3>
                                {video.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                <Badge variant="outline">{video.duration}</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => openEditDialog(video, "become-tv")}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => openDeleteDialog(video, "become-tv")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{video.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-4">
                                <span>{video.date}</span>
                                <Badge variant="outline">{video.category}</Badge>
                              </div>
                            </div>
                            
                            <InteractionTracker
                              itemType="news"
                              itemId={video.id}
                              interactions={{
                                views: video.views,
                                likes: video.likes,
                                comments: video.comments
                              }}
                              onUpdateInteractions={(interactions) => {
                                setBecomeTVVideos(prev => prev.map(v => 
                                  v.id === video.id ? { ...v, ...interactions } : v
                                ));
                              }}
                              isAdmin={true}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Crawl Management */}
          <TabsContent value="news">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Newspaper className="h-5 w-5 text-blue-600" />
                      <span>News Crawl Management</span>
                    </CardTitle>
                    <CardDescription>Manage scrolling news ticker items</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("news");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add News Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {newsCrawl.map((item) => (
                    <Card key={item.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                                {item.priority}
                              </Badge>
                              <Badge variant={item.status === 'active' ? 'outline' : 'secondary'}>
                                {item.status}
                              </Badge>
                            </div>
                            <p className="text-gray-900 font-medium">{item.text}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                              <span>{item.date}</span>
                              <Badge variant="outline">{item.category}</Badge>
                              <span>Duration: {item.duration}s</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditDialog(item, "news")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => openDeleteDialog(item, "news")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Publications Management */}
          <TabsContent value="publications">
            <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-purple-600" />
                      <span>Publications Management</span>
                    </CardTitle>
                    <CardDescription>Manage research papers and academic publications</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setItemType("publications");
                    setIsAddDialogOpen(true);
                  }} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Publication
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {publications.map((pub) => (
                    <Card key={pub.id} className="border border-gray-200/50 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{pub.title}</h3>
                            <p className="text-gray-600 text-sm">{pub.authors}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditDialog(pub, "publications")}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => openDeleteDialog(pub, "publications")}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-4">
                          <div>
                            <span className="font-medium">Journal:</span> {pub.journal}
                          </div>
                          <div>
                            <span className="font-medium">Year:</span> {pub.year}
                          </div>
                          <div>
                            <span className="font-medium">Volume:</span> {pub.volume}
                          </div>
                          <div>
                            <span className="font-medium">Pages:</span> {pub.pages}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm">{pub.abstract}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {pub.keywords?.map((keyword, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            DOI: {pub.doi}
                          </Badge>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <InteractionTracker
                          itemType="publication"
                          itemId={pub.id}
                          interactions={{
                            views: pub.views,
                            likes: pub.likes,
                            comments: pub.comments
                          }}
                          onUpdateInteractions={(interactions) => {
                            setPublications(prev => prev.map(p => 
                              p.id === pub.id ? { ...p, ...interactions } : p
                            ));
                          }}
                          isAdmin={true}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Add New {itemType}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Enter title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Brief description"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-sm font-semibold">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  placeholder="Full content"
                  rows={6}
                  className="mt-1"
                />
              </div>

              {(itemType === "teaching" || itemType === "education") && (
                <div>
                  <Label htmlFor="level" className="text-sm font-semibold">Level *</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value as "Beginner" | "Intermediate" | "Advanced"})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {itemType === "advertisements" && (
                <>
                  <div>
                    <Label htmlFor="targetAudience" className="text-sm font-semibold">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleFormChange}
                      placeholder="e.g., Business Owners, Students"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget" className="text-sm font-semibold">Budget ($)</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      value={formData.budget}
                      onChange={handleFormChange}
                      placeholder="Advertisement budget"
                      className="mt-1"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tags" className="text-sm font-semibold">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="Comma-separated tags"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="date" className="text-sm font-semibold">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="author" className="text-sm font-semibold">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                  placeholder="Author name"
                  className="mt-1"
                />
              </div>

              <MediaUpload
                label="Media Files"
                accept="image/*,video/*,application/pdf"
                onFilesSelect={handleMediaSelect}
                multiple={true}
                maxFiles={10}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Create {itemType}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit {itemType}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="Enter title"
                  className="mt-1"
                />
              </div>
              
              {(itemType === "trending" || itemType === "articles") && (
                <>
                  <div>
                    <Label htmlFor="excerpt" className="text-sm font-semibold">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleFormChange}
                      placeholder="Brief summary"
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content" className="text-sm font-semibold">Content *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleFormChange}
                      placeholder="Full content"
                      rows={6}
                      className="mt-1"
                    />
                  </div>
                </>
              )}
              
              {itemType === "articles" && (
                <>
                  <div>
                    <Label htmlFor="author" className="text-sm font-semibold">Author *</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleFormChange}
                      placeholder="Author name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="authorBio" className="text-sm font-semibold">Author Bio</Label>
                    <Textarea
                      id="authorBio"
                      name="authorBio"
                      value={formData.authorBio}
                      onChange={handleFormChange}
                      placeholder="Brief author biography"
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="readTime" className="text-sm font-semibold">Read Time</Label>
                    <Input
                      id="readTime"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleFormChange}
                      placeholder="e.g., 5 min read"
                      className="mt-1"
                    />
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="tags" className="text-sm font-semibold">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleFormChange}
                  placeholder="Comma-separated tags"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="date" className="text-sm font-semibold">Date *</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="status" className="text-sm font-semibold">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(itemType === "trending" || itemType === "articles") && (
                <>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleFormChange}
                      className="rounded"
                    />
                    <Label htmlFor="featured" className="text-sm font-semibold">Featured</Label>
                  </div>
                  
                  {itemType === "trending" && (
                    <div>
                      <Label htmlFor="priority" className="text-sm font-semibold">Priority</Label>
                      <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}
              
              {(itemType === "trending" || itemType === "articles" || itemType === "agricultural" || itemType === "education") && (
                <FileUpload
                  label="Featured Image"
                  accept="image/*"
                  onFileSelect={(file) => handleFileSelect(file, 'image')}
                  type="image"
                />
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditItem} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600">
              Are you sure you want to delete "{currentItem?.title || currentItem?.text}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3 pt-6">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteItem}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
