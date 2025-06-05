
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Alex Johnson
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Creating digital solutions that make a difference. Let's build something amazing together.
            </p>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-400 flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-2 fill-current" /> by Alex Johnson
              </p>
              <p className="text-slate-400">
                © {currentYear} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
