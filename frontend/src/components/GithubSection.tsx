import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Users, Star, GitCommit } from 'lucide-react';

const GITHUB_USERNAME = 'varunjoshi84';
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const GithubSection = () => {
  const stats = [
    { label: 'Repositories', value: '10', icon: GitCommit },
    { label: 'Followers',    value: '5',  icon: Users     },
    { label: 'Stars',        value: '3',  icon: Star      },
  ];

  const [weeks, setWeeks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [total, setTotal]     = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        const contributions = data.contributions ?? [];
        const grouped = [];
        let week = [];
        contributions.forEach((day, idx) => {
          week.push(day);
          if (week.length === 7 || idx === contributions.length - 1) {
            grouped.push(week);
            week = [];
          }
        });
        setWeeks(grouped);
        setTotal(contributions.reduce((s, d) => s + (d.count ?? 0), 0));
      } catch (e) {
        setError(e.message);
        setWeeks(
          Array.from({ length: 53 }, () =>
            Array.from({ length: 7 }, () => ({ level: Math.floor(Math.random() * 5), count: 0, date: '' }))
          )
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cellStyle = (level) => {
    if (level === 0) return { backgroundColor: 'rgba(255,255,255,0.05)' };
    const pct = [20, 40, 65, 100][level - 1];
    return {
      backgroundColor: `color-mix(in srgb, var(--color-accent, #c9a96e) ${pct}%, transparent)`,
    };
  };

  return (
    <section id="github" className="py-20 w-full border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <div className="flex items-center gap-4 mb-14 justify-end">
          <div className="h-px bg-white/10 flex-grow max-w-[200px]" />
          <h2 className="text-4xl text-text font-heading font-bold">Open Source</h2>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-5 w-full items-stretch">

          {/* LEFT — stats */}
          <div className="flex flex-col gap-3 lg:w-[240px] shrink-0">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between px-5 py-4 border border-white/10 bg-[#111] rounded-sm hover:border-accent transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Github size={20} className="text-text group-hover:text-accent transition-colors" />
                <span className="font-heading text-sm text-text">@{GITHUB_USERNAME}</span>
              </div>
              <span className="text-accent/40 group-hover:text-accent transition-colors">↗</span>
            </a>

            {stats.map(({ label, value, icon: Icon }, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border border-white/5 bg-[#0a0a0a] rounded-sm">
                <Icon size={16} className="text-accent shrink-0" />
                <span className="text-xl font-mono text-text">{value}</span>
                <span className="text-sm text-[#666]">{label}</span>
              </div>
            ))}

            {!loading && !error && total > 0 && (
              <div className="px-5 py-3 border border-accent/20 bg-accent/5 rounded-sm text-center mt-1">
                <span className="text-accent font-mono text-lg">{total.toLocaleString()}</span>
                <p className="text-[#666] text-xs mt-0.5">contributions this year</p>
              </div>
            )}
          </div>

          {/* RIGHT — heatmap, vertically centered */}
          <div className="flex-1 border border-white/10 bg-[#0a0a0a] rounded-sm flex flex-col justify-center px-8 py-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-sm text-text flex items-center gap-2">
                <Github size={15} className="text-accent" />
                Contribution Activity
                {error && <span className="text-[11px] text-[#555] ml-1">(preview)</span>}
              </h3>
              <span className="text-[11px] text-[#555] font-mono">Last 12 months</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-10">
                <span className="text-[#555] text-sm animate-pulse tracking-widest">loading…</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Graph */}
                <div
                  className="flex gap-2 overflow-x-auto"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#2a2a2a transparent' }}
                >
                  {/* Day labels */}
                  <div className="flex flex-col shrink-0" style={{ gap: 3, paddingTop: 1 }}>
                    {DAY_LABELS.map((d, i) => (
                      <div
                        key={i}
                        style={{ height: 13, fontSize: 9, lineHeight: '13px', color: '#555', textAlign: 'right', paddingRight: 4, width: 24 }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Week columns */}
                  <div className="flex flex-row" style={{ gap: 3, minWidth: 'max-content' }}>
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col" style={{ gap: 3 }}>
                        {week.map((day, di) => (
                          <div
                            key={di}
                            title={day.date ? `${day.date}: ${day.count} contributions` : undefined}
                            style={{ width: 13, height: 13, borderRadius: 2, flexShrink: 0, ...cellStyle(day.level ?? 0) }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span style={{ fontSize: 10, color: '#555', marginRight: 4 }}>Less</span>
                  {[0, 1, 2, 3, 4].map(l => (
                    <div key={l} style={{ width: 13, height: 13, borderRadius: 2, ...cellStyle(l) }} />
                  ))}
                  <span style={{ fontSize: 10, color: '#555', marginLeft: 4 }}>More</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default GithubSection;