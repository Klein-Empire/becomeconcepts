
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // In a real app, this would come from a proper auth context
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const categories = [
    "Politics", "Business", "Tech", "Sports", "Entertainment", "Health", "World"
  ];

  const additionalMenuItems = [
    { name: "Publication", path: "/publication" },
    { name: "Do Advert", path: "/advertise" },
    { name: "Do Teaching", path: "/teaching" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Concepts
            </Link>
            <div className="hidden lg:block h-8 w-px bg-gray-300"></div>
            <div className="hidden lg:block text-sm text-gray-500 font-medium">
              Professional News & Insights Network
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search breaking news..."
                className="pl-12 pr-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 w-80 transition-all duration-300"
              />
            </div>
            <Button 
              variant="outline" 
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300"
            >
              Subscribe
            </Button>
            {/* Only show admin link if user types the secret admin URL or is authenticated */}
            {(window.location.pathname === '/admin' || isAdminAuthenticated) && (
              <Link to="/admin">
                <Button 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
                >
                  Admin Panel
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex items-center space-x-8 py-4 overflow-x-auto">
            <Link to="/" className="text-gray-900 hover:text-purple-600 font-semibold transition-colors duration-300 border-b-2 border-transparent hover:border-purple-600 pb-1 whitespace-nowrap">
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-purple-600 pb-1 whitespace-nowrap"
              >
                {category}
              </Link>
            ))}
            {additionalMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-purple-600 pb-1 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-900 hover:text-purple-600 font-semibold py-2">
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="text-gray-700 hover:text-purple-600 py-2"
                >
                  {category}
                </Link>
              ))}
              {additionalMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-purple-600 py-2"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <input
                  type="text"
                  placeholder="Search breaking news..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                />
                <Button variant="outline" className="w-full border-purple-600 text-purple-600">Subscribe</Button>
                {(window.location.pathname === '/admin' || isAdminAuthenticated) && (
                  <Link to="/admin">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">Admin Panel</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
