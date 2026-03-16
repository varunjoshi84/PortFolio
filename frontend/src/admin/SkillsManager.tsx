import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const SkillsManager = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', category: 'Frontend', icon: '' });
  const [loading, setLoading] = useState(false);

  // Dummy fetch for visual test
  const fetchSkills = async () => {
    try {
      const res = await axios.get('import.meta.env.VITE_API_URL/api/skills');
      setSkills(res.data);
    } catch {
      setSkills([
        { _id: '1', name: 'NestJS', category: 'Backend' },
        { _id: '2', name: 'React', category: 'Frontend' }
      ]);
    }
  };

  useEffect(() => {
    fetchSkills();
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
    if (!formData.name.trim() || !formData.icon.trim()) {
      alert("Name and Icon URL are required");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        ...formData,
        icon: parseDriveLink(formData.icon)
      };
      
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/skills/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('import.meta.env.VITE_API_URL/api/skills', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: '', category: 'Frontend', icon: '' });
      fetchSkills(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to save skill");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: any) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'Frontend',
      icon: skill.icon || skill.iconUrl || ''
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSkills();
    } catch (err) {
      console.error(err);
      alert("Failed to delete skill");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading text-text">Manage Skills</h1>
        <button 
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            setEditingId(null);
            setFormData({ name: '', category: 'Frontend', icon: '' });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-sm hover:bg-[#b09257] transition-colors font-medium text-sm"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-10 p-6 bg-[#0a0a0a] border border-white/10 rounded-sm">
          <h2 className="text-xl font-heading text-text mb-6">
            {editingId ? 'Edit Skill' : 'Create New Skill'}
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">Skill Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-mono text-[#888]">Icon URL (Devicon or URL)</label>
              <input 
                type="text" 
                placeholder="https://cdn.jsdelivr.net/..."
                value={formData.icon}
                onChange={e => setFormData({...formData, icon: e.target.value})}
                className="bg-[#111] border border-white/5 p-3 rounded-sm text-text focus:outline-none focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-mono text-[#888]">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="bg-[#111] border border-white/5 p-3 rounded-sm text-[#888] focus:outline-none focus:border-accent"
              >
                <option>Frontend</option>
                <option>Backend</option>
                <option>Databases</option>
                <option>Languages</option>
                <option>Tools & DevOps</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button 
                type="button" 
                disabled={loading}
                onClick={handleSave} 
                className="px-6 py-2 bg-accent text-background font-medium rounded-sm disabled:opacity-50"
              >
                {loading ? 'Saving...' : (editingId ? 'Update Skill' : 'Save Skill')}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingId(null);
                }} 
                className="px-6 py-2 bg-[#222] text-text border border-white/10 font-medium rounded-sm hover:bg-[#333] transition-colors"
              >
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
              <th className="p-4 text-sm font-mono text-[#888] font-normal w-12">Icon</th>
              <th className="p-4 text-sm font-mono text-[#888] font-normal">Skill Name</th>
              <th className="p-4 text-sm font-mono text-[#888] font-normal">Category</th>
              <th className="p-4 text-sm font-mono text-[#888] font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4 text-text">
                  <img src={skill.icon || skill.iconUrl} alt={skill.name} className="w-6 h-6 object-contain opacity-70" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </td>
                <td className="p-4 text-text">{skill.name}</td>
                <td className="p-4 text-[#a0a0a0] text-sm">{skill.category}</td>
                <td className="p-4 flex gap-3 justify-end items-center h-[57px]">
                  <button onClick={() => handleEdit(skill)} className="p-2 text-[#888] hover:text-accent transition-colors"><Edit2 size={16}/></button>
                  <button onClick={() => handleDelete(skill._id)} className="p-2 text-[#888] hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-[#888]">No skills found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillsManager;
