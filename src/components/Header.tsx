
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "Politics", "Business", "Tech", "Sports", "Entertainment", "Health", "World"
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-slate-900">NewsDaily</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 w-64"
              />
            </div>
            <Button variant="outline" size="sm">Subscribe</Button>
            <Link to="/admin">
              <Button variant="outline" size="sm">Admin</Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block border-t border-slate-200">
          <div className="flex items-center space-x-8 py-3">
            <Link to="/" className="text-slate-900 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="text-slate-700 hover:text-blue-600 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-slate-900 hover:text-blue-600 font-medium">
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category.toLowerCase()}`}
                  className="text-slate-700 hover:text-blue-600"
                >
                  {category}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 mb-3"
                />
                <Button variant="outline" size="sm" className="w-full mb-2">Subscribe</Button>
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="w-full">Admin</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
