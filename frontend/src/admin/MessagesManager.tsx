import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, CheckCircle, Clock } from 'lucide-react';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const MessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/contact', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch messages');
      
      const data = await res.json();
      setMessages(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/contact/${id}/read`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to mark as read');
      
      // Update local state
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch (err: any) {
      console.error(err);
      alert('Error updating message status');
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(d);
  };

  if (loading) return <div className="text-[#888] font-body">Loading messages...</div>;
  if (error) return <div className="text-red-400 font-body">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text mb-2">Messages</h1>
          <p className="text-[#888] font-body text-sm">
            View and manage contact form submissions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm text-center">
            <p className="text-[#888] font-body">No messages received yet.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`bg-[#0a0a0a] border ${msg.isRead ? 'border-white/5 opacity-70' : 'border-accent/40'} p-6 rounded-sm relative overflow-hidden group transition-all`}
            >
              {!msg.isRead && (
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              )}
              
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4 w-full">
                  <div className="bg-white/5 p-3 rounded-sm text-accent">
                    {msg.isRead ? <MailOpen size={24} /> : <Mail size={24} />}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-text">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-accent hover:underline text-sm font-body">
                      {msg.email}
                    </a>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="flex items-center gap-2 text-[#888] text-xs font-body mb-1">
                      <Clock size={12} />
                      {formatDate(msg.createdAt)}
                    </div>
                    {!msg.isRead ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">
                        New
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-[#888]">
                        Read
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-[#d0d0d0] font-body text-sm leading-relaxed whitespace-pre-wrap pl-16">
                {msg.message}
              </div>

              <div className="mt-6 flex justify-end gap-3 pl-16 border-t border-white/5 pt-4">
                {!msg.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(msg._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-text text-sm rounded-sm transition-colors font-body"
                  >
                    <CheckCircle size={16} />
                    Mark as Read
                  </button>
                )}
                <a
                  href={`mailto:${msg.email}?subject=Reply to your Portfolio message`}
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent hover:bg-accent hover:text-background text-sm rounded-sm transition-colors font-body font-medium"
                >
                  <Mail size={16} />
                  Reply
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
