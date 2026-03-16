import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('import.meta.env.VITE_API_URL/api/projects');
        // Fallback to empty array if no data
        setProjects(res.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 w-full border-t border-white/5 flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 w-full border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <div className="flex items-center gap-4 mb-14">
          <h2 className="text-4xl text-text font-heading font-bold">Featured Projects</h2>
          <div className="h-px bg-white/10 flex-grow max-w-[200px]" />
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const ProjectCard = ({ project, idx }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col border border-white/5 bg-[#0d0d0d] rounded-sm overflow-hidden hover:border-accent/30 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-accent/20 group-hover:bg-accent/5 transition-colors duration-500 z-10" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Links — appear on hover */}
        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-black/70 backdrop-blur-sm border border-white/10 rounded-sm text-text hover:text-accent transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <Github size={15} />
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-black/70 backdrop-blur-sm border border-white/10 rounded-sm text-text hover:text-accent transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-heading text-text group-hover:text-accent transition-colors duration-300 leading-tight">
            {project.title}
          </h3>
          <span className="text-[10px] font-mono text-accent/60 uppercase tracking-widest mt-1 shrink-0">
            0{String.fromCharCode(49 + (Math.floor(Math.random() * 0))/* keep fixed */)}
          </span>
        </div>

        <p className="text-sm text-[#888] leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-mono text-[#666] border border-white/5 px-2 py-0.5 rounded-sm bg-white/[0.02]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-accent/50 transition-all duration-500" />
    </motion.div>
  );
};

export default Projects;