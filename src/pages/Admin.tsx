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
  PlusCircle,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  BarChart2,
  Users,
  Eye,
  Heart,
  MessageCircle,
  File,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText
} from "lucide-react";
import { db } from "@/firebase";
import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

import AdminProfile from "@/components/AdminProfile";
import MediaUpload from "@/components/MediaUpload";
import EngagementTracker from "@/components/EngagementTracker";

import type { MediaFile } from "@/components/MediaUpload";
import type { EngagementData, Comment } from "@/components/EngagementTracker";

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
  startDate: string;
  endDate: string;
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
    { id: '1', title: 'Harvest Season Sale', description: 'Get the best deals on farming equipment.', media: [], client: 'AgriCorp', startDate: '2025-07-01', endDate: '2025-07-31', engagement: createDummyEngagement() },
  ];

  // --- State Management (initialized as empty arrays) ---
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [teachingItems, setTeachingItems] = useState<TeachingItem[]>([]);
  const [youtubeItems, setYoutubeItems] = useState<YoutubeItem[]>([]);
  const [agricultureItems, setAgricultureItems] = useState<AgriculturalItem[]>([]);
  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

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

        setNewsItems(await fetchCollection('news') as NewsItem[]);
        setPublications(await fetchCollection('publications') as Publication[]);
        setTeachingItems(await fetchCollection('teaching') as TeachingItem[]);
        setYoutubeItems(await fetchCollection('youtube') as YoutubeItem[]);
        setAgricultureItems(await fetchCollection('agriculture') as AgriculturalItem[]);
        setEducationItems(await fetchCollection('education') as EducationItem[]);
        setAdvertisements(await fetchCollection('advertisements') as Advertisement[]);

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
        publications: 'publications',
        teaching: 'teaching',
        youtube: 'youtube',
        agriculture: 'agriculture',
        education: 'education',
        advertisements: 'advertisements'
    };
    const collectionName = collectionNameMap[itemType];

    const handleCreateOrUpdate = async () => {
      if (!collectionName) return;

      const tags = typeof formState.tags === 'string' ? formState.tags.split(',').map((t: string) => t.trim()) : formState.tags || [];
      
      const dataToSave: any = { ...formState, tags };
      delete dataToSave.id; // Don't save ID in the document data

      if (itemType === 'youtube') {
          const thumbnailFile = (formState.media || [])[0];
          if (thumbnailFile) {
              dataToSave.thumbnail = thumbnailFile.url && !thumbnailFile.url.startsWith('blob:') ? thumbnailFile.url : '';
          } else {
              delete dataToSave.thumbnail;
          }
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
        const docRef = await addDoc(collection(db, collectionName), { ...dataToSave, engagement: createDummyEngagement() });
        setItems([...items, { ...dataToSave, id: docRef.id, engagement: createDummyEngagement() }]);
      }
      setFormState({});
      setIsEditing(null);
    };

    const handleEdit = (item: any) => {
      setIsEditing(item.id);
      const stateToSet: any = { ...item, tags: item.tags?.join(', ') || '' };
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
        if (!collectionName) return;
        const itemRef = doc(db, collectionName, itemId);
        await updateDoc(itemRef, { engagement });
        setItems(items.map(item => item.id === itemId ? { ...item, engagement } : item));
    };

    return { handleCreateOrUpdate, handleEdit, handleDelete, handleUpdateEngagement };
  };

  const newsCrud = getCrudHandlers(newsItems, setNewsItems, 'news');
  const pubCrud = getCrudHandlers(publications, setPublications, 'publications');
  const teachingCrud = getCrudHandlers(teachingItems, setTeachingItems, 'teaching');
  const youtubeCrud = getCrudHandlers(youtubeItems, setYoutubeItems, 'youtube');
  const agriCrud = getCrudHandlers(agricultureItems, setAgricultureItems, 'agriculture');
  const eduCrud = getCrudHandlers(educationItems, setEducationItems, 'education');
  const adCrud = getCrudHandlers(advertisements, setAdvertisements, 'advertisements');


  const renderForm = (section: string) => {
    // This is a simplified form renderer. You can expand it.
    switch(section) {
      case 'news':
        return (
          <div className="space-y-4">
            <Input name="title" placeholder="Title" value={formState.title || ''} onChange={handleInputChange} />
            <Textarea name="content" placeholder="Content" value={formState.content || ''} onChange={handleInputChange} />
            <Input name="excerpt" placeholder="Excerpt" value={formState.excerpt || ''} onChange={handleInputChange} />
            <Input name="author" placeholder="Author" value={formState.author || ''} onChange={handleInputChange} />
            <Input name="date" type="date" placeholder="Date" value={formState.date || ''} onChange={handleInputChange} />
            <Input name="category" placeholder="Category" value={formState.category || ''} onChange={handleInputChange} />
            <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={handleInputChange} />
            <Select name="status" value={formState.status || 'draft'} onValueChange={(value) => handleSelectChange('status', value)}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={handleFileSelect} existingFiles={formState.media || []} />
            <Button onClick={newsCrud.handleCreateOrUpdate}>{isEditing ? 'Update' : 'Create'} News</Button>
          </div>
        );
      case 'publications':
        return (
            <div className="space-y-4">
                <Input name="title" placeholder="Title" value={formState.title || ''} onChange={handleInputChange} />
                <Input name="author" placeholder="Author" value={formState.author || ''} onChange={handleInputChange} />
                <Input name="publicationDate" type="date" placeholder="Publication Date" value={formState.publicationDate || ''} onChange={handleInputChange} />
                <Textarea name="abstract" placeholder="Abstract" value={formState.abstract || ''} onChange={handleInputChange} />
                <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={handleInputChange} />
                <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={handleFileSelect} existingFiles={formState.media || []} />
                <Button onClick={pubCrud.handleCreateOrUpdate}>{isEditing ? 'Update' : 'Create'} Publication</Button>
            </div>
        );
      case 'teaching':
        return (
            <div className="space-y-4">
                <Input name="title" placeholder="Title" value={formState.title || ''} onChange={handleInputChange} />
                <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={handleInputChange} />
                <Select name="level" value={formState.level || ''} onValueChange={(value) => handleSelectChange('level', value)}>
                    <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
                <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={handleInputChange} />
                <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={handleFileSelect} existingFiles={formState.media || []} />
                <Button onClick={teachingCrud.handleCreateOrUpdate}>{isEditing ? 'Update' : 'Create'} Teaching Item</Button>
            </div>
        );
      case 'youtube':
        return (
          <div className="space-y-4">
            <Input name="title" placeholder="Video Title" value={formState.title || ''} onChange={handleInputChange} />
            <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={handleInputChange} />
            <Input name="url" placeholder="YouTube URL" value={formState.url || ''} onChange={handleInputChange} />
            <MediaUpload
              label="Custom Thumbnail"
              accept="image/*"
              onFilesSelect={handleFileSelect}
              existingFiles={formState.media || []}
              multiple={false}
              maxFiles={1}
            />
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="isActive" id="isActive" checked={formState.isActive === undefined ? true : formState.isActive} onChange={(e) => setFormState({...formState, isActive: e.target.checked})} />
              <label htmlFor="isActive">Is Active</label>
            </div>
            <Button onClick={youtubeCrud.handleCreateOrUpdate}>{isEditing ? 'Update' : 'Create'} Video</Button>
          </div>
        );
      case 'agriculture':
        return (
            <div className="space-y-4">
                <Input name="title" placeholder="Title" value={formState.title || ''} onChange={handleInputChange} />
                <Textarea name="content" placeholder="Content" value={formState.content || ''} onChange={handleInputChange} />
                <Input name="category" placeholder="Category" value={formState.category || ''} onChange={handleInputChange} />
                <Input name="tags" placeholder="Tags (comma-separated)" value={formState.tags || ''} onChange={handleInputChange} />
                <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={handleFileSelect} existingFiles={formState.media || []} />
                <Button onClick={agriCrud.handleCreateOrUpdate}>{isEditing ? 'Update' : 'Create'} Agriculture Item</Button>
            </div>
        );
      case 'education':
        return (
            <div className="space-y-4">
                <Input name="title" placeholder="Title" value={formState.title || ''} onChange={handleInputChange} />
                <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={handleInputChange} />
                <Input name="subject" placeholder="Subject" value={formState.subject || ''} onChange={handleInputChange} />
                <Select name="level" value={formState.level || ''} onValueChange={(value) => handleSelectChange('level', value)}>
                    <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
                <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={handleFileSelect} existingFiles={formState.media || []} />
                <Button onClick={eduCrud.handleCreateOrUpdate}>{isEditing ? 'Update' : 'Create'} Education Item</Button>
            </div>
        );
      case 'advertisements':
        return (
            <div className="space-y-4">
                <Input name="title" placeholder="Title" value={formState.title || ''} onChange={handleInputChange} />
                <Textarea name="description" placeholder="Description" value={formState.description || ''} onChange={handleInputChange} />
                <Input name="client" placeholder="Client" value={formState.client || ''} onChange={handleInputChange} />
                <Input name="startDate" type="date" placeholder="Start Date" value={formState.startDate || ''} onChange={handleInputChange} />
                <Input name="endDate" type="date" placeholder="End Date" value={formState.endDate || ''} onChange={handleInputChange} />
                <MediaUpload label="Media" accept="image/*,video/*,application/pdf" onFilesSelect={handleFileSelect} existingFiles={formState.media || []} />
                <Button onClick={adCrud.handleCreateOrUpdate}>{isEditing ? 'Update' : 'Create'} Advertisement</Button>
            </div>
        );
      default:
        return <p>Select a section to manage content.</p>;
    }
  };

  const renderList = (section: string) => {
    let items: any[] = [];
    let crud: any = {};
    switch(section) {
      case 'news': items = newsItems; crud = newsCrud; break;
      case 'publications': items = publications; crud = pubCrud; break;
      case 'teaching': items = teachingItems; crud = teachingCrud; break;
      case 'youtube': items = youtubeItems; crud = youtubeCrud; break;
      case 'agriculture': items = agricultureItems; crud = agriCrud; break;
      case 'education': items = educationItems; crud = eduCrud; break;
      case 'advertisements': items = advertisements; crud = adCrud; break;
      default: return null;
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.description || item.excerpt || item.author}</p>
                   {item.level && <Badge>{item.level}</Badge>}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => crud.handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="sm" onClick={() => crud.handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
               {item.engagement && (
                <div className="mt-4">
                    <EngagementTracker 
                        itemId={item.id}
                        itemType={section as any}
                        engagement={item.engagement}
                        onUpdateEngagement={(engagement) => crud.handleUpdateEngagement(item.id, engagement)}
                        isAdmin
                    />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "news", label: "News", icon: Newspaper },
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
              {/* Stat cards can go here */}
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
                      {renderForm(activeSection)}
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Existing Items</h2>
                  {renderList(activeSection)}
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
