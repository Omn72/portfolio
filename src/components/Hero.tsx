
import React, { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';

const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;
    
    const text = textElement.innerText;
    textElement.innerHTML = '';
    
    let charIndex = 0;
    const typeWriter = () => {
      if (charIndex < text.length) {
        textElement.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
      } else {
        textElement.classList.add('after:content-["_"]', 'after:animate-pulse', 'after:ml-1');
      }
    };
    
    setTimeout(typeWriter, 500);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated gradient circles in background */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-space-200/30 backdrop-blur-sm border border-space-400/30">
            <span className="text-xs font-medium text-space-700">Software Engineer & Developer</span>
          </div>
          
          <h1 ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Exploring the Digital Universe Through Code
          </h1>
          
          <p className="text-lg md:text-xl text-space-700 mb-10 max-w-2xl mx-auto">
            Building elegant solutions to complex problems with clean, efficient code. 
            Navigating the cosmos of modern web development.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-medium 
              hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore My Work
            </a>
            <a 
              href="#contact"
              className="px-8 py-3 bg-space-300/30 backdrop-blur-sm border border-space-400/30 rounded-full 
              text-white font-medium hover:bg-space-300/50 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-space-700 hover:text-neon-blue transition-colors duration-300">
            <ArrowDownCircle size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
