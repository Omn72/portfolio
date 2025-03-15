import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const NavBar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const navItems = [
    { id: 'home', label: 'Home', link: '/' },
    { id: 'about', label: 'About', link: '#about' },
    { id: 'hackathon', label: 'Hackathon', link: '/hackathon' }, 
    { id: 'learn', label: 'Learn', link: '/learn' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems
        .filter(item => item.link.startsWith('#'))
        .map(item => document.getElementById(item.id));
        
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (item) => {
    if (item.link.startsWith('#')) {
      setActiveSection(item.id);
    }
    setIsMenuOpen(false); 
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
      isScrolled ? "bg-space-100/30 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <span className="font-orbitron text-white text-2xl font-bold">👨🏼‍🚀</span>
          </div>
          <span className="font-orbitron text-xl text-white">
            Om<span className="text-gradient-blue">N</span>
          </span>
        </div>
        
        {isMobile ? (
          <>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-space-100/95 backdrop-blur-md z-30 flex flex-col items-center pt-10">
                <nav>
                  <ul className="flex flex-col space-y-6">
                    {navItems.map(item => (
                      <li key={item.id} className="text-center">
                        <a
                          href={item.link}
                          onClick={() => handleNavClick(item)}
                          className={cn(
                            "px-3 py-2 text-lg font-medium relative transition-colors duration-300",
                            activeSection === item.id 
                              ? "text-neon-blue" 
                              : "text-space-700 hover:text-white"
                          )}
                          target={item.link.startsWith('/') ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                        >
                          {item.label}
                          {activeSection === item.id && item.link.startsWith('#') && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-blue rounded-full animate-pulse-slow" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav>
            <ul className="flex space-x-2 md:space-x-8">
              {navItems.map(item => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className={cn(
                      "px-3 py-2 text-sm md:text-base font-medium relative transition-colors duration-300",
                      activeSection === item.id && item.link.startsWith('#')
                        ? "text-neon-blue" 
                        : "text-space-700 hover:text-white"
                    )}
                    target={item.link.startsWith('/') ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                  >
                    {item.label}
                    {activeSection === item.id && item.link.startsWith('#') && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-neon-blue rounded-full animate-pulse-slow" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;
