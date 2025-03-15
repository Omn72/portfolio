
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import UfoLoader from './UfoLoader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Handle custom cursor movement
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (!showCursor) setShowCursor(true);
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showCursor]);

  return (
    <>
      <UfoLoader isLoading={loading} />
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Background stars */}
        <div className="space-stars"></div>
        
        {/* Custom cursor effect */}
        {showCursor && (
          <div 
            className="cursor-glow" 
            style={{ 
              left: `${cursorPosition.x}px`, 
              top: `${cursorPosition.y}px` 
            }}
          />
        )}
        
        <NavBar />
        
        <main className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </main>
        
        <footer className="py-8 text-center text-space-700 text-sm">
          <div className="container">
            <p>© {new Date().getFullYear()} Cosmic Dev. All rights reserved.</p>
            <p className="mt-2 text-space-600 text-xs">
              Designed with precision in the digital cosmos.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
