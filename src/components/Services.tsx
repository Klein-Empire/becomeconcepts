
import { Code, Wrench, Palette, Database, CreditCard, GraduationCap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Design & Development",
      description: "Custom websites and web applications built with modern technologies and best practices."
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "IT Support & Troubleshooting", 
      description: "Comprehensive IT support, network troubleshooting, and technical problem resolution."
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "WordPress Theme Customization",
      description: "Custom WordPress themes and plugins tailored to your specific business needs."
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Repair Management System Design",
      description: "Complete systems for tracking repairs, inventory, and service requests with automation."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Payment Integration",
      description: "Secure payment gateway integration including M-Pesa Daraja API and other solutions."
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Digital Skills Training & Consultancy",
      description: "Training programs and consultancy services to enhance your team's digital capabilities."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            My Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive IT solutions and web development services to help your business thrive in the digital world.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-blue-600 mb-6 group-hover:text-purple-600 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
