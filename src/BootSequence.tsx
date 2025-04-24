// File: src/components/BootSequence.tsx
import React, { useState, useEffect } from 'react';
import './BootSequence.css';

const BootSequence: React.FC = () => {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  
  useEffect(() => {
    const bootMessages = [
      "INITIALIZING SYSTEM...",
      "LOADING KERNEL MODULES...",
      "CHECKING HARDWARE INTEGRITY...",
      "ESTABLISHING SECURE CONNECTION...",
      "LOADING CRYPTOGRAPHIC MODULES...",
      "INITIALIZING USER INTERFACE...",
      "ACTIVATING TERMINAL PROTOCOLS...",
      "SYSTEM READY"
    ];
    
    // Display boot messages sequentially
    bootMessages.forEach((message, index) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, message]);
      }, index * 600);
    });
    
    // Progress bar animation
    const totalDuration = bootMessages.length * 600;
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, totalDuration / 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="boot-sequence">
      <div className="boot-header">
        <div className="agency-logo">
          <span>TOP</span>
          <span>SECRET</span>
        </div>
        <h2>SECURE SYSTEM BOOT</h2>
      </div>
      
      <div className="boot-console">
        {bootLines.map((line, index) => (
          <div key={index} className="boot-line">
            <span className="timestamp">[{String(index).padStart(2, '0')}]</span>
            <span className="message">{line}</span>
          </div>
        ))}
      </div>
      
      <div className="boot-progress-container">
        <div 
          className="boot-progress-bar" 
          style={{ width: `${loadingProgress}%` }}
        ></div>
        <div className="boot-progress-text">
          SYSTEM BOOT: {loadingProgress}%
        </div>
      </div>
    </div>
  );
};

export default BootSequence;