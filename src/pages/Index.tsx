
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Index = () => {
  useEffect(() => {
    // Change document title
    document.title = "CosmicDev | Space-Themed Portfolio";
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </Layout>
  );
};

export default Index;
