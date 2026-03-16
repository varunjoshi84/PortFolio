import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import GithubSection from '../components/GithubSection';
import Terminal from '../components/Terminal';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="flex flex-col gap-10 pb-32 w-full">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GithubSection />
      <Terminal />
      <Contact />
    </div>
  );
};

export default Home;
