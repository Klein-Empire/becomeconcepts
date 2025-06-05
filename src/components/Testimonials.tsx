
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      company: "TechStart Solutions",
      content: "Alex delivered an exceptional repair management system that streamlined our entire workflow. His attention to detail and technical expertise exceeded our expectations.",
      rating: 5
    },
    {
      name: "Michael Chen", 
      company: "RetailPro Ltd",
      content: "The inventory system Alex built for us has been a game-changer. Real-time tracking and automated alerts have saved us countless hours and reduced errors significantly.",
      rating: 5
    },
    {
      name: "Jessica Brown",
      company: "Local Business Owner",
      content: "Professional, reliable, and incredibly skilled. Alex transformed our outdated website into a modern, responsive platform that our customers love.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            What Clients Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-slate-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="border-t pt-4">
                <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                <p className="text-slate-600 text-sm">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
