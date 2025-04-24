// File: src/components/AccessDenied.tsx
import React, { useState, useEffect } from 'react';
import './AccessDenied.css';

interface AccessDeniedProps {
  visible: boolean;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ visible }) => {
  const [flashActive, setFlashActive] = useState<boolean>(true);
  
  // Create flashing effect
  useEffect(() => {
    if (!visible) return;
    
    const interval = setInterval(() => {
      setFlashActive(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;
  
  return (
    <div className={`access-denied ${flashActive ? 'flash' : ''}`}>
      <div className="access-denied-warning">
        <div className="warning-icon">⚠</div>
        <div className="warning-text">ACCESS DENIED</div>
        <div className="warning-details">
          UNAUTHORIZED ACCESS ATTEMPT DETECTED
          <br />
          SECURITY PROTOCOLS ENGAGED
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;