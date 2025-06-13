
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit, Plus, Upload, User, Settings, LogOut } from "lucide-react";
import InteractionTracker from "@/components/InteractionTracker";

const Admin = () => {
  // Trending News State
  const [trendingNews, setTrendingNews] = useState([
    {
      id: 1,
      title: "Breaking: Major Policy Change Announced",
      content: "The government has announced a significant policy shift that will affect various sectors...",
      image: "/images/news1.jpg",
      date: "2023-06-15",
      views: 1245,
      likes: 89,
      comments: [
        { id: 1, author: "John Doe", content: "This is a game changer!", timestamp: "2023-06-15 14:30" },
        { id: 2, author: "Jane Smith", content: "I'm not sure about this...", timestamp: "2023-06-15 15:45" }
      ]
    },
    {
      id: 2,
      title: "New Research Reveals Breakthrough in Renewable Energy",
      content: "Scientists have discovered a new method for harnessing solar energy with unprecedented efficiency...",
      image: "/images/news2.jpg",
      date: "2023-06-14",
      views: 982,
      likes: 76,
      comments: [
        { id: 3, author: "Robert Johnson", content: "Amazing progress!", timestamp: "2023-06-14 10:15" }
      ]
    }
  ]);

  // Articles State
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "The Future of Sustainable Agriculture",
      content: "Exploring innovative approaches to farming that prioritize environmental stewardship...",
      author: "Dr. Emily Chen",
      image: "/images/article1.jpg",
      date: "2023-06-10",
      views: 756,
      likes: 42,
      comments: [
        { id: 1, author: "Michael Brown", content: "Great insights!", timestamp: "2023-06-11 09:20" }
      ]
    },
    {
      id: 2,
      title: "Economic Implications of Remote Work",
      content: "Analyzing how the shift to remote work is reshaping urban economies and real estate markets...",
      author: "Prof. James Wilson",
      image: "/images/article2.jpg",
      date: "2023-06-08",
      views: 892,
      likes: 63,
      comments: []
    }
  ]);

  // News Crawl State
  const [newsCrawl, setNewsCrawl] = useState([
    {
      id: 1,
      text: "Stock markets reach all-time high amid economic recovery",
      link: "/news/stock-markets",
      date: "2023-06-15",
      views: 345,
      likes: 21,
      comments: []
    },
    {
      id: 2,
      text: "New healthcare initiative launched to address rural medical needs",
      link: "/news/healthcare-initiative",
      date: "2023-06-14",
      views: 289,
      likes: 18,
      comments: [
        { id: 1, author: "Sarah Johnson", content: "This is much needed!", timestamp: "2023-06-14 16:30" }
      ]
    }
  ]);

  // Publications State
  const [publications, setPublications] = useState([
    {
      id: 1,
      title: "Advancements in Machine Learning Applications",
      authors: "Dr. Alan Smith, Dr. Lisa Johnson",
      journal: "Journal of Artificial Intelligence",
      year: "2023",
      link: "/publications/machine-learning",
      views: 412,
      likes: 37,
      comments: []
    },
    {
      id: 2,
      title: "Climate Change Effects on Biodiversity",
      authors: "Prof. Maria Garcia, Dr. Robert Chen",
      journal: "Environmental Science Journal",
      year: "2022",
      link: "/publications/climate-change",
      views: 528,
      likes: 45,
      comments: [
        { id: 1, author: "David Wilson", content: "Crucial research!", timestamp: "2023-01-15 11:20" }
      ]
    }
  ]);

  // Teaching State
  const [teaching, setTeaching] = useState([
    {
      id: 1,
      title: "Introduction to Data Science",
      description: "A comprehensive course covering the fundamentals of data science and analytics.",
      semester: "Fall 2023",
      schedule: "Mon/Wed 10:00-11:30 AM",
      location: "Science Building, Room 305",
      views: 678,
      likes: 52,
      comments: [
        { id: 1, author: "Student123", content: "Great course structure!", timestamp: "2023-05-20 14:15" }
      ]
    },
    {
      id: 2,
      title: "Advanced Statistical Methods",
      description: "Exploring complex statistical techniques for research and data analysis.",
      semester: "Spring 2024",
      schedule: "Tue/Thu 2:00-3:30 PM",
      location: "Math Building, Room 210",
      views: 542,
      likes: 39,
      comments: []
    }
  ]);

  // Become TV Videos State
  const [becomeTVVideos, setBecomeTVVideos] = useState([
    {
      id: 1,
      title: "Understanding Market Trends",
      description: "Expert analysis of current market conditions and future projections.",
      videoUrl: "https://www.youtube.com/embed/example1",
      thumbnail: "/images/video1.jpg",
      date: "2023-06-01",
      views: 1245,
      likes: 98,
      comments: [
        { id: 1, author: "InvestorPro", content: "Very insightful analysis!", timestamp: "2023-06-02 10:30" }
      ]
    },
    {
      id: 2,
      title: "Interview with Tech Innovator",
      description: "Exclusive interview with the founder of a groundbreaking tech startup.",
      videoUrl: "https://www.youtube.com/embed/example2",
      thumbnail: "/images/video2.jpg",
      date: "2023-05-25",
      views: 987,
      likes: 76,
      comments: []
    }
  ]);

  // Agricultural Items State
  const [agriculturalItems, setAgriculturalItems] = useState([
    {
      id: 1,
      title: "Sustainable Farming Practices",
      description: "A guide to implementing eco-friendly farming techniques.",
      image: "/images/farming1.jpg",
      date: "2023-05-20",
      views: 876,
      likes: 64,
      comments: [
        { id: 1, author: "FarmerJoe", content: "These methods have worked well for me!", timestamp: "2023-05-21 09:45" }
      ]
    },
    {
      id: 2,
      title: "Crop Rotation Benefits",
      description: "How strategic crop rotation can improve soil health and yield.",
      image: "/images/farming2.jpg",
      date: "2023-05-15",
      views: 723,
      likes: 58,
      comments: []
    }
  ]);

  // Education Items State
  const [educationItems, setEducationItems] = useState([
    {
      id: 1,
      title: "Modern Teaching Methodologies",
      description: "Exploring innovative approaches to education in the digital age.",
      image: "/images/education1.jpg",
      date: "2023-05-10",
      views: 645,
      likes: 47,
      comments: [
        { id: 1, author: "TeacherX", content: "I've implemented some of these methods with great results!", timestamp: "2023-05-11 14:20" }
      ]
    },
    {
      id: 2,
      title: "Educational Technology Tools",
      description: "A review of the latest tech tools enhancing the learning experience.",
      image: "/images/education2.jpg",
      date: "2023-05-05",
      views: 589,
      likes: 41,
      comments: []
    }
  ]);

  // Active Tab State
  const [activeTab, setActiveTab] = useState("trending");

  // Dialog States
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [itemType, setItemType] = useState("");

  // Form States
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    date: "",
    author: "",
    link: "",
    videoUrl: "",
    description: "",
    text: "",
    authors: "",
    journal: "",
    year: "",
    semester: "",
    schedule: "",
    location: "",
    thumbnail: ""
  });

  // Handle Add Item
  const handleAddItem = () => {
    const baseItem = {
      id: Date.now(),
      views: 0,
      likes: 0,
      comments: []
    };

    let newItem;

    switch (activeTab) {
      case "trending":
        newItem = {
          ...baseItem,
          title: formData.title,
          content: formData.content,
          image: formData.image,
          date: formData.date
        };
        setTrendingNews([...trendingNews, newItem]);
        break;
      case "articles":
        newItem = {
          ...baseItem,
          title: formData.title,
          content: formData.content,
          author: formData.author,
          image: formData.image,
          date: formData.date
        };
        setArticles([...articles, newItem]);
        break;
      case "news":
        newItem = {
          ...baseItem,
          text: formData.text,
          link: formData.link,
          date: formData.date
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
          link: formData.link
        };
        setPublications([...publications, newItem]);
        break;
      case "teaching":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          semester: formData.semester,
          schedule: formData.schedule,
          location: formData.location
        };
        setTeaching([...teaching, newItem]);
        break;
      case "become-tv":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          videoUrl: formData.videoUrl,
          thumbnail: formData.thumbnail,
          date: formData.date
        };
        setBecomeTVVideos([...becomeTVVideos, newItem]);
        break;
      case "agricultural":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          date: formData.date
        };
        setAgriculturalItems([...agriculturalItems, newItem]);
        break;
      case "education":
        newItem = {
          ...baseItem,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          date: formData.date
        };
        setEducationItems([...educationItems, newItem]);
        break;
      default:
        break;
    }

    setIsAddDialogOpen(false);
    resetForm();
  };

  // Handle Edit Item
  const handleEditItem = () => {
    let updatedItem;

    switch (itemType) {
      case "trending":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          content: formData.content,
          image: formData.image,
          date: formData.date
        };
        setTrendingNews(trendingNews.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "articles":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          content: formData.content,
          author: formData.author,
          image: formData.image,
          date: formData.date
        };
        setArticles(articles.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "news":
        updatedItem = {
          ...currentItem,
          text: formData.text,
          link: formData.link,
          date: formData.date
        };
        setNewsCrawl(newsCrawl.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "publications":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          authors: formData.authors,
          journal: formData.journal,
          year: formData.year,
          link: formData.link
        };
        setPublications(publications.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "teaching":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          description: formData.description,
          semester: formData.semester,
          schedule: formData.schedule,
          location: formData.location
        };
        setTeaching(teaching.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "become-tv":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          description: formData.description,
          videoUrl: formData.videoUrl,
          thumbnail: formData.thumbnail,
          date: formData.date
        };
        setBecomeTVVideos(becomeTVVideos.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "agricultural":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          date: formData.date
        };
        setAgriculturalItems(agriculturalItems.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      case "education":
        updatedItem = {
          ...currentItem,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          date: formData.date
        };
        setEducationItems(educationItems.map(item => item.id === currentItem.id ? updatedItem : item));
        break;
      default:
        break;
    }

    setIsEditDialogOpen(false);
    resetForm();
  };

  // Handle Delete Item
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
      default:
        break;
    }

    setIsDeleteDialogOpen(false);
  };

  // Open Edit Dialog
  const openEditDialog = (item, type) => {
    setCurrentItem(item);
    setItemType(type);
    setFormData({
      title: item.title || "",
      content: item.content || "",
      image: item.image || "",
      date: item.date || "",
      author: item.author || "",
      link: item.link || "",
      videoUrl: item.videoUrl || "",
      description: item.description || "",
      text: item.text || "",
      authors: item.authors || "",
      journal: item.journal || "",
      year: item.year || "",
      semester: item.semester || "",
      schedule: item.schedule || "",
      location: item.location || "",
      thumbnail: item.thumbnail || ""
    });
    setIsEditDialogOpen(true);
  };

  // Open Delete Dialog
  const openDeleteDialog = (item, type) => {
    setCurrentItem(item);
    setItemType(type);
    setIsDeleteDialogOpen(true);
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      image: "",
      date: "",
      author: "",
      link: "",
      videoUrl: "",
      description: "",
      text: "",
      authors: "",
      journal: "",
      year: "",
      semester: "",
      schedule: "",
      location: "",
      thumbnail: ""
    });
    setCurrentItem(null);
    setItemType("");
  };

  // Handle Form Change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="destructive" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="trending" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="teaching">Teaching</TabsTrigger>
            <TabsTrigger value="become-tv">Become TV</TabsTrigger>
            <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {activeTab === 'trending' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Trending News Management</h2>
                <Button onClick={() => {
                  setItemType("trending");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {trendingNews.map((news) => (
                  <div key={news.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{news.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{news.date}</p>
                      </div>
                      <div className="flex space-x-2">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Articles Management</h2>
                <Button onClick={() => {
                  setItemType("articles");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">By {article.author} | {article.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(article, "articles")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => openDeleteDialog(article, "articles")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <InteractionTracker
                      itemType="news"
                      itemId={article.id}
                      interactions={{
                        views: article.views,
                        likes: article.likes,
                        comments: article.comments
                      }}
                      onUpdateInteractions={(interactions) => {
                        setArticles(prev => prev.map(a => 
                          a.id === article.id ? { ...a, ...interactions } : a
                        ));
                      }}
                      isAdmin={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">News Crawl Management</h2>
                <Button onClick={() => {
                  setItemType("news");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {newsCrawl.map((news) => (
                  <div key={news.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{news.text}</h3>
                        <p className="text-sm text-gray-600 mt-1">{news.date}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(news, "news")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => openDeleteDialog(news, "news")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <InteractionTracker
                      itemType="news"
                      itemId={news.id}
                      interactions={{
                        views: news.views,
                        likes: news.likes,
                        comments: news.comments
                      }}
                      onUpdateInteractions={(interactions) => {
                        setNewsCrawl(prev => prev.map(n => 
                          n.id === news.id ? { ...n, ...interactions } : n
                        ));
                      }}
                      isAdmin={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'publications' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Publications Management</h2>
                <Button onClick={() => {
                  setItemType("publications");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {publications.map((pub) => (
                  <div key={pub.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{pub.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{pub.authors} | {pub.journal}, {pub.year}</p>
                      </div>
                      <div className="flex space-x-2">
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teaching' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Teaching Management</h2>
                <Button onClick={() => {
                  setItemType("teaching");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {teaching.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.semester} | {item.schedule}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(item, "teaching")}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => openDeleteDialog(item, "teaching")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <InteractionTracker
                      itemType="teaching"
                      itemId={item.id}
                      interactions={{
                        views: item.views,
                        likes: item.likes,
                        comments: item.comments
                      }}
                      onUpdateInteractions={(interactions) => {
                        setTeaching(prev => prev.map(t => 
                          t.id === item.id ? { ...t, ...interactions } : t
                        ));
                      }}
                      isAdmin={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'become-tv' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Become TV Management</h2>
                <Button onClick={() => {
                  setItemType("become-tv");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {becomeTVVideos.map((video) => (
                  <div key={video.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{video.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{video.date}</p>
                      </div>
                      <div className="flex space-x-2">
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
                ))}
              </div>
            </div>
          )}

          {activeTab === 'agricultural' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Agricultural Content Management</h2>
                <Button onClick={() => {
                  setItemType("agricultural");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {agriculturalItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.date}</p>
                      </div>
                      <div className="flex space-x-2">
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
                    
                    <InteractionTracker
                      itemType="news"
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
                ))}
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Education Content Management</h2>
                <Button onClick={() => {
                  setItemType("education");
                  setIsAddDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
              
              <div className="space-y-4">
                {educationItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.date}</p>
                      </div>
                      <div className="flex space-x-2">
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
                    
                    <InteractionTracker
                      itemType="news"
                      itemId={item.id}
                      interactions={{
                        views: item.views,
                        likes: item.likes,
                        comments: item.comments
                      }}
                      onUpdateInteractions={(interactions) => {
                        setEducationItems(prev => prev.map(e => 
                          e.id === item.id ? { ...e, ...interactions } : e
                        ));
                      }}
                      isAdmin={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Tabs>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
            </div>
            
            {(itemType === "trending" || itemType === "articles") && (
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  rows={4}
                />
              </div>
            )}
            
            {itemType === "news" && (
              <div className="space-y-2">
                <Label htmlFor="text">News Text</Label>
                <Textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleFormChange}
                  rows={3}
                />
              </div>
            )}
            
            {(itemType === "become-tv" || itemType === "teaching" || itemType === "agricultural" || itemType === "education") && (
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                />
              </div>
            )}
            
            {itemType === "articles" && (
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {itemType === "publications" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="authors">Authors</Label>
                  <Input
                    id="authors"
                    name="authors"
                    value={formData.authors}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="journal">Journal</Label>
                  <Input
                    id="journal"
                    name="journal"
                    value={formData.journal}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}
            
            {itemType === "teaching" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Input
                    id="semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}
            
            {(itemType === "trending" || itemType === "articles" || itemType === "agricultural" || itemType === "education") && (
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {itemType === "become-tv" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}
            
            {(itemType === "news" || itemType === "publications") && (
              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {(itemType === "trending" || itemType === "articles" || itemType === "news" || itemType === "become-tv" || itemType === "agricultural" || itemType === "education") && (
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
            </div>
            
            {(itemType === "trending" || itemType === "articles") && (
              <div className="space-y-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  rows={4}
                />
              </div>
            )}
            
            {itemType === "news" && (
              <div className="space-y-2">
                <Label htmlFor="edit-text">News Text</Label>
                <Textarea
                  id="edit-text"
                  name="text"
                  value={formData.text}
                  onChange={handleFormChange}
                  rows={3}
                />
              </div>
            )}
            
            {(itemType === "become-tv" || itemType === "teaching" || itemType === "agricultural" || itemType === "education") && (
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                />
              </div>
            )}
            
            {itemType === "articles" && (
              <div className="space-y-2">
                <Label htmlFor="edit-author">Author</Label>
                <Input
                  id="edit-author"
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {itemType === "publications" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-authors">Authors</Label>
                  <Input
                    id="edit-authors"
                    name="authors"
                    value={formData.authors}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-journal">Journal</Label>
                  <Input
                    id="edit-journal"
                    name="journal"
                    value={formData.journal}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-year">Year</Label>
                  <Input
                    id="edit-year"
                    name="year"
                    value={formData.year}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}
            
            {itemType === "teaching" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-semester">Semester</Label>
                  <Input
                    id="edit-semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-schedule">Schedule</Label>
                  <Input
                    id="edit-schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}
            
            {(itemType === "trending" || itemType === "articles" || itemType === "agricultural" || itemType === "education") && (
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {itemType === "become-tv" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-videoUrl">Video URL</Label>
                  <Input
                    id="edit-videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
                  <Input
                    id="edit-thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleFormChange}
                  />
                </div>
              </>
            )}
            
            {(itemType === "news" || itemType === "publications") && (
              <div className="space-y-2">
                <Label htmlFor="edit-link">Link</Label>
                <Input
                  id="edit-link"
                  name="link"
                  value={formData.link}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            {(itemType === "trending" || itemType === "articles" || itemType === "news" || itemType === "become-tv" || itemType === "agricultural" || itemType === "education") && (
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleFormChange}
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditItem}>Save Changes</Button>
            </div>
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
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2 pt-6">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteItem}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
