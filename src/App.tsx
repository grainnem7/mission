// File: src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Terminal from './Terminal';
import AccessDenied from './AccessDenied';
import BootSequence from './BootSequence';
import SecretContent from './SecretContent';


function App() {
  const [bootComplete, setBootComplete] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  
  // Simulate boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setBootComplete(true);
    }, 5000); // 5 second boot sequence
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSolveAttempt = (solution: string): boolean => {
    // This will be your puzzle solution
    const correctSolution = "ALPHA-ZULU-9"; // Placeholder solution
    
    setAttempts(prev => prev + 1);
    
    if (solution.toUpperCase() === correctSolution) {
      setAuthenticated(true);
      return true;
    }
    return false;
  };
  
  return (
    <div className="app">
      {!bootComplete ? (
        <BootSequence />
      ) : (
        <>
          {authenticated ? (
            <SecretContent />
          ) : (
            <div className="main-terminal">
              <div className="terminal-header">
                <div className="status-indicator"></div>
                <h1>CLASSIFIED TERMINAL</h1>
                <div className="top-right-data">
                  <div>ATTEMPTS: {attempts}</div>
                  <div>STATUS: {authenticated ? "AUTHENTICATED" : "LOCKED"}</div>
                </div>
              </div>
              
              <Terminal onSolveAttempt={handleSolveAttempt} />
              
              <AccessDenied visible={attempts > 0} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;