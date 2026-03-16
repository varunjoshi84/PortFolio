import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ProjectsManager = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '',
    githubLink: '',
    liveLink: ''
  });
  
  // Dummy data for visual setup if backend isn't linked yet.
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
      setProjects(res.data);
    } catch {
      // Fallback dummy for development view
      setProjects([
        { _id: '1', title: 'AgriChain', techStack: ['React', 'Node.js'] },
        { _id: '2', title: 'FintrackAI', techStack: ['NestJS', 'React'] }
      ]);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const parseDriveLink = (url: string) => {
    if (!url) return url;
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)\/view/);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
    }
    return url;
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.image.trim()) {
      alert("Title and Image URL are required");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        ...formData,
        image: parseDriveLink(formData.image),
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '' });
      fetchProjects(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: any) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      techStack: project.techStack ? project.techStack.join(', ') : '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || ''
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-text">Manage Projects</h1>
        <button 
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setEditingId(null);
            setFormData({ title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '' });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-sm hover:bg-[#b09257] transition-colors font-medium text-sm"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-10 p-6 bg-[#0a0a0a] border border-white/10 rounded-sm">
          <h2 className="text-xl font-heading text-text mb-6">
            {editingId ? 'Edit Project' : 'Create New Project'}
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">Image URL</label>
              <input type="text" placeholder="https://images.unsplash..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">Tech Stack (comma separated)</label>
              <input type="text" placeholder="React, Node.js, MongoDB" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">GitHub Link (Optional)</label>
              <input type="text" placeholder="https://github.com/..." value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent"/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">Live Link (Optional)</label>
              <input type="text" placeholder="https://..." value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent"/>
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">Description</label>
              <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent resize-none custom-scrollbar"/>
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button type="button" disabled={loading} onClick={handleSave} className="px-6 py-2 bg-accent text-background font-medium rounded-sm disabled:opacity-50">
                {loading ? 'Saving...' : (editingId ? 'Update Project' : 'Save Project')}
              </button>
              <button type="button" onClick={() => {
                setIsFormOpen(false);
                setEditingId(null);
              }} className="px-6 py-2 bg-[#222] text-text border border-white/10 font-medium rounded-sm hover:bg-[#333] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] border-b border-white/5">
              <th className="p-4 text-sm font-mono text-[#888] font-normal w-24">Image</th>
              <th className="p-4 text-sm font-mono text-[#888] font-normal">Title</th>
              <th className="p-4 text-sm font-mono text-[#888] font-normal">Tech Stack</th>
              <th className="p-4 text-sm font-mono text-[#888] font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-text">
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} className="w-16 h-10 object-cover rounded-sm border border-white/10" />
                  ) : (
                    <div className="w-16 h-10 bg-white/5 rounded-sm border border-white/10 flex items-center justify-center text-[10px] text-[#555]">No Img</div>
                  )}
                </td>
                <td className="p-4 text-text">{proj.title}</td>
                <td className="p-4 text-[#a0a0a0] text-sm">{proj.techStack?.join(', ')}</td>
                <td className="p-4 flex gap-3 justify-end items-center h-[73px]">
                  <button onClick={() => handleEdit(proj)} className="p-2 text-[#888] hover:text-accent transition-colors"><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(proj._id)} className="p-2 text-[#888] hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-[#888]">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsManager;
