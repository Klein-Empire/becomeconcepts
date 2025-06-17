import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Book,
  GraduationCap,
  Youtube,
  Tractor,
  School,
  Megaphone,
  Settings,
  TrendingUp,
  Briefcase,
  Monitor,
  Trophy,
  Users,
  Heart,
  User
} from "lucide-react";
import { db } from "@/firebase";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import AdminProfile from "@/components/AdminProfile";
import AdminForm from "@/components/admin/AdminForm";
import AdminList from "@/components/admin/AdminList";

import type { MediaFile } from "@/components/MediaUpload";
import type { EngagementData } from "@/components/EngagementTracker";

// --- Type Definitions ---

interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  media: MediaFile[];
  category: string;
  tags: string[];
  author: string;
  date: string;
  status: 'published' | 'draft';
  featured: boolean;
  priority: 'low' | 'medium' | 'high';
  engagement: EngagementData;
}

interface Publication {
  id: string;
  title: string;
  author: string;
  publicationDate: string;
  abstract: string;
  media: MediaFile[];
  tags: string[];
  engagement: EngagementData;
}

interface TeachingItem {
  id: string;
  title: string;
  description: string;
  media: MediaFile[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  engagement: EngagementData;
}

interface EducationItem {
  id:string;
  title: string;
  description: string;
  media: MediaFile[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  subject: string;
  engagement: EngagementData;
}

interface AgriculturalItem {
  id: string;
  title: string;
  content: string;
  media: MediaFile[];
  category: string;
  tags: string[];
  engagement: EngagementData;
}

interface Advertisement {
  id: string;
  title: string;
  description: string;
  media: MediaFile[];
  client: string;
  link: string;
  type: 'banner' | 'sidebar' | 'inline';
  startDate: string;
  endDate: string;
  isActive: boolean;
  engagement: EngagementData;
}

interface YoutubeItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  isActive: boolean;
  engagement: EngagementData;
}

interface NewsCrawlItem {
  id: string;
  text: string;
  image: string;
  isActive: boolean;
  order: number;
}

interface AdPackage {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  isActive: boolean;
}

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Dummy Profile Data for AdminProfile component
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@newsdaily.com',
    role: 'Administrator',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    whatsappNumber: '+254712345678',
    bio: 'Overseeing the content and operations of NewsDaily.',
  });

  const handleUpdateProfile = (updatedProfile: any) => {
    setAdminProfile(updatedProfile);
    // In a real application, you'd likely save this to a backend.
    console.log("Profile updated:", updatedProfile);
  };

  // --- Dummy Data (Corrected) ---

  const createDummyEngagement = (): EngagementData => ({
    views: 0,
    likes: 0,
    comments: [],
  });

  const dummyNews: NewsItem[] = [
    {
      id: '1', title: 'New Tractor Models Unveiled', content: 'Detailed content about new tractors.', excerpt: 'A quick look at the latest in agricultural machinery.', media: [], category: 'Agriculture', tags: ['machinery', 'new'], author: 'Admin', date: '2025-06-14', status: 'published', featured: true, priority: 'high', engagement: createDummyEngagement()
    },
  ];

  const dummyPublications: Publication[] = [
    { id: '1', title: 'The Future of Sustainable Farming', author: 'Dr. Jane Doe', publicationDate: '2025-05-20', abstract: 'An in-depth study on sustainable practices.', media: [], tags: ['sustainability', 'research'], engagement: createDummyEngagement() },
  ];
  
  const dummyTeachings: TeachingItem[] = [
    { id: '1', title: 'Introduction to Crop Rotation', description: 'Learn the basics of crop rotation for soil health.', media: [], level: 'Beginner', tags: ['farming', 'basics'], engagement: createDummyEngagement() },
  ];

  const dummyYoutubeItems: YoutubeItem[] = [
    { id: '1', title: 'Our Farm Tour', description: 'A virtual tour of our facilities and fields.', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', isActive: true, engagement: createDummyEngagement() },
  ];

  const dummyAgricultureItems: AgriculturalItem[] = [
    { id: '1', title: 'Guide to Organic Fertilizers', content: 'Everything you need to know about organic fertilizers.', media: [], category: 'Soil Health', tags: ['organic', 'fertilizers'], engagement: createDummyEngagement() },
  ];

  const dummyEducationItems: EducationItem[] = [
    { id: '1', title: 'Advanced Soil Science', description: 'A deep dive into soil composition and health.', media: [], level: 'Advanced', subject: 'Agronomy', engagement: createDummyEngagement() },
  ];

  const dummyAdvertisements: Advertisement[] = [
    { id: '1', title: 'Harvest Season Sale', description: 'Get the best deals on farming equipment.', media: [], client: 'AgriCorp', link: '', type: 'banner', startDate: '2025-07-01', endDate: '2025-07-31', isActive: true, engagement: createDummyEngagement() },
  ];

  // --- State Management (initialized as empty arrays) ---
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [politicsItems, setPoliticsItems] = useState<NewsItem[]>([]);
  const [businessItems, setBusinessItems] = useState<NewsItem[]>([]);
  const [techItems, setTechItems] = useState<NewsItem[]>([]);
  const [sportsItems, setSportsItems] = useState<NewsItem[]>([]);
  const [employmentItems, setEmploymentItems] = useState<NewsItem[]>([]);
  const [healthItems, setHealthItems] = useState<NewsItem[]>([]);
  const [mystoryItems, setMystoryItems] = useState<NewsItem[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [teachingItems, setTeachingItems] = useState<TeachingItem[]>([]);
  const [youtubeItems, setYoutubeItems] = useState<YoutubeItem[]>([]);
  const [agricultureItems, setAgricultureItems] = useState<AgriculturalItem[]>([]);
  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [newsCrawlItems, setNewsCrawlItems] = useState<NewsCrawlItem[]>([]);
  const [adPackages, setAdPackages] = useState<AdPackage[]>([]);

  // --- Form State ---
  const [formState, setFormState] = useState<any>({});
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // --- Data Fetching from Firestore ---
  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated) return;
      setIsLoading(true);
      try {
        const fetchCollection = async (name: string) => {
          const querySnapshot = await getDocs(collection(db, name));
          return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };

        const allNews = await fetchCollection('news') as NewsItem[];
        setNewsItems(allNews.filter(item => !item.category || item.category === 'General'));
        setPoliticsItems(allNews.filter(item => item.category === 'Politics'));
        setBusinessItems(allNews.filter(item => item.category === 'Business'));
        setTechItems(allNews.filter(item => item.category === 'Tech'));
        setSportsItems(allNews.filter(item => item.category === 'Sports'));
        setEmploymentItems(allNews.filter(item => item.category === 'Employment'));
        setHealthItems(allNews.filter(item => item.category === 'Health'));
        setMystoryItems(allNews.filter(item => item.category === 'My Story'));

        setPublications(await fetchCollection('publications') as Publication[]);
        setTeachingItems(await fetchCollection('teaching') as TeachingItem[]);
        setYoutubeItems(await fetchCollection('youtube') as YoutubeItem[]);
        setAgricultureItems(await fetchCollection('agriculture') as AgriculturalItem[]);
        setEducationItems(await fetchCollection('education') as EducationItem[]);
        setAdvertisements(await fetchCollection('advertisements') as Advertisement[]);
        setNewsCrawlItems(await fetchCollection('newsCrawl') as NewsCrawlItem[]);
        setAdPackages(await fetchCollection('adPackages') as AdPackage[]);

      } catch (error) {
        console.error("Failed to load data from Firestore:", error);
        // Handle error, e.g., show a toast notification
      }
      setIsLoading(false);
    };
    loadData();
  }, [isAuthenticated]);
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Replace with a more secure check
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      alert("Incorrect password");
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isAdminAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // --- CRUD Handlers for Firestore ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (files: MediaFile[]) => {
    setFormState((prev: any) => ({ ...prev, media: files }));
  };
  
  const getCrudHandlers = (items: any[], setItems: React.Dispatch<React.SetStateAction<any[]>>, itemType: string) => {
    
    const collectionNameMap: { [key: string]: string } = {
        news: 'news',
        politics: 'news',
        business: 'news',
        tech: 'news',
        sports: 'news',
        employment: 'news',
        health: 'news',
        mystory: 'news',
        publications: 'publications',
        teaching: 'teaching',
        youtube: 'youtube',
        agriculture: 'agriculture',
        education: 'education',
        advertisements: 'advertisements',
        newsCrawl: 'newsCrawl',
        adPackages: 'adPackages'
    };
    const collectionName = collectionNameMap[itemType];

    const handleCreateOrUpdate = async () => {
      if (!collectionName) return;

      const tags = typeof formState.tags === 'string' ? formState.tags.split(',').map((t: string) => t.trim()) : formState.tags || [];
      const features = typeof formState.features === 'string' ? formState.features.split(',').map((f: string) => f.trim()) : formState.features || [];
      
      let dataToSave: any = { ...formState, tags, features };
      
      // Set category for news-based items
      if (['politics', 'business', 'tech', 'sports', 'employment', 'health', 'mystory'].includes(itemType)) {
        dataToSave.category = itemType.charAt(0).toUpperCase() + itemType.slice(1);
        if (itemType === 'mystory') dataToSave.category = 'My Story';
      }
      
      delete dataToSave.id;

      if (itemType === 'youtube') {
          const thumbnailFile = (formState.media || [])[0];
          if (thumbnailFile) {
              dataToSave.thumbnail = thumbnailFile.url && !thumbnailFile.url.startsWith('blob:') ? thumbnailFile.url : '';
          } else {
              delete dataToSave.thumbnail;
          }
          delete dataToSave.media;
      } else if (itemType === 'newsCrawl') {
          delete dataToSave.media;
      } else if (itemType === 'adPackages') {
          delete dataToSave.media;
      } else {
          const mediaToStore = (formState.media || []).map((mf: MediaFile) => ({
              name: mf.name,
              size: mf.size,
              type: mf.type,
              url: mf.url && !mf.url.startsWith('blob:') ? mf.url : '', 
          }));
          dataToSave.media = mediaToStore;
      }
      
      if (isEditing) {
        // Update
        const itemRef = doc(db, collectionName, isEditing);
        const originalItem = items.find(i => i.id === isEditing);

        if (itemType === 'youtube' && dataToSave.thumbnail === '' && originalItem?.thumbnail) {
            dataToSave.thumbnail = originalItem.thumbnail;
        }

        await updateDoc(itemRef, dataToSave);
        setItems(items.map(item => item.id === isEditing ? { ...originalItem, ...dataToSave } : item));
      } else {
        // Create
        if (!['newsCrawl', 'adPackages'].includes(itemType)) {
          dataToSave.engagement = createDummyEngagement();
        }
        const docRef = await addDoc(collection(db, collectionName), dataToSave);
        setItems([...items, { ...dataToSave, id: docRef.id }]);
      }
      setFormState({});
      setIsEditing(null);
    };

    const handleEdit = (item: any) => {
      setIsEditing(item.id);
      const stateToSet: any = { 
        ...item, 
        tags: item.tags?.join(', ') || '',
        features: item.features?.join(', ') || ''
      };
      if (itemType === 'youtube' && item.thumbnail) {
          stateToSet.media = [{
              id: 'thumb-' + item.id,
              name: 'thumbnail.jpg',
              type: 'image',
              url: item.thumbnail,
              size: 0,
          }];
      }
      setFormState(stateToSet);
    };

    const handleDelete = async (id: string) => {
      if (!collectionName) return;
      if (window.confirm("Are you sure you want to delete this item?")) {
        await deleteDoc(doc(db, collectionName, id));
        setItems(items.filter(item => item.id !== id));
      }
    };
    
    const handleUpdateEngagement = async (itemId: string, engagement: EngagementData) => {
        if (!collectionName || ['newsCrawl', 'adPackages'].includes(itemType)) return;
        const itemRef = doc(db, collectionName, itemId);
        await updateDoc(itemRef, { engagement });
        setItems(items.map(item => item.id === itemId ? { ...item, engagement } : item));
    };

    return { handleCreateOrUpdate, handleEdit, handleDelete, handleUpdateEngagement };
  };

  // Create CRUD handlers for all sections
  const newsCrud = getCrudHandlers(newsItems, setNewsItems, 'news');
  const politicsCrud = getCrudHandlers(politicsItems, setPoliticsItems, 'politics');
  const businessCrud = getCrudHandlers(businessItems, setBusinessItems, 'business');
  const techCrud = getCrudHandlers(techItems, setTechItems, 'tech');
  const sportsCrud = getCrudHandlers(sportsItems, setSportsItems, 'sports');
  const employmentCrud = getCrudHandlers(employmentItems, setEmploymentItems, 'employment');
  const healthCrud = getCrudHandlers(healthItems, setHealthItems, 'health');
  const mystoryCrud = getCrudHandlers(mystoryItems, setMystoryItems, 'mystory');
  const pubCrud = getCrudHandlers(publications, setPublications, 'publications');
  const teachingCrud = getCrudHandlers(teachingItems, setTeachingItems, 'teaching');
  const youtubeCrud = getCrudHandlers(youtubeItems, setYoutubeItems, 'youtube');
  const agriCrud = getCrudHandlers(agricultureItems, setAgricultureItems, 'agriculture');
  const eduCrud = getCrudHandlers(educationItems, setEducationItems, 'education');
  const adCrud = getCrudHandlers(advertisements, setAdvertisements, 'advertisements');
  const newsCrawlCrud = getCrudHandlers(newsCrawlItems, setNewsCrawlItems, 'newsCrawl');
  const adPackageCrud = getCrudHandlers(adPackages, setAdPackages, 'adPackages');

  const getSectionData = (section: string) => {
    const dataMap: { [key: string]: { items: any[], crud: any } } = {
      news: { items: newsItems, crud: newsCrud },
      politics: { items: politicsItems, crud: politicsCrud },
      business: { items: businessItems, crud: businessCrud },
      tech: { items: techItems, crud: techCrud },
      sports: { items: sportsItems, crud: sportsCrud },
      employment: { items: employmentItems, crud: employmentCrud },
      health: { items: healthItems, crud: healthCrud },
      mystory: { items: mystoryItems, crud: mystoryCrud },
      publications: { items: publications, crud: pubCrud },
      teaching: { items: teachingItems, crud: teachingCrud },
      youtube: { items: youtubeItems, crud: youtubeCrud },
      agriculture: { items: agricultureItems, crud: agriCrud },
      education: { items: educationItems, crud: eduCrud },
      advertisements: { items: advertisements, crud: adCrud },
      newsCrawl: { items: newsCrawlItems, crud: newsCrawlCrud },
      adPackages: { items: adPackages, crud: adPackageCrud }
    };
    return dataMap[section] || { items: [], crud: {} };
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "news", label: "General News", icon: Newspaper },
    { id: "politics", label: "Politics", icon: Users },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "tech", label: "Tech", icon: Monitor },
    { id: "sports", label: "Sports", icon: Trophy },
    { id: "employment", label: "Employment", icon: Users },
    { id: "health", label: "Health", icon: Heart },
    { id: "mystory", label: "My Story", icon: User },
    { id: "newsCrawl", label: "Breaking News", icon: TrendingUp },
    { id: "adPackages", label: "Ad Packages", icon: Megaphone },
    { id: "publications", label: "Publications", icon: Book },
    { id: "teaching", label: "Teaching", icon: GraduationCap },
    { id: "youtube", label: "YouTube", icon: Youtube },
    { id: "agriculture", label: "Agriculture", icon: Tractor },
    { id: "education", label: "Education", icon: School },
    { id: "advertisements", label: "Adverts", icon: Megaphone },
    { id: "profile", label: "Profile", icon: Settings },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Newspaper className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Articles</p>
                      <p className="text-2xl font-bold text-gray-900">{newsItems.length + politicsItems.length + businessItems.length + techItems.length + sportsItems.length + employmentItems.length + healthItems.length + mystoryItems.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Megaphone className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Ads</p>
                      <p className="text-2xl font-bold text-gray-900">{advertisements.filter(ad => ad.isActive).length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Book className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Publications</p>
                      <p className="text-2xl font-bold text-gray-900">{publications.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Youtube className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Videos</p>
                      <p className="text-2xl font-bold text-gray-900">{youtubeItems.filter(video => video.isActive).length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeSection === "profile" && <AdminProfile profile={adminProfile} onUpdateProfile={handleUpdateProfile} />}
        
        {activeSection !== "dashboard" && activeSection !== "profile" && (
          <div>
            <h1 className="text-3xl font-bold mb-6 capitalize">{activeSection} Management</h1>
            {isLoading ? <p>Loading content...</p> : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Item' : 'Create New Item'}</h2>
                  <Card>
                    <CardContent className="p-6">
                      <AdminForm
                        section={activeSection}
                        formState={formState}
                        isEditing={!!isEditing}
                        onInputChange={handleInputChange}
                        onSelectChange={handleSelectChange}
                        onFileSelect={handleFileSelect}
                        onSubmit={getSectionData(activeSection).crud.handleCreateOrUpdate}
                        setFormState={setFormState}
                      />
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Existing Items</h2>
                  <AdminList
                    section={activeSection}
                    items={getSectionData(activeSection).items}
                    onEdit={getSectionData(activeSection).crud.handleEdit}
                    onDelete={getSectionData(activeSection).crud.handleDelete}
                    onUpdateEngagement={getSectionData(activeSection).crud.handleUpdateEngagement}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
