const axios = require('axios');

async function patch() {
  try {
    const loginRes = await axios.post('http://localhost:3000/api/auth/login', {
      email: 'varunjoshi84@gmail.com',
      password: 'admin123'
    });
    
    const token = loginRes.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    const { data: projects } = await axios.get('http://localhost:3000/api/projects');
    
    for (const p of projects) {
      if (p.image && p.image.includes('drive.google.com/uc?export=view&id=')) {
        const id = p.image.split('id=')[1];
        const newImage = `https://lh3.googleusercontent.com/d/${id}=w1000`;
        await axios.put(`http://localhost:3000/api/projects/${p._id}`, { image: newImage }, config);
        console.log(`Patched ${p.title}`);
      }
    }
    
    const { data: skills } = await axios.get('http://localhost:3000/api/skills');
    
    for (const s of skills) {
      if (s.icon && s.icon.includes('drive.google.com/uc?export=view&id=')) {
        const id = s.icon.split('id=')[1];
        const newIcon = `https://lh3.googleusercontent.com/d/${id}=w1000`;
        await axios.put(`http://localhost:3000/api/skills/${s._id}`, { icon: newIcon }, config);
        console.log(`Patched ${s.name}`);
      }
    }
    
    console.log("Patch complete!");
  } catch (err) {
    console.error(err.message);
  }
}

patch();
