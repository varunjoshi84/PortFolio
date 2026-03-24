import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Code, ExternalLink } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      icon: <Flame className="text-accent" size={24} />,
      title: "200 Days Streak",
      description: "Maintained a continuous 200-day problem-solving streak on LeetCode.",
    },
    {
      icon: <Code className="text-accent" size={24} />,
      title: "400+ Problems Solved",
      description: "Successfully solved over 400 algorithmic and data structure problems.",
    },
    {
      icon: <Trophy className="text-accent" size={24} />,
      title: "LeetCode Profile",
      description: "Check out my LeetCode account for detailed stats and badges.",
      link: "https://leetcode.com/u/varunjoshi84/",
      linkText: "View Profile"
    }
  ];

  return (
    <section id="achievements" className="py-20 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl text-text font-heading font-bold">Achievements</h2>
          <div className="h-[2px] bg-white/10 flex-grow max-w-[200px]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 border border-white/5 bg-white/[0.02] rounded-sm hover:border-accent/50 transition-colors flex flex-col h-full"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-text font-heading text-xl mb-2">{item.title}</h3>
              <p className="text-sm border-t border-white/5 pt-3 text-[#888] flex-grow">{item.description}</p>
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-accent text-sm hover:underline"
                >
                  {item.linkText} <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Achievements;
