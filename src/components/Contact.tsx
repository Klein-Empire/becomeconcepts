
import { Mail, Phone, Download, Linkedin, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Let's Connect</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-medium text-slate-800">Email</p>
                    <p className="text-slate-600">alex.johnson@email.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-600 mr-4" />
                  <div>
                    <p className="font-medium text-slate-800">WhatsApp</p>
                    <p className="text-slate-600">+254 700 123 456</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mb-6">
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="hover:bg-blue-50">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-gray-50">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-blue-50">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
