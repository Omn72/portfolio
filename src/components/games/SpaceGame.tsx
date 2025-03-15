
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Zap, RotateCcw, Award, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useIsMobile } from '@/hooks/use-mobile';

interface SpaceObject {
  id: number;
  x: number;
  y: number;
  type: 'asteroid' | 'star' | 'planet';
  size: number;
  speed: number;
  color: string;
  points: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: React.ReactNode;
}

const SpaceGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0 });
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [shields, setShields] = useState(3);
  const [powerUpActive, setPowerUpActive] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { 
      id: 'first-50', 
      name: 'Space Cadet', 
      description: 'Score 50 points', 
      unlocked: false,
      icon: <Star className="h-5 w-5 text-yellow-400" />
    },
    { 
      id: 'first-100', 
      name: 'Space Explorer', 
      description: 'Score 100 points', 
      unlocked: false,
      icon: <Award className="h-5 w-5 text-purple-400" />
    },
    { 
      id: 'first-200', 
      name: 'Space Commander', 
      description: 'Score 200 points', 
      unlocked: false,
      icon: <Award className="h-5 w-5 text-blue-400" />
    },
  ]);
  
  const { toast } = useToast();
  const animationRef = useRef<number>(0);
  const lastTimestampRef = useRef<number>(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('spaceGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    // Load achievements
    const savedAchievements = localStorage.getItem('spaceGameAchievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);
  
  useEffect(() => {
    // Save high score to localStorage when it changes
    if (highScore > 0) {
      localStorage.setItem('spaceGameHighScore', highScore.toString());
    }
  }, [highScore]);
  
  useEffect(() => {
    // Save achievements to localStorage when they change
    localStorage.setItem('spaceGameAchievements', JSON.stringify(achievements));
  }, [achievements]);
  
  const checkAchievements = (currentScore: number) => {
    const newAchievements = [...achievements];
    let achievementUnlocked = false;
    
    if (currentScore >= 50 && !newAchievements[0].unlocked) {
      newAchievements[0].unlocked = true;
      achievementUnlocked = true;
    }
    
    if (currentScore >= 100 && !newAchievements[1].unlocked) {
      newAchievements[1].unlocked = true;
      achievementUnlocked = true;
    }
    
    if (currentScore >= 200 && !newAchievements[2].unlocked) {
      newAchievements[2].unlocked = true;
      achievementUnlocked = true;
    }
    
    if (achievementUnlocked) {
      setAchievements(newAchievements);
      const unlockedAchievement = newAchievements.find(a => a.unlocked && !achievements.find(oldA => oldA.id === a.id && oldA.unlocked));
      if (unlockedAchievement) {
        toast({
          title: "Achievement Unlocked!",
          description: `${unlockedAchievement.name}: ${unlockedAchievement.description}`,
          duration: 3000,
        });
      }
    }
  };
  
  const startGame = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Initialize ship position at the bottom center
      setShipPosition({
        x: canvas.width / 2,
        y: canvas.height - 50
      });
      
      setGameStarted(true);
      setScore(0);
      setShields(3);
      setPowerUpActive(false);
      setSpaceObjects([]);
      lastTimestampRef.current = 0;
      
      // Start the game loop
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  };
  
  const endGame = () => {
    cancelAnimationFrame(animationRef.current);
    setGameStarted(false);
    
    if (score > highScore) {
      setHighScore(score);
      toast({
        title: "New High Score!",
        description: `You've set a new record: ${score} points!`,
        duration: 3000,
      });
    }
  };
  
  const generateSpaceObject = (canvas: HTMLCanvasElement): SpaceObject => {
    const types: ('asteroid' | 'star' | 'planet')[] = ['asteroid', 'asteroid', 'asteroid', 'star', 'planet'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let size, speed, color, points;
    
    switch (type) {
      case 'star':
        size = Math.random() * 10 + 5;
        speed = (Math.random() * 100 + 50) * getDifficultyMultiplier();
        color = '#ffff00';
        points = 15;
        break;
      case 'planet':
        size = Math.random() * 20 + 15;
        speed = (Math.random() * 50 + 30) * getDifficultyMultiplier();
        color = '#3498db';
        points = 5;
        break;
      default: // asteroid
        size = Math.random() * 15 + 10;
        speed = (Math.random() * 80 + 40) * getDifficultyMultiplier();
        color = '#7f8c8d';
        points = 10;
    }
    
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * (canvas.width - size * 2) + size,
      y: -size,
      type,
      size,
      speed,
      color,
      points
    };
  };
  
  const getDifficultyMultiplier = () => {
    switch (difficulty) {
      case 'easy': return 0.8;
      case 'medium': return 1.2;
      case 'hard': return 1.6;
      default: return 1;
    }
  };
  
  const gameLoop = (timestamp: number) => {
    if (!canvasRef.current || !gameStarted) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Calculate delta time for smooth animation
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
    }
    const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = timestamp;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw starry background
    drawBackground(ctx, canvas);
    
    // Draw ship
    drawShip(ctx);
    
    // Randomly generate new space objects
    if (Math.random() < 0.03 * getDifficultyMultiplier()) {
      setSpaceObjects(prev => [...prev, generateSpaceObject(canvas)]);
    }
    
    // Update and draw space objects
    const updatedObjects: SpaceObject[] = [];
    let hitDetected = false;
    
    spaceObjects.forEach(obj => {
      // Update position
      const newY = obj.y + obj.speed * deltaTime;
      
      // Check if object is still on screen
      if (newY > canvas.height) {
        return; // Remove object
      }
      
      // Draw the object
      ctx.beginPath();
      ctx.fillStyle = obj.color;
      ctx.arc(obj.x, newY, obj.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Check collision with ship
      const distance = Math.sqrt(
        Math.pow(obj.x - shipPosition.x, 2) + 
        Math.pow(newY - shipPosition.y, 2)
      );
      
      if (distance < obj.size + 20) { // Ship radius is approximately 20
        // Collision detected
        if (powerUpActive) {
          // Destroy the object and add points
          setScore(prev => prev + obj.points * 2);
        } else {
          hitDetected = true;
          return; // Remove the object that hit the ship
        }
      }
      
      // Add the updated object to the new array
      updatedObjects.push({
        ...obj,
        y: newY
      });
    });
    
    // Handle collision
    if (hitDetected) {
      if (shields > 0) {
        setShields(prev => prev - 1);
        toast({
          title: "Shield Damaged!",
          description: `${shields - 1} shields remaining.`,
          duration: 1500,
        });
      } else {
        endGame();
        toast({
          title: "Game Over!",
          description: `Your score: ${score} points.`,
          duration: 3000,
        });
        return; // Stop the game loop
      }
    }
    
    setSpaceObjects(updatedObjects);
    
    // Increment score based on time survived
    setScore(prev => {
      const newScore = prev + Math.floor(deltaTime * 10 * getDifficultyMultiplier());
      checkAchievements(newScore);
      return newScore;
    });
    
    // Continue the game loop
    animationRef.current = requestAnimationFrame(gameLoop);
  };
  
  const drawBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  const drawShip = (ctx: CanvasRenderingContext2D) => {
    // Draw spaceship
    ctx.fillStyle = '#e74c3c';
    ctx.beginPath();
    ctx.moveTo(shipPosition.x, shipPosition.y - 20);
    ctx.lineTo(shipPosition.x - 15, shipPosition.y + 10);
    ctx.lineTo(shipPosition.x + 15, shipPosition.y + 10);
    ctx.closePath();
    ctx.fill();
    
    // Draw shield if active
    if (shields > 0) {
      ctx.strokeStyle = powerUpActive ? '#3498db' : 'rgba(52, 152, 219, 0.5)';
      ctx.lineWidth = powerUpActive ? 3 : 2;
      ctx.beginPath();
      ctx.arc(shipPosition.x, shipPosition.y, 25, 0, Math.PI * 2);
      ctx.stroke();
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!gameStarted || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    setShipPosition(prev => ({
      ...prev,
      x: Math.max(20, Math.min(canvas.width - 20, x))
    }));
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!gameStarted || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    
    setShipPosition(prev => ({
      ...prev,
      x: Math.max(20, Math.min(canvas.width - 20, x))
    }));
    
    // Prevent scrolling while playing the game
    e.preventDefault();
  };
  
  const activatePowerUp = () => {
    if (!gameStarted || powerUpActive) return;
    
    setPowerUpActive(true);
    toast({
      title: "Power Up Activated!",
      description: "Double points for 5 seconds!",
      duration: 2000,
    });
    
    setTimeout(() => {
      setPowerUpActive(false);
    }, 5000);
  };
  
  return (
    <div className="py-8 space-y-6 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white bg-clip-text">Space Explorer Game</h2>
        <p className="text-space-700 mb-6 text-center">Navigate through space, collect celestial objects, and avoid collisions!</p>
        
        <div className="bg-space-100/10 backdrop-blur-lg rounded-lg p-4 sm:p-6 border border-space-300/20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="flex space-x-4 items-center mb-4 md:mb-0">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-400 mr-1" />
                <span className="text-space-700">Shields: {shields}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-space-700">Score: {score}</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-purple-400 mr-1" />
                <span className="text-space-700">High: {highScore}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={activatePowerUp} 
                disabled={!gameStarted || powerUpActive}
                className={powerUpActive ? "bg-blue-500/20" : ""}
              >
                <Zap className={`h-4 w-4 mr-1 ${powerUpActive ? "text-blue-400" : "text-gray-400"}`} />
                Power Up
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={gameStarted ? endGame : startGame}
              >
                {gameStarted ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    End Game
                  </>
                ) : (
                  "Start Game"
                )}
              </Button>
            </div>
          </div>
          
          {!gameStarted && (
            <div className="mb-4">
              <p className="text-sm text-space-700 mb-2">Select difficulty:</p>
              <RadioGroup 
                value={difficulty} 
                onValueChange={(val) => setDifficulty(val as 'easy' | 'medium' | 'hard')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easy" id="easy" />
                  <label htmlFor="easy" className="text-sm">Easy</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <label htmlFor="medium" className="text-sm">Medium</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hard" id="hard" />
                  <label htmlFor="hard" className="text-sm">Hard</label>
                </div>
              </RadioGroup>
            </div>
          )}
          
          <div className="relative aspect-video bg-black rounded-md overflow-hidden">
            <canvas 
              ref={canvasRef} 
              className="w-full h-full cursor-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            />
            
            {!gameStarted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/70">
                <h3 className="text-xl font-bold mb-2">Space Explorer</h3>
                <p className="mb-4 text-center max-w-md px-4">
                  {isMobile 
                    ? "Drag your finger to move the spaceship. Collect stars and planets, avoid asteroids!" 
                    : "Move your mouse to control the spaceship. Collect stars and planets, avoid asteroids!"}
                </p>
                <Button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-neon-blue to-neon-purple"
                >
                  Start Game
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`flex items-center p-3 rounded-md border ${
                    achievement.unlocked 
                      ? "bg-space-200/20 border-space-300/40" 
                      : "bg-space-100/10 border-space-300/20 opacity-70"
                  }`}
                >
                  <div className="mr-3">
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{achievement.name}</div>
                    <div className="text-xs text-space-700">{achievement.description}</div>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="outline" className="ml-auto">Unlocked</Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">How to Play</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
            <div className="bg-space-100/10 backdrop-blur-sm p-4 rounded-lg border border-space-300/20">
              <h4 className="font-medium mb-2">Controls</h4>
              <p className="text-sm text-space-700">
                {isMobile 
                  ? "Touch and drag to move your spaceship left and right" 
                  : "Move your mouse to control your spaceship position"}
              </p>
            </div>
            <div className="bg-space-100/10 backdrop-blur-sm p-4 rounded-lg border border-space-300/20">
              <h4 className="font-medium mb-2">Objectives</h4>
              <p className="text-sm text-space-700">
                Collect stars (yellow) and planets (blue) to earn points. Avoid asteroids (gray) that will damage your shields.
              </p>
            </div>
            <div className="bg-space-100/10 backdrop-blur-sm p-4 rounded-lg border border-space-300/20">
              <h4 className="font-medium mb-2">Power-Ups</h4>
              <p className="text-sm text-space-700">
                Use the Power-Up button to activate double points for 5 seconds. Use it strategically!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceGame;
