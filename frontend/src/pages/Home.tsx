import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import GithubSection from '../components/GithubSection';
import Terminal from '../components/Terminal';
import Contact from '../components/Contact';
import Achievements from '../components/Achievements';

const Home = () => {
  return (
    <div className="flex flex-col gap-10 pb-32 w-full">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <GithubSection />
      <Terminal />
      <Contact />
    </div>
  );
};

export default Home;
