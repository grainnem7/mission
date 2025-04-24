// File: src/components/SecretContent.tsx
import React, { useState, useEffect, useRef } from 'react';
import './SecretContent.css';

const SecretContent: React.FC = () => {
  const [decrypted, setDecrypted] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const kestrelMessage = `Special Agent Honey Bear,

I know this message breaks the protocol you set — but I believe the situation calls for urgent interception.

You've set new coordinates for a southern rendezvous six months and one week from the day we first crossed paths. But recall - we are already to be deployed on a critical operation that very day. A high-priority assignment. Northbound. 

I believe this detail may have slipped through your otherwise impeccable intelligence.

Concerning Operation Rendezvous, I suggest immediate recalibration of one or both flight plans to avoid catastrophic overlap.

Awaiting further communication on this matter urgently.

Yours in trust,
Agent Kestrel
24th April 2025`;
  
  useEffect(() => {
    // Simulate document examination process
    const timer = setTimeout(() => {
      setDecrypted(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Balanced typewriter effect for Kestrel's message
  useEffect(() => {
    if (decrypted && typedText.length < kestrelMessage.length) {
      const delay = getTypeDelay(kestrelMessage[typedText.length]);
      
      const timeout = setTimeout(() => {
        setTypedText(kestrelMessage.substring(0, typedText.length + 1));
        setCursorPosition(typedText.length + 1);
        
        // If we're at a newline, scroll to the bottom to keep up with typing
        if (kestrelMessage[typedText.length] === '\n' && containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [decrypted, typedText]);
  
  // Function to determine typing delay based on character (balanced speed)
  const getTypeDelay = (char: string): number => {
    // More moderate pauses for punctuation
    if (['.', ',', '?', '!', ';', ':'].includes(char)) return 80 + Math.random() * 30;
    // Brief pause at spaces
    if (char === ' ') return 40 + Math.random() * 20;
    // Moderate pause at paragraph breaks
    if (char === '\n') return 250 + Math.random() * 100;
    // Medium typing speed with slight randomness
    return 50 + Math.random() * 30; // Medium pace
  };
  
  // Split text into lines for proper display
  const textLines = typedText.split('\n');
  
  return (
    <div className="secret-content">
      {!decrypted ? (
        <div className="decrypting">
          <div className="decryption-progress">
            <div className="decrypt-animation">
              <div className="typewriter-carriage"></div>
            </div>
            <p className="decrypt-text">DECRYPTING COMMUNIQUÉ...</p>
          </div>
        </div>
      ) : (
        <div className="message-content" ref={containerRef}>
          <div className="typewriter-paper">
            {textLines.map((line, index) => (
              <div key={`line-${index}`} className="typewriter-line">
                {line || ' '}
                {index === textLines.length - 1 && cursorPosition === typedText.length && (
                  <span className="typewriter-cursor">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretContent;