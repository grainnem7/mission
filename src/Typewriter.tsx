// File: src/components/Typewriter.tsx
import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay: number;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  delay,
  onComplete 
}) => {
  const [currentText, setCurrentText] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cursor, setCursor] = useState<boolean>(true);

  // Typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="typewriter">
      {currentText}
      {currentIndex < text.length && cursor && (
        <span className="cursor">▊</span>
      )}
    </span>
  );
};

export default Typewriter;