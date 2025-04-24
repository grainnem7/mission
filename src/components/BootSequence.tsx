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
    "ESTABLISHING SECURE CONNECTION...",
    "AUTHENTICATING HARDWARE...",
    "LOADING ENCRYPTION MODULES...",
    "ACCESSING SECURITY DIRECTORY...",
    "CONNECTING TO COMMAND CENTER...",
    "PREPARING INTERFACE...",
  ];
  
  // Format timestamp more like a terminal
  const formatTimestamp = () => {
    const now = new Date();
    return `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
  };
  
  // Display initial boot messages with a more authentic terminal feel
  useEffect(() => {
    let counter = 0;
    let timeouts: NodeJS.Timeout[] = [];
    
    const addMessage = () => {
      if (counter < initialBootMessages.length) {
        const newMessage = initialBootMessages[counter];
        
        // Add random technical details for more authentic terminal feel
        const randomTechDetails = getRandomTechDetails(counter);
        const formattedMessage = randomTechDetails ? 
          `${newMessage}\n  ${randomTechDetails}` : 
          newMessage;
          
        setBootLines(prev => [...prev, formattedMessage]);
        
        // Update progress
        const progress = Math.round((counter + 1) / (initialBootMessages.length + 1) * 75); // Only go to 75%
        setLoadingProgress(progress);
        
        counter++;
        
        // Variable timing for more authentic feel
        const variableDelay = 1200 + Math.random() * 600;
        const timeout = setTimeout(addMessage, variableDelay);
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
  
  // Generate random technical details for more authentic terminal feel
  const getRandomTechDetails = (index: number): string => {
    const details = [
      "Loading module: sec_protocol_v3.8.5..",
      "Verifying digital signatures: SHA-256..",
      "System memory allocated: 4096MB..",
      "Encryption: AES-256-GCM active..",
      "Network status: SECURE..",
      "Firewall: ACTIVE..",
      "CPU Usage: 12%..",
      "Registry check: PASSED..",
      "Memory scan complete: NO THREATS..",
      "Security level: MAXIMUM..",
      "Directory access: /usr/mission/secure78275464..",
      "API version: 4.2.67..",
    ];
    
    // Only show details on some lines for authenticity
    if (Math.random() > 0.3) {
      // Choose a random detail or a detail based on the index
      const detailIndex = (index + Math.floor(Math.random() * 3)) % details.length;
      return details[detailIndex];
    }
    
    return "";
  };
  
  const handleProceed = () => {
    setShowContinue(false);
    
    // Add more terminal-like messages
    setBootLines(prev => [...prev, "INITIATING SECURITY PROTOCOLS..."]);
    setLoadingProgress(90);
    
    setTimeout(() => {
      setBootLines(prev => [...prev, "VERIFYING AGENT CREDENTIALS..."]);
      
      setTimeout(() => {
        setBootLines(prev => [...prev, "SYSTEM READY: AGENT HB ACCESS POINT"]);
        setLoadingProgress(100);
        
        // Complete the boot sequence
        setTimeout(() => {
          onComplete();
        }, 2000);
      }, 1500);
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
            <span className="timestamp">{formatTimestamp()}</span>
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