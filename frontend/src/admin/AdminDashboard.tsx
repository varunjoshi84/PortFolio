import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-2">Admin Portal</p>
        <h1 className="text-4xl font-heading text-text">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-sm">
          <p className="text-[#888] text-sm font-mono mb-2">Total Projects</p>
          <h2 className="text-4xl font-heading text-accent">3</h2>
        </div>
        <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-sm">
          <p className="text-[#888] text-sm font-mono mb-2">Total Skills</p>
          <h2 className="text-4xl font-heading text-accent">14</h2>
        </div>
        <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-sm">
          <p className="text-[#888] text-sm font-mono mb-2">Page Views</p>
          <h2 className="text-4xl font-heading text-accent">--</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;