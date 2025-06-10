
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-blue-200 mb-6">
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 text-sm font-bold rounded-lg shadow-lg animate-pulse">
                BREAKING NEWS
              </span>
              <div className="flex items-center space-x-2 bg-black bg-opacity-30 px-3 py-1 rounded-lg">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">2 hours ago</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Major Technology Breakthrough Changes Industry Standards
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed font-light">
              Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide, creating unprecedented opportunities.
            </p>
            
            <Link to="/article/1">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-white to-gray-100 text-indigo-900 hover:from-gray-100 hover:to-gray-200 font-bold text-lg px-8 py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Read Full Story
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-30 transform rotate-3"></div>
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop"
              alt="Breaking news"
              className="relative w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-black to-gray-900 bg-opacity-80 text-white p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <span className="bg-blue-600 text-white px-3 py-1 text-sm font-bold rounded-lg">Technology</span>
                <span className="bg-purple-600 text-white px-3 py-1 text-sm font-bold rounded-lg">Business</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
