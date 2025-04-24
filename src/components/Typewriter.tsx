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

  // Calculate a variable delay to make typing feel more natural
  const getVariableDelay = () => {
    // Add randomness to the typing speed
    const randomFactor = Math.random() * 0.5 + 0.75; // Between 0.75 and 1.25
    
    // Slow down at punctuation for a more natural feel
    const currentChar = text[currentIndex];
    if (['.', ',', '?', '!', ';', ':'].includes(currentChar)) {
      return delay * 4 * randomFactor;
    }
    
    // Slight pause at spaces
    if (currentChar === ' ') {
      return delay * 1.5 * randomFactor;
    }
    
    return delay * randomFactor;
  };

  // Typing effect
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, getVariableDelay());
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  // Blinking quill-like cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursor(prev => !prev);
    }, 600); // Slower blinking for a more elegant feel
    
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="typewriter">
      {currentText}
      {currentIndex < text.length && cursor && (
        <span className="cursor" style={{ 
          display: 'inline-block',
          width: '8px',
          height: '18px',
          backgroundColor: 'var(--accent-color)',
          verticalAlign: 'middle',
          marginLeft: '2px',
          boxShadow: '0 0 5px rgba(184, 134, 11, 0.3)',
          borderRadius: '1px'
        }}>
        </span>
      )}
    </span>
  );
};

export default Typewriter;