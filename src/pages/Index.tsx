
import Header from "@/components/Header";
import NewsCrawl from "@/components/NewsCrawl";
import Hero from "@/components/Hero";
import FeaturedNews from "@/components/FeaturedNews";
import NewsGrid from "@/components/NewsGrid";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Advertisement from "@/components/Advertisement";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 text-slate-900">
      <Header />
      <NewsCrawl />
      
      {/* Banner Advertisement */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Advertisement type="banner" />
      </div>
      
      <Hero />
      <FeaturedNews />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <NewsGrid />
            
            {/* Inline Advertisement */}
            <Advertisement type="inline" />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
