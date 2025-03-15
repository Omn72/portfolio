
import React, { useEffect, useState } from 'react';

const UfoCursor = () => {
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
      {/* UFO Cursor */}
      <div className="relative">
        {/* UFO Body */}
        <div className="w-8 h-3 bg-neon-blue/80 rounded-full backdrop-blur-sm border border-white/20 shadow-neon-blue"></div>
        {/* UFO Cabin */}
        <div className="absolute w-4 h-4 bg-space-200/80 rounded-full -top-2 left-1/2 transform -translate-x-1/2 border border-neon-blue/50"></div>
        {/* UFO Beam (only visible when not moving) */}
        <div className="absolute w-2 h-8 bg-neon-blue/20 rounded-full top-3 left-1/2 transform -translate-x-1/2 animate-ufoBeam"></div>
      </div>
    </div>
  );
};

export default UfoCursor;
