
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Change document title for 404 page
    document.title = "Page Not Found | CosmicDev";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-space flex flex-col items-center justify-center p-4">
      {/* Background stars */}
      <div className="space-stars"></div>
      
      <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center glass-panel">
            <AlertTriangle size={40} className="text-neon-pink" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 text-gradient-blue">404</h1>
        <p className="text-xl text-space-700 mb-8">
          It seems you've ventured into unexplored space. This page doesn't exist in our universe.
        </p>
        
        <Link 
          to="/" 
          className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-medium 
          hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 inline-flex items-center gap-2"
        >
          <Home size={18} />
          Return to Base
        </Link>
      </div>
      
      <div className="mt-8 text-space-700 text-sm">
        <p>Coordinates: {location.pathname}</p>
      </div>
    </div>
  );
};

export default NotFound;
