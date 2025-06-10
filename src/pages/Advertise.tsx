
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Users, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Advertise = () => {
  const packages = [
    {
      name: "Basic",
      price: "$299",
      period: "per month",
      features: [
        "Banner advertisements",
        "Up to 10,000 impressions",
        "Basic analytics",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$599",
      period: "per month",
      features: [
        "Banner + sidebar ads",
        "Up to 50,000 impressions",
        "Advanced analytics",
        "Video ad support",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$1,299",
      period: "per month",
      features: [
        "All ad placements",
        "Unlimited impressions",
        "Custom campaigns",
        "Video + interactive ads",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  const stats = [
    { icon: Users, value: "2.5M+", label: "Monthly Visitors" },
    { icon: TrendingUp, value: "85%", label: "Engagement Rate" },
    { icon: Target, value: "15+", label: "Target Categories" },
    { icon: Star, value: "4.9/5", label: "Advertiser Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
            Advertise with Concepts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Reach millions of engaged readers with our premium advertising solutions
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-3 rounded-xl">
            Get Started Today
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center border border-purple-100">
              <stat.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
              Advertising Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the perfect package for your advertising needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-xl p-8 border-2 ${pkg.popular ? 'border-purple-500 relative' : 'border-purple-100'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-1">
                    {pkg.price}
                  </div>
                  <div className="text-gray-600">{pkg.period}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className={`w-full ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'}`}>
                  Choose {pkg.name}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact our advertising team to discuss custom packages and enterprise solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8">
              Contact Sales
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Advertise;
