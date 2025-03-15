
import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

// Rename the component to RocketCursor
const RocketCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Rocket Cursor with glow effect */}
      <div className="relative">
        <Rocket 
          size={28} 
          className="text-neon-blue rotate-45 animate-rocketFloat" 
          strokeWidth={1.5}
        />
        {/* Rocket Flame/Trail */}
        <div className="absolute w-2 h-10 bg-gradient-to-t from-neon-blue via-orange-500 to-transparent rounded-full 
                      -bottom-8 left-1/2 transform -translate-x-1/2 rotate-45 animate-rocketFlame opacity-70"></div>
      </div>
    </div>
  );
};

export default RocketCursor;
