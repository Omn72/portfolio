
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import UfoLoader from './UfoLoader';
import RocketCursor from './RocketCursor';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

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
      
      {/* Show rocket cursor only on desktop */}
      {!isMobile && <RocketCursor />}
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Background stars */}
        <div className="space-stars"></div>
        
        <NavBar />
        
        <main className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </main>
        
        <footer className="py-8 text-center text-space-700 text-sm">
          <div className="container">
            <p>© {new Date().getFullYear()} Om Narkhede. All rights reserved.</p>
            <p className="mt-2 text-space-600 text-xs">
              Designed By Om Narkhede ❤️
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
