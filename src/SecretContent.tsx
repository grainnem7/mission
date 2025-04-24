// File: src/components/SecretContent.tsx
import React, { useState, useEffect } from 'react';
import Typewriter from './Typewriter';
import './SecretContent.css';

const SecretContent: React.FC = () => {
  const [decrypted, setDecrypted] = useState<boolean>(false);
  
  useEffect(() => {
    // Simulate decryption process
    const timer = setTimeout(() => {
      setDecrypted(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="secret-content">
      <div className="top-secret-banner">
        <div className="rotating-indicator"></div>
        <h1>TOP SECRET</h1>
        <div className="rotating-indicator"></div>
      </div>
      
      {!decrypted ? (
        <div className="decrypting">
          <div className="decryption-progress">
            <div className="decrypt-animation">
              <div className="decrypt-blocks">
                {Array(20).fill(0).map((_, i) => (
                  <div key={i} className="decrypt-block" style={{ 
                    animationDelay: `${i * 0.1}s` 
                  }}></div>
                ))}
              </div>
            </div>
            <p className="decrypt-text">DECRYPTING FILES...</p>
          </div>
        </div>
      ) : (
        <div className="classified-content">
          <div className="classified-header">
            <div className="classified-stamp">CLASSIFIED</div>
            <h2>OPERATION: SHADOW PROTOCOL</h2>
            <div className="classified-metadata">
              <div>FILE: XZ-7829-ALPHA</div>
              <div>CLEARANCE: LEVEL 5</div>
              <div>DATE: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
          
          <div className="document-content">
            <Typewriter 
              text="Congratulations, Agent. You have successfully accessed the classified terminal. This content can be customized with your actual secret information or next steps for your puzzle experience."
              delay={20}
            />
            
            <div className="classified-image">
              <div className="placeholder-image">
                [CLASSIFIED IMAGE]
              </div>
            </div>
            
            <div className="next-instructions">
              <h3>NEXT MISSION PARAMETERS:</h3>
              <p>This section can contain instructions for the next part of your puzzle or whatever content you'd like to reveal to users who solve the cipher/riddle.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecretContent;