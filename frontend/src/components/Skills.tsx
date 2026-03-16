import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

// Using devicons CDN — proper colored brand logos
const ICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const SkillCard: React.FC<{ name: string; icon: string; delay: number }> = ({ name, icon, delay }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className="group relative flex flex-col items-center gap-3 w-[90px] cursor-default"
    >
      {/* Card */}
      <div className="w-[72px] h-[72px] flex items-center justify-center
                      border border-white/8 bg-[#0d0d0d] rounded-sm
                      group-hover:border-accent/50 group-hover:bg-accent/[0.06]
                      transition-all duration-250 relative overflow-hidden">
        {/* Gold shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        bg-gradient-to-br from-accent/10 via-transparent to-transparent" />

        {imgError ? (
          <span className="text-[10px] font-mono text-[#666] text-center px-1 leading-tight">{name}</span>
        ) : (
          <img
            src={icon}
            alt={name}
            onError={() => setImgError(true)}
            className="w-9 h-9 object-contain transition-all duration-250
                       opacity-70 group-hover:opacity-100
                       group-hover:drop-shadow-[0_0_8px_rgba(201,169,110,0.35)]"
            loading="lazy"
          />
        )}
      </div>

      {/* Label */}
      <span className="text-[11px] font-mono text-[#555] group-hover:text-[#999]
                       transition-colors duration-200 text-center leading-tight w-full truncate px-1">
        {name}
      </span>

      {/* Accent dot indicator */}
      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-accent/0
                      group-hover:bg-accent/60 transition-all duration-200" />
    </motion.div>
  );
};

const Skills = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/skills`);
        const skillsData = res.data || [];
        
        // Group skills by category to match the UI format
        const grouped = skillsData.reduce((acc: any, skill: any) => {
          const cat = skill.category || 'Other';
          if (!acc[cat]) {
            acc[cat] = [];
          }
          acc[cat].push({ name: skill.name, icon: skill.iconUrl || skill.icon || `${ICON_BASE}/devicon/devicon-original.svg` });
          return acc;
        }, {});

        // Format into the categories array structure expected by the component
        const formattedCategories = Object.keys(grouped).map((catName, index) => ({
          title: catName,
          num: `0${index + 1}`.slice(-2),
          skills: grouped[catName]
        }));
        
        setCategories(formattedCategories);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-20 w-full border-t border-white/5 flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 w-full border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <div className="flex items-center gap-4 mb-16 justify-end">
          <div className="h-px bg-white/10 flex-grow max-w-[200px]" />
          <h2 className="text-4xl text-text font-heading font-bold">Technical Skills</h2>
        </div>

        {/* Categories stacked */}
        <div className="flex flex-col gap-10">
          {categories.length === 0 ? (
            <div className="text-[#666] text-center w-full py-10 font-mono text-sm">No skills found.</div>
          ) : (
            categories.map((category, cIdx) => (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: cIdx * 0.08 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[11px] text-accent/40 w-6">{category.num}.</span>
                  <span className="font-mono text-xs text-[#555] uppercase tracking-[0.2em]">{category.title}</span>
                  <div className="h-px bg-white/[0.06] flex-grow" />
                </div>

                {/* Skills row */}
                <div className="flex flex-wrap gap-4 pl-9">
                  {category.skills.map((skill: any, sIdx: number) => (
                    <SkillCard
                      key={sIdx}
                      name={skill.name}
                      icon={skill.icon}
                      delay={cIdx * 0.04 + sIdx * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Bottom accent line */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Skills;