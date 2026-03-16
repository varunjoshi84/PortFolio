import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-[90vh] flex flex-col-reverse md:flex-row justify-center items-center pt-24 gap-12 md:gap-20 w-full mb-20 md:mb-0">
      
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
      >
        <span className="text-accent font-mono text-sm mb-4 tracking-widest uppercase">Hi, my name is</span>
        <h1 className="text-5xl md:text-7xl font-heading font-bold text-text mb-6">
          Varun Joshi.
        </h1>
        <h2 className="text-2xl md:text-3xl font-heading text-[#a0a0a0] mb-8">
          Software Engineer | Backend Developer | MERN & NestJS | Android Developer
        </h2>
        
        <p className="text-lg text-[#888] font-body max-w-xl mb-10 leading-relaxed">
          Computer Science student passionate about building scalable backend systems, SaaS applications, and real-time web platforms.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <a href="#projects" className="flex items-center gap-2 px-6 py-3 bg-accent text-background font-medium hover:bg-[#b09257] transition-colors rounded-sm">
            View Projects
            <ArrowRight size={18} />
          </a>
          
          <a href="#contact" className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-accent text-text transition-colors rounded-sm">
            <Mail size={18} />
            Contact
          </a>

          <a href={import.meta.env.VITE_CV_LINK || "#"} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-accent text-text transition-colors rounded-sm group">
            <FileText size={20} className="group-hover:text-accent transition-colors" />
            Resume
          </a>

          <a href="https://github.com/varunjoshi84" target="_blank" rel="noreferrer" className="flex items-center justify-center p-3 border border-white/20 hover:border-accent text-text transition-colors rounded-sm">
            <Github size={20} />
          </a>
        </div>
      </motion.div>

      {/* Image Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center md:justify-end"
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full">
          <img 
            src="/image1.jpeg"
            alt="Varun Joshi - Software Engineer" 
            className="w-full h-full object-cover rounded-full border-2 border-accent shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-10 relative"
          />
          {/* Decorative background element behind image */}
          <div className="absolute inset-0 rounded-full border border-white/10 translate-x-4 translate-y-4 -z-10"></div>
        </div>
      </motion.div>
      
    </section>
  );
};

export default Hero;
