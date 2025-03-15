
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import UfoLoader from './UfoLoader';
import UfoCursor from './UfoCursor';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <UfoLoader isLoading={loading} />
      
      {/* Add custom UFO cursor */}
      <UfoCursor />
      
      {/* Hide default cursor when our custom cursor is active */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, input, textarea, select, [role="button"] {
          cursor: none;
        }
      `}</style>
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Background stars */}
        <div className="space-stars"></div>
        
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
