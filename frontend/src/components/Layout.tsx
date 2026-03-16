import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About',    href: '#about'    },
    { name: 'Skills',   href: '#skills'   },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact',  href: '#contact'  },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <Link to="/" className="text-2xl font-heading font-bold tracking-wider text-text">
            VJ<span className="text-accent">.</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-body uppercase tracking-widest text-[#a0a0a0] hover:text-accent transition-colors duration-300">
                {link.name}
              </a>
            ))}
          </nav>
          <button className="md:hidden text-text" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-heading tracking-widest text-text hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main — no min-h, no flex-grow, just natural height */}
      <main className="w-full">
        <div className="container mx-auto px-6 max-w-6xl w-full">
          <Outlet />
        </div>
      </main>

      {/* Footer — immediately after content */}
      <footer className="w-full py-8 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-[#a0a0a0] font-body text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Varun Joshi. All rights reserved.
            </p>
            <Link to="/admin/login" className="text-[#666] hover:text-accent font-body text-xs uppercase tracking-widest transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;