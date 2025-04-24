// File: src/components/AccessDenied.tsx
import React, { useState, useEffect } from 'react';
import './AccessDenied.css';

interface AccessDeniedProps {
  visible: boolean;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ visible }) => {
  const [flashActive, setFlashActive] = useState<boolean>(true);
  
  // Create subtle flashing effect
  useEffect(() => {
    if (!visible) return;
    
    const interval = setInterval(() => {
      setFlashActive(prev => !prev);
    }, 600); // Slower, more subtle flash
    
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;
  
  return (
    <div className={`access-denied ${flashActive ? 'flash' : ''}`}>
      <div className="access-denied-warning">
        <div className="warning-icon">⚠</div>
        <div className="warning-text">ACCESS DENIED</div>
        <div className="warning-details">
          Your identity as cannot be confirmed.
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