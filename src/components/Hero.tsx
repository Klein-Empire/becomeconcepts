
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Hello, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Alex Johnson
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-3xl mx-auto">
            Designing smart websites & solving real IT problems.
          </p>
        </div>
        
        <div className="mb-12">
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Passionate IT professional with expertise in web design, development, and comprehensive IT solutions. 
            I transform ideas into digital experiences and tackle complex technical challenges.
          </p>
        </div>

        <Button 
          onClick={scrollToPortfolio}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          View My Work
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
