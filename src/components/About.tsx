
const About = () => {
  const skills = [
    "UI/UX Design",
    "HTML, CSS, PHP, JavaScript", 
    "WordPress Customization",
    "Backend Development (MySQL, Laravel basics)",
    "IT Support & Network Troubleshooting",
    "System Design (Inventory, Payment APIs, Service Request Modules)"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              With over 5 years of experience in website design and IT solutions, I specialize in creating 
              robust digital experiences that solve real-world problems. My journey began with a passion 
              for technology and has evolved into expertise across multiple domains.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              From crafting beautiful, responsive websites to developing complex system modules, I bring 
              a comprehensive approach to every project. I believe in clean code, user-centered design, 
              and solutions that scale with your business needs.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Whether you need a stunning website, IT support, or custom system development, I'm here 
              to turn your vision into reality with technical excellence and creative problem-solving.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Key Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-4"></div>
                  <span className="text-slate-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
