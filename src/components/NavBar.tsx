
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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar transparency
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
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

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
      isScrolled ? "bg-space-100/30 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="font-orbitron text-white text-sm font-bold">CD</span>
          </div>
          <span className="font-orbitron text-xl text-white">Cosmic<span className="text-gradient-blue">Dev</span></span>
        </div>
        
        {isMobile ? (
          <>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="fixed inset-0 top-16 bg-space-100/95 backdrop-blur-md z-30 flex flex-col items-center pt-10">
                <nav>
                  <ul className="flex flex-col space-y-6">
                    {navItems.map(item => (
                      <li key={item.id} className="text-center">
                        <a
                          href={`#${item.id}`}
                          onClick={() => handleNavClick(item.id)}
                          className={cn(
                            "px-3 py-2 text-lg font-medium relative transition-colors duration-300",
                            activeSection === item.id 
                              ? "text-neon-blue" 
                              : "text-space-700 hover:text-white"
                          )}
                        >
                          {item.label}
                          {activeSection === item.id && (
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
                    href={`#${item.id}`}
                    className={cn(
                      "px-3 py-2 text-sm md:text-base font-medium relative transition-colors duration-300",
                      activeSection === item.id 
                        ? "text-neon-blue" 
                        : "text-space-700 hover:text-white"
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && (
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
