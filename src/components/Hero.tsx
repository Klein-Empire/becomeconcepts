
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 text-blue-200 mb-4">
              <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">BREAKING</span>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">2 hours ago</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Major Technology Breakthrough Changes Industry Standards
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Industry experts predict revolutionary changes as new technology promises to reshape how we interact with digital platforms worldwide.
            </p>
            <Link to="/article/1">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Read Full Story
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="relative">
            <img
              src="/placeholder.svg"
              alt="Breaking news"
              className="w-full h-80 object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-4 rounded">
              <p className="text-sm font-medium">Technology • Business</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
