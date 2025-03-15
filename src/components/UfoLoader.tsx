
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface UfoLoaderProps {
  className?: string;
  isLoading?: boolean;
}

const UfoLoader: React.FC<UfoLoaderProps> = ({ 
  className, 
  isLoading = true 
}) => {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      // Add a slight delay before unmounting to allow for exit animation
      const timer = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className={cn(
      "fixed inset-0 flex items-center justify-center z-50 bg-space backdrop-blur-sm transition-opacity duration-1000",
      isLoading ? "opacity-100" : "opacity-0",
      className
    )}>
      <div className="relative flex flex-col items-center">
        {/* UFO */}
        <div className="animate-ufoFloat">
          <div className="w-28 h-12 bg-gradient-to-r from-space-300 to-space-400 rounded-full relative overflow-hidden">
            {/* UFO Dome */}
            <div className="absolute w-16 h-16 bg-gradient-to-b from-neon-blue/80 to-space-300/50 rounded-full -top-10 left-1/2 transform -translate-x-1/2">
              <div className="absolute inset-1 rounded-full bg-gradient-to-b from-space-300/90 to-space-200/20 backdrop-blur-sm"></div>
            </div>
            
            {/* UFO Bottom Lights */}
            <div className="absolute bottom-2 left-0 w-full flex justify-around px-3">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse-slow"></div>
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse-slow" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse-slow" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse-slow" style={{ animationDelay: '0.9s' }}></div>
            </div>
          </div>
        </div>
        
        {/* UFO Beam */}
        <div className="w-16 h-20 bg-gradient-to-b from-neon-blue/50 to-transparent mt-1 rounded-b-full animate-ufoBeam"></div>
        
        {/* Loading Text */}
        <p className="mt-8 font-orbitron text-neon-blue animate-pulse-slow tracking-widest">INITIALIZING</p>
      </div>
    </div>
  );
};

export default UfoLoader;
