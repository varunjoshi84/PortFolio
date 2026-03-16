const axios = require('axios');

const projects = [
  {
    title: "AgriChain",
    description: "Supply chain transparency platform built using MERN stack with role-based authentication and real-time product tracking.",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1472&auto=format&fit=crop",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    githubLink: "https://github.com/varunjoshi84/AgTrace.git"
  },
  {
    title: "FintrackAI",
    description: "AI-powered financial SaaS that parses bank statements and categorizes transactions with interactive dashboards.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    techStack: ["HTML","TailwindCSS","React.JS", "Node.js", "MongoDB", "Express", "Socket.io"],
    githubLink: "https://github.com/varunjoshi84/FintrackAI.git",
    liveLink: "https://fintackai.vercel.app/"
  }
];

const skills = [
  { name: "C++", category: "Languages", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", category: "Languages", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Node.js", category: "Backend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "React.js", category: "Frontend", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" }
];

async function seed() {
  try {
    const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'varunjoshi84@gmail.com',
      password: 'admin123'
    });
    
    const token = loginRes.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    for (const p of projects) {
      await axios.post('http://localhost:3000/api/projects', p, config);
    }
    
    for (const s of skills) {
      await axios.post('http://localhost:3000/api/skills', s, config);
    }
    
    console.log("Seeding complete!");
  } catch (err) {
    console.error(err.message);
  }
}

seed();
