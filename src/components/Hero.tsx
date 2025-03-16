import React, { useEffect, useRef } from 'react';
import { ArrowDownCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  
  // Star configuration
  const stars = Array.from({ length: isMobile ? 40 : 80 });
  const comments = [
    "// Hello World!",
    "/* Full Stack Developer */",
    "<!DOCTYPE html>",
    "function createMagic() {}",
    "# Let's build something",
    "const passion = true;",
    "while(!succeed) { try() }",
    "/* Innovation */"
  ];

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
        setTimeout(typeWriter, isMobile ? 40 : 80);
      } else {
        textElement.classList.add('after:content-["_"]', 'after:animate-pulse', 'after:ml-1');
      }
    };
    
    setTimeout(typeWriter, 500);
  }, [isMobile]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 overflow-hidden">
      {/* Global animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(3deg); opacity: 0.3; }
          100% { transform: translateY(-40px) rotate(-3deg); opacity: 0; }
        }
        @keyframes bounce-mobile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-twinkle { animation: twinkle 2s infinite; }
        .animate-float { animation: float 12s linear infinite; }
        .animate-bounce-mobile { animation: bounce-mobile 2s infinite; }
      `}</style>

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {stars.map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Floating Comments */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {comments.map((comment, i) => (
          <div
            key={`comment-${i}`}
            className="absolute text-xs sm:text-sm opacity-20 text-space-500 font-mono animate-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 15 - 7.5}deg`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 15}s`
            }}
          >
            {comment}
          </div>
        ))}
      </div>

      {/* Gradient circles */}
      <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-64 sm:w-96 h-64 sm:h-96 bg-neon-purple/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-64 sm:w-96 h-64 sm:h-96 bg-neon-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      
      {/* Main content */}
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
        
        {/* Improved arrow with mobile fixes */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2">
          <a 
            href="#about" 
            className="inline-block text-space-700 hover:text-neon-blue transition-colors duration-300"
            role="button"
            aria-label="Scroll down"
          >
            <ArrowDownCircle 
              size={isMobile ? 32 : 28} 
              className="animate-bounce-mobile sm:animate-bounce"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;