import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });
    
    try {
      await axios.post('import.meta.env.VITE_API_URL/api/contact', formData);
      setStatus({ type: 'success', message: 'Message sent successfully! Check your email for a confirmation.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 w-full border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">What's Next?</span>
          <h2 className="text-5xl text-text font-heading font-bold mb-6">Get In Touch</h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto font-body">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 max-w-4xl mx-auto">

          {/* Contact Info */}
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-heading text-text mb-4">Contact Information</h3>
            <p className="text-[#a0a0a0] mb-6">Feel free to reach out via email or connect with me on social media.</p>
            <div className="flex flex-col gap-4">
              <a href="mailto:varunpndey@outlook.com" className="flex items-center gap-3 text-text hover:text-accent transition-colors">
                <Mail size={20} className="text-accent shrink-0" />
                <span>varunpndey@outlook.com</span>
              </a>
              <a href="https://github.com/varunjoshi84" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text hover:text-accent transition-colors">
                <Github size={20} className="text-accent shrink-0" />
                <span>github.com/varunjoshi84</span>
              </a>
              <a href="https://linkedin.com/in/varunjoshi84" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text hover:text-accent transition-colors">
                <Linkedin size={20} className="text-accent shrink-0" />
                <span>linkedin.com/in/varunjoshi84</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full md:w-2/3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-mono text-[#a0a0a0]">Name</label>
              <input
                type="text" id="name" required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#0f0f0f] border border-white/10 rounded-sm p-3 text-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-mono text-[#a0a0a0]">Email</label>
              <input
                type="email" id="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#0f0f0f] border border-white/10 rounded-sm p-3 text-text focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-mono text-[#a0a0a0]">Message</label>
              <textarea
                id="message" required rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-[#0f0f0f] border border-white/10 rounded-sm p-3 text-text focus:outline-none focus:border-accent transition-colors resize-none custom-scrollbar"
              />
            </div>
            
            {status.message && (
              <div className={`p-3 rounded-sm text-sm border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                {status.message}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center gap-2 py-4 px-8 border border-accent rounded-sm transition-all duration-300 font-medium ${loading ? 'opacity-50 cursor-not-allowed bg-accent/10 text-accent/50' : 'text-accent hover:bg-accent hover:text-background'}`}
            >
              <Send size={18} />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

        </div>
      </motion.div>
    </section>
  );
};

export default Contact;