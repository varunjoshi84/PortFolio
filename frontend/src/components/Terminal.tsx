import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'VarunOS (v1.0.0) - TermJS interface' },
    { type: 'system', content: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic: only when near bottom or new command was just added
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !bottomRef.current) return;

    const isAtBottom =
      Math.abs(
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight
      ) < 100; // within ~100px of bottom

    // If user is scrolled up reading history → don't force scroll
    // But do scroll after they send a command (or if already near bottom)
    if (isAtBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const handleCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      setInput('');

      if (cmd === '') return;

      let newHistory = [...history, { type: 'user', content: `$ ${cmd}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            content: 'Available commands: help, projects, skills, contact, resume, github, clear'
          });
          break;
        case 'projects':
          newHistory.push({ type: 'system', content: 'Fetching projects from database...' });
          setHistory([...newHistory]);
          try {
            const { data } = await axios.get('import.meta.env.VITE_API_URL/api/projects');
            if (data.length === 0) {
              newHistory.push({ type: 'output', content: 'No projects found.' });
            } else {
              data.forEach((p: any) => {
                let text = `> ${p.title} - ${p.description}`;
                if (p.githubLink) text += ` [GitHub: ${p.githubLink}]`;
                if (p.liveLink) text += ` [Live: ${p.liveLink}]`;
                newHistory.push({ type: 'output', content: text });
              });
            }
          } catch (err) {
            newHistory.push({ type: 'output', content: 'Error reaching server.' });
          }
          setHistory([...newHistory]);
          return;
        case 'skills':
          newHistory.push({ type: 'system', content: 'Fetching skills from database...' });
          setHistory([...newHistory]);
          try {
            const { data } = await axios.get('import.meta.env.VITE_API_URL/api/skills');
            if (data.length === 0) {
              newHistory.push({ type: 'output', content: 'No skills found.' });
            } else {
              const grouped: Record<string, string[]> = {};
              data.forEach((s: any) => {
                if (!grouped[s.category]) grouped[s.category] = [];
                grouped[s.category].push(s.name);
              });
              Object.entries(grouped).forEach(([cat, names]) => {
                newHistory.push({ type: 'output', content: `${cat}: ${names.join(', ')}` });
              });
            }
          } catch (err) {
            newHistory.push({ type: 'output', content: 'Error reaching server.' });
          }
          setHistory([...newHistory]);
          return;
        case 'contact':
          newHistory.push({
            type: 'output',
            content: `Email: ${import.meta.env.VITE_CONTACT_EMAIL || 'varunpndey@outlook.com'}`
          });
          break;
        case 'resume':
          newHistory.push({
            type: 'output',
            content: `Link: ${import.meta.env.VITE_CV_LINK || 'None configured'}`
          });
          break;
        case 'github':
          newHistory.push({
            type: 'output',
            content: `${import.meta.env.VITE_GITHUB_LINK || 'https://github.com/varunjoshi84'}`
          });
          break;
        case 'clear':
          setHistory([]);
          return;
        default:
          newHistory.push({
            type: 'output',
            content: `Command not found: ${cmd}`
          });
      }

      setHistory(newHistory);
    }
  };

  return (
    <section id="terminal" className="py-20 w-full border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-10 w-full">
          <div className="h-[2px] bg-white/10 flex-grow"></div>
          <h2 className="text-3xl text-text font-heading font-bold whitespace-nowrap">
            Developer Terminal
          </h2>
          <div className="h-[2px] bg-white/10 flex-grow"></div>
        </div>

        <div className="bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-2xl h-[400px] flex flex-col font-mono text-sm leading-relaxed">
          {/* Terminal Header */}
          <div className="bg-[#111] px-4 py-3 border-b border-white/10 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-[#666] ml-4 text-xs font-sans">varun@portfolio: ~</span>
          </div>

          {/* Terminal Body */}
          <div
            ref={scrollContainerRef}
            className="p-6 overflow-y-auto flex-grow text-[#00ffcc] custom-scrollbar"
            style={{ textShadow: "0 0 5px rgba(0, 255, 204, 0.3)" }}
          >
            {history.map((entry, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  entry.type === 'user'
                    ? 'text-white'
                    : entry.type === 'system'
                    ? 'text-[#888]'
                    : 'text-accent'
                }`}
              >
                {entry.content}
              </div>
            ))}

            <div className="flex items-center gap-2 text-white">
              <span className="text-[#00ffcc]">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent outline-none flex-grow caret-white"
                autoFocus
              />
            </div>

            {/* Invisible anchor for scrolling to bottom */}
            <div ref={bottomRef} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Terminal;