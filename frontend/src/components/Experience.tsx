import React from 'react';
import { motion } from 'framer-motion';

const ExperienceCard: React.FC<{ title: string; role: string; link: string; delay: number }> = ({ title, role, link, delay }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group block w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] relative"
    >
      <div className="h-full p-6 border border-white/10 bg-[#0d0d0d] rounded-sm group-hover:border-accent/40 group-hover:bg-accent/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden">
        {/* Shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" />
        
        <div>
          <div className="flex items-center justify-between mb-4">
             <div className="w-10 h-10 rounded-sm bg-[#151515] border border-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                <svg className="w-5 h-5 text-accent/80 group-hover:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
             </div>
             <svg className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </div>
          <h3 className="text-base text-text font-heading font-medium tracking-wide mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2 min-h-[48px]">{title}</h3>
          <p className="text-xs text-[#888] font-mono leading-relaxed line-clamp-1">{role}</p>
        </div>
      </div>
    </motion.a>
  );
};

const Experience = () => {
  const experiences = [
    {
      category: 'Internship & Trainee',
      num: '01',
      items: [
        {
          title: 'W3Grades MERN with GENAi',
          role: 'Trainee',
          link: 'https://drive.google.com/file/d/1OvMUdC4GRG8dTCUZuX_OVTOfUymYjkVA/view?usp=drive_link',
        }
      ]
    },
    {
      category: 'Hackathons',
      num: '02',
      items: [
        {
          title: 'Hack IoT Hackathon',
          role: 'Organized by LPU',
          link: 'https://drive.google.com/file/d/1Tlose1aqIV2e6TrSc286iJvU7eo2kePB/view?usp=drive_link',
        },
        {
          title: 'Xto10X Hackathon Edition #3',
          role: 'Organized by Masai',
          link: 'https://drive.google.com/file/d/18cVDDJWAeBvQp67N-KttumrRBejN1Ya1/view?usp=drive_link',
        }
      ]
    },
    {
      category: 'Certifications',
      num: '03',
      items: [
        {
          title: 'Computer communication',
          role: 'University of Colorado on Coursera',
          link: 'https://drive.google.com/file/d/18cVDDJWAeBvQp67N-KttumrRBejN1Ya1/view?usp=drive_link',
        },
        {
          title: 'Problem Solving Intermediate',
          role: 'HackerRank (or similar)',
          link: 'https://drive.google.com/file/d/1Y7LYpMeXilCzlYW_3tM8dR2eVMwx-Yes/view?usp=drive_link',
        }
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 w-full border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <div className="flex items-center gap-4 mb-16 justify-start">
          <h2 className="text-4xl text-text font-heading font-bold">Experience & Certifications</h2>
          <div className="h-px bg-white/10 flex-grow max-w-[200px]" />
        </div>

        {/* Categories stacked */}
        <div className="flex flex-col gap-12">
          {experiences.map((category, cIdx) => (
            <motion.div
              key={cIdx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: cIdx * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-[11px] text-accent/40 w-6">{category.num}.</span>
                <span className="font-mono text-xs text-[#555] uppercase tracking-[0.2em]">{category.category}</span>
                <div className="h-px bg-white/[0.06] flex-grow" />
              </div>

              {/* Items row */}
              <div className="flex flex-wrap gap-4 lg:gap-6 pl-9">
                {category.items.map((item, iIdx) => (
                  <ExperienceCard
                    key={iIdx}
                    title={item.title}
                    role={item.role}
                    link={item.link}
                    delay={cIdx * 0.1 + iIdx * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default Experience;
