// File: src/components/BootSequence.tsx
import React, { useState, useEffect } from 'react';
import './BootSequence.css';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
  const [showContinue, setShowContinue] = useState<boolean>(false);
  
  const initialBootMessages = [
    "INITIALIZING SYSTEM...",
    "LOADING PRIMARY PROTOCOLS...",
    "ACCESSING SECURITY DIRECTORY...",
    "CONNECTING TO COMMAND CENTER...",
    "PREPARING INTERFACE...",
  ];
  
  // Display initial boot messages automatically
  useEffect(() => {
    let counter = 0;
    let timeouts: NodeJS.Timeout[] = [];
    
    const addMessage = () => {
      if (counter < initialBootMessages.length) {
        const newMessage = initialBootMessages[counter];
        setBootLines(prev => [...prev, newMessage]);
        
        // Update progress
        const progress = Math.round((counter + 1) / (initialBootMessages.length + 1) * 75); // Only go to 75%
        setLoadingProgress(progress);
        
        counter++;
        const timeout = setTimeout(addMessage, 1500); // Slower timing
        timeouts.push(timeout);
      } else {
        // Initial loading complete
        setInitialLoadComplete(true);
        setShowContinue(true);
      }
    };
    
    // Start the sequence
    addMessage();
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
  
  const handleProceed = () => {
    console.log("Proceed button clicked"); // Debug log
    setShowContinue(false);
    
    // Add the final message
    setBootLines(prev => [...prev, "ACTIVATING SECURITY PROTOCOLS..."]);
    setLoadingProgress(90);
    
    // Show final message after delay
    setTimeout(() => {
      setBootLines(prev => [...prev, "SYSTEM READY: AGENT HB ACCESS POINT"]);
      setLoadingProgress(100);
      
      // Complete the boot sequence
      setTimeout(() => {
        console.log("Boot sequence complete, calling onComplete()"); // Debug log
        onComplete();
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="boot-sequence">
      <div className="boot-header">
        <div className="agency-logo">
          <span>MISSION ID: 78275464</span>
          <span>TOP SECRET</span>
        </div>
        <h2>OPERATION RENDEZVOUS</h2>
      </div>
      
      <div className="boot-console">
        {bootLines.map((line, index) => (
          <div key={`boot-line-${index}`} className="boot-line">
            <span className="timestamp">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
            <span className="message">{line}</span>
          </div>
        ))}
        
        {showContinue && initialLoadComplete && (
          <div className="continue-button-container">
            <button 
              className="continue-button" 
              onClick={handleProceed}
              type="button"
            >
              PROCEED [DANGER LEVEL: HIGH]
            </button>
          </div>
        )}
      </div>
      
      <div className="boot-progress-container">
        <div 
          className="boot-progress-bar" 
          style={{ width: `${loadingProgress}%` }}
        ></div>
        <div className="boot-progress-text">
          SECURITY SYSTEM: {loadingProgress}%
        </div>
      </div>
    </div>
  );
};

export default BootSequence;