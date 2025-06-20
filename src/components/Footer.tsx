
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const companyLinks = ["About Us", "Contact", "Terms of Service", "Privacy Policy"];

  const handleEmailClick = () => {
    window.location.href = "mailto:news@becomeconcepts.com?subject=Inquiry from BecomeConcepts Website";
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">BecomeConcept</h3>
            <div className="space-y-2">
              <div 
                className="flex items-center space-x-2 text-sm text-slate-300 cursor-pointer hover:text-white transition-colors"
                onClick={handleEmailClick}
              >
                <Mail className="h-4 w-4" />
                <span>news@becomeconcepts.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <Phone className="h-4 w-4" />
                <span>+254 798890521</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <button 
                onClick={handleEmailClick}
                className="text-slate-300 hover:text-white transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
            <p className="text-slate-400 text-sm">
              © {currentYear} BecomeConcepts. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
