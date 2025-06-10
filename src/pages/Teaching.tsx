
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Play, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Teaching = () => {
  const courses = [
    {
      id: 1,
      title: "Digital Journalism Fundamentals",
      instructor: "Sarah Johnson",
      duration: "6 weeks",
      students: 1250,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      description: "Master the art of digital storytelling and modern journalism techniques",
      price: "$199",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Data-Driven Reporting",
      instructor: "Michael Chen",
      duration: "8 weeks",
      students: 890,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Learn to analyze and present data effectively in your reporting",
      price: "$299",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Video Production for News",
      instructor: "Emily Rodriguez",
      duration: "10 weeks",
      students: 670,
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
      description: "Create compelling video content for digital news platforms",
      price: "$399",
      level: "Advanced"
    }
  ];

  const features = [
    {
      icon: GraduationCap,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: Play,
      title: "Interactive Content",
      description: "Engage with video lessons, quizzes, and practical exercises"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Learn at your own pace with lifetime access to content"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a network of learners and get peer support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
            Concepts Academy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Master the skills of modern journalism and digital media with our comprehensive courses
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-3 rounded-xl">
            Start Learning Today
          </Button>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center border border-purple-100">
              <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses designed to advance your journalism career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <div className="text-2xl font-bold text-purple-600">{course.price}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {course.instructor}</span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Enroll Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 text-center">
          <GraduationCap className="h-16 w-16 text-purple-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
            Stay Updated with New Courses
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to be the first to know about new courses and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Teaching;
