
/**
 * Utility functions for animations
 */

/**
 * Creates a staggered delay animation for multiple elements
 * @param index Element index in the list
 * @param baseDelay Base delay in ms
 * @returns Calculated delay in seconds
 */
export const staggeredDelay = (index: number, baseDelay: number = 100): string => {
  return `${(index * baseDelay) / 1000}s`;
};

/**
 * Generates random star positions for space background
 * @param count Number of stars to generate
 * @returns Array of star position objects
 */
export const generateStars = (count: number = 100): Array<{x: number, y: number, size: number, opacity: number}> => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
  }));
};

/**
 * Calculates a random duration within a range
 * @param min Minimum duration in seconds
 * @param max Maximum duration in seconds
 * @returns Random duration in seconds with 's' suffix
 */
export const randomDuration = (min: number = 20, max: number = 40): string => {
  return `${min + Math.random() * (max - min)}s`;
};

/**
 * Creates a typewriter effect on text
 * @param element DOM element to apply effect to
 * @param text Text to type
 * @param speed Typing speed in ms
 */
export const typewriterEffect = (element: HTMLElement | null, text: string, speed: number = 80): void => {
  if (!element) return;
  
  element.innerHTML = '';
  let i = 0;
  
  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.add('after:content-["_"]', 'after:animate-pulse', 'after:ml-1');
    }
  };
  
  setTimeout(type, 500);
};
