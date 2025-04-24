// File: src/components/AccessDenied.tsx
import React, { useState, useEffect } from 'react';
import './AccessDenied.css';

interface AccessDeniedProps {
  visible: boolean;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ visible }) => {
  const [flashActive, setFlashActive] = useState<boolean>(true);
  const [glitchText, setGlitchText] = useState<boolean>(false);
  
  // Create subtle flashing effect
  useEffect(() => {
    if (!visible) return;
    
    const flashInterval = setInterval(() => {
      setFlashActive(prev => !prev);
    }, 600); // Slower, more subtle flash
    
    // Add occasional text glitching for more terminal effect
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 3000);
    
    return () => {
      clearInterval(flashInterval);
      clearInterval(glitchInterval);
    };
  }, [visible]);

  if (!visible) return null;
  
  return (
    <div className={`access-denied ${flashActive ? 'flash' : ''}`}>
      <div className="access-denied-warning">
        <div className="warning-icon">⚠</div>
        <div className={`warning-text ${glitchText ? 'glitch-text' : ''}`}>
          ACCESS DENIED
        </div>
        <div className="warning-details">
          Your identity as Agent Honey Bear cannot be confirmed.
          <br />
          Operation compromised.
          <br />
          System lockdown initiated.
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;