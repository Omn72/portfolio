
import React from 'react';
import { Code, Cpu, Globe, Rocket, Server, Layers } from 'lucide-react';

const About = () => {
  const skills = [
    { 
      name: 'Frontend Development', 
      icon: <Code className="w-6 h-6 text-neon-blue" />,
      description: 'Creating beautiful, responsive interfaces with React, TypeScript, and modern CSS.'
    },
    { 
      name: 'Backend Architecture', 
      icon: <Server className="w-6 h-6 text-neon-blue" />,
      description: 'Building robust APIs and services with Node.js, Python, and cloud infrastructure.'
    },
    { 
      name: 'Systems Engineering', 
      icon: <Cpu className="w-6 h-6 text-neon-blue" />,
      description: 'Deep understanding of computer systems, networks, and distributed architectures.'
    },
    { 
      name: 'Web Technologies', 
      icon: <Globe className="w-6 h-6 text-neon-blue" />,
      description: 'Expert in modern web standards, performance optimization, and security practices.'
    },
    { 
      name: 'DevOps & CI/CD', 
      icon: <Rocket className="w-6 h-6 text-neon-blue" />,
      description: 'Automating deployment pipelines and infrastructure using modern DevOps practices.'
    },
    { 
      name: 'Software Architecture', 
      icon: <Layers className="w-6 h-6 text-neon-blue" />,
      description: 'Designing scalable, maintainable software systems with clean architecture patterns.'
    }
  ];

  return (
    <section id="about" className="py-20 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-space-200/30 backdrop-blur-sm border border-space-400/30">
              <span className="text-xs font-medium text-space-700">About Me</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient-blue">Navigating</span> the Digital Frontier
            </h2>
            <p className="text-lg text-space-700 max-w-3xl mx-auto">
              With a passion for elegant code and innovative solutions, I've spent years exploring the boundaries of what's possible in software development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <div className="glass-panel rounded-2xl p-8 hover:shadow-neon-blue/10 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="font-orbitron text-xl mb-4">My Journey</h3>
              <p className="text-space-700 mb-4">
                I began my programming odyssey over a decade ago, fascinated by the potential of technology to solve real-world problems. Since then, I've evolved from writing simple scripts to architecting complex distributed systems.
              </p>
              <p className="text-space-700">
                My approach combines technical excellence with a deep understanding of user needs. I believe that the best software isn't just functional—it's intuitive, elegant, and delightful to use.
              </p>
            </div>
            
            <div className="glass-panel rounded-2xl p-8 hover:shadow-neon-purple/10 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="font-orbitron text-xl mb-4">Philosophy</h3>
              <p className="text-space-700 mb-4">
                I believe in minimalist design that strips away unnecessary complexity, leaving only what's essential. Every line of code should serve a purpose, every feature should add real value.
              </p>
              <p className="text-space-700">
                My work is guided by principles of maintainability, scalability, and user-centered design. I'm constantly learning and adapting to new technologies while maintaining a focus on fundamentals.
              </p>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-10">Technical Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="glass-panel rounded-xl p-6 hover:shadow-neon-blue/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center glass-panel">
                      {skill.icon}
                    </div>
                  </div>
                  <h4 className="font-orbitron text-lg mb-2">{skill.name}</h4>
                  <p className="text-space-700 text-sm">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
