
import React, { useState } from 'react';
import { ExternalLink, Github, MousePointer } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const isMobile = useIsMobile();
  
  const projects = [
    {
      title: "DoubtBot AI ",
      description: "A real-time Chatbot AI",
      tech: ["React", "TypeScript", "Node.js", "Express", " Gemini API"],
      image: "/p1.png",
      link: "https://doubtbot.netlify.app/",
      github: "https://github.com/omn7/chat-ai/tree/main",
      color: "from-neon-blue to-neon-purple"
    },
    {
      title: "Crypto Price Tracker",
      description: "A real-time cryptocurrency price tracker built using React.js and the CoinGecko API. This project allows users to track live prices, market trends, and currency conversions in an intuitive UI.",
      tech: ["React.js", "Javascript", "Express", "Node", "CoinGecko API"],
      image: "/p2.png",
      link: "https://findmycrypto.netlify.app/",
      github: "https://github.com/omn7/Crypto-Price-Tracking-App-",
      color: "from-neon-green to-neon-blue"
    },
    {
      title: "Netflix clone",
      description: "First Clone Project.",
      tech: ["HTML", "CSS", "Javascript"],
      image: "/p3.png",
      link: "https://omn7.github.io/netflix-clone/",
      github: "https://github.com/omn7/netflix-clone",
      color: "from-neon-purple to-neon-pink"
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-16 text-center">
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-space-200/30 backdrop-blur-sm border border-space-400/30">
              <span className="text-xs font-medium text-space-700">Projects</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              My <span className="text-gradient-blue">Cosmic</span> Creations
            </h2>
            <p className="text-base sm:text-lg text-space-700 max-w-3xl mx-auto">
              Explore some of my featured projects, spanning from interactive web applications to complex system architectures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:gap-10">
            {/* For Mobile: Show project cards in a vertical layout */}
            {isMobile && projects.map((project, index) => (
              <div 
                key={index}
                className="glass-panel rounded-2xl overflow-hidden relative group"
              >
                <div className="relative h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-coverbg-white/30 backdrop-blur-sm transition-transform duration-700 ease-in-out group-hover:scale-110 "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space to-transparent opacity-90"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-orbitron text-xl mb-2">{project.title}</h3>
                  <p className="text-space-700 mb-4 text-sm">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs rounded-full bg-space-300/50 text-space-900"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={project.link} 
                      className="px-3 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-xs text-white font-medium 
                      hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 flex items-center gap-1"
                    >
                      <ExternalLink size={14} />
                      View
                    </a>
                    <a 
                      href={project.github} 
                      className="px-3 py-2 bg-space-300/30 backdrop-blur-sm border border-space-400/30 rounded-full 
                      text-xs text-white font-medium hover:bg-space-300/50 transition-all duration-300 flex items-center gap-1"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
            
            {/* For Desktop: Show the interactive project gallery */}
            {!isMobile && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="glass-panel rounded-2xl overflow-hidden h-[500px] relative group">
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={projects[activeProject].image} 
                      alt={projects[activeProject].title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space to-transparent opacity-90"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    <h3 className="font-orbitron text-2xl mb-3">{projects[activeProject].title}</h3>
                    <p className="text-space-700 mb-4">{projects[activeProject].description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {projects[activeProject].tech.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-space-300/50 text-space-900"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <a 
                        href={projects[activeProject].link} 
                        className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-sm text-white font-medium 
                        hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        View Project
                      </a>
                      <a 
                        href={projects[activeProject].github} 
                        className="px-4 py-2 bg-space-300/30 backdrop-blur-sm border border-space-400/30 rounded-full 
                        text-sm text-white font-medium hover:bg-space-300/50 transition-all duration-300 flex items-center gap-2"
                      >
                        <Github size={16} />
                        Source Code
                      </a>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-space-200/30 backdrop-blur-sm border border-space-400/30 rounded-full px-3 py-1 flex items-center gap-2">
                    <MousePointer size={14} className="text-neon-blue animate-pulse" />
                    <span className="text-xs text-space-700">Hover to zoom</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-6">
                  {projects.map((project, index) => (
                    <div 
                      key={index}
                      className={`glass-panel rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                        activeProject === index 
                          ? 'border border-neon-blue/50 shadow-neon-blue/20' 
                          : 'hover:-translate-y-1'
                      }`}
                      onClick={() => setActiveProject(index)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 overflow-hidden rounded-xl`}>
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-orbitron">{project.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tech.slice(0, 3).map((tech, i) => (
                              <span 
                                key={i}
                                className="px-2 py-1 text-xs rounded-full bg-space-300/50 text-space-900"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="px-2 py-1 text-xs rounded-full bg-space-300/50 text-space-900">
                                +{project.tech.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        <div 
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color} ${
                            activeProject === index ? 'animate-pulse' : 'opacity-50'
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="glass-panel rounded-2xl p-8 mt-auto">
                    <h3 className="font-orbitron text-xl mb-4">Want to see more?</h3>
                    <p className="text-space-700 mb-4">
                      Check out my GitHub repository for additional projects and contributions to open source.
                    </p>
                    <a 
                      href="https://github.com/omn7" 
                      className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors duration-300"
                    >
                      <Github size={18} />
                      View GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
