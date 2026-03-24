import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code2, Server, Database, Smartphone } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <BookOpen className="text-accent" size={24} />,
      title: "Education",
      description: "B.Tech Computer Science 2023-2027, Lovely Professional University | CGPA: 7.80"
    },
    {
      icon: <Server className="text-accent" size={24} />,
      title: "Backend Focus",
      description: "Deep passion for backend engineering, system design, and building robust APIs."
    },
    {
      icon: <Code2 className="text-accent" size={24} />,
      title: "Full Stack Experience",
      description: "Experience building production-style full stack apps and real-time platforms."
    },
    {
      icon: <Database className="text-accent" size={24} />,
      title: "SaaS Products",
      description: "Strong interest in architecting and scaling SaaS products for the future."
    }
  ];

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-20 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl text-text font-heading font-bold">About Me</h2>
          <div className="h-[2px] bg-white/10 flex-grow max-w-[200px]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 text-[#a0a0a0] font-body text-lg leading-relaxed">
            <p>
              I am a dedicated Computer Science student with a deep passion for backend engineering and system architecture. My journey in software engineering has been driven by a fascination with how large-scale, distributed systems operate behind the scenes.
            </p>
            <p>
              Currently, my primary focus is on developing robust APIs, real-time web applications, and scalable SaaS products. I thrive in environments where performance and reliability are paramount, always seeking to optimize database interactions and server logic.
            </p>
            <p>
              When I'm not writing code or studying new architectural patterns, I enjoy exploring classic design systems and bringing a clean, minimalist approach to the applications I build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-white/5 bg-white/[0.02] rounded-sm hover:border-accent/50 transition-colors"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-text font-heading text-xl mb-2">{item.title}</h3>
                <p className="text-sm border-t border-white/5 pt-3 text-[#888]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
