
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Download, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Publication = () => {
  const publications = [
    {
      id: 1,
      title: "Digital Transformation Report 2024",
      description: "Comprehensive analysis of digital trends shaping the future",
      date: "December 2023",
      type: "PDF",
      size: "2.5 MB",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Market Analysis Quarterly",
      description: "In-depth market insights and forecasting for Q4 2023",
      date: "November 2023",
      type: "PDF",
      size: "1.8 MB",
      cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Technology Innovation Guide",
      description: "Latest innovations and their impact on business",
      date: "October 2023",
      type: "PDF",
      size: "3.2 MB",
      cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
            Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our comprehensive reports, research papers, and industry insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication) => (
            <div key={publication.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300">
              <img
                src={publication.cover}
                alt={publication.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    {publication.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {publication.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{publication.title}</h3>
                <p className="text-gray-600 mb-4">{publication.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{publication.size}</span>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our publication newsletter to receive the latest reports and insights directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Publication;
