
import React, { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  
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
        setTimeout(typeWriter, isMobile ? 40 : 80); // Faster typing on mobile
      } else {
        textElement.classList.add('after:content-["_"]', 'after:animate-pulse', 'after:ml-1');
      }
    };
    
    setTimeout(typeWriter, 500);
  }, [isMobile]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 overflow-hidden">
      {/* Animated gradient circles in background */}
      <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-64 sm:w-96 h-64 sm:h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-64 sm:w-96 h-64 sm:h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-space-200/30 backdrop-blur-sm border border-space-400/30">
            <span className="text-xs font-medium text-space-700">Software Engineer & Developer</span>
          </div>
          
          <h1 ref={textRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
            Hello, I am Om Narkhede.
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-space-700 mb-8 sm:mb-10 max-w-2xl mx-auto">
          First-Year Computer Science and Engineering Student from BVCOEL.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="#projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-medium 
              hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              Explore My Work
            </a>
            <a 
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-space-300/30 backdrop-blur-sm border border-space-400/30 rounded-full 
              text-white font-medium hover:bg-space-300/50 transition-all duration-300 text-center"
            >
              Contact Me
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-space-700 hover:text-neon-blue transition-colors duration-300">
            <ArrowDownCircle size={28} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
