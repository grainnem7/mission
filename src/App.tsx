// File: src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Terminal from './components/Terminal';
import AccessDenied from './components/AccessDenied';
import BootSequence from './components/BootSequence';
import SecretContent from './components/SecretContent';


function App() {
  const [bootComplete, setBootComplete] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  
  // Handle boot sequence completion
  const handleBootComplete = () => {
    setBootComplete(true);
  };
  
  const handleSolveAttempt = (solution: string): boolean => {
    setAttempts(prev => prev + 1);
    return false; // Always return false here as authentication is handled in the Terminal component
  };
  
  const handleKestrelAuthenticated = () => {
    // When the negroni question is solved, set authenticated to true
    setAuthenticated(true);
  };
  
  return (
    <div className="app">
      {!bootComplete ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <>
          {authenticated ? (
            <SecretContent />
          ) : (
            <div className="main-terminal">
              <div className="terminal-header">
                <div className="terminal-header-top">
                  {/* Terminal window controls */}
                  <div className="terminal-controls">
                    <div className="terminal-button close"></div>
                    <div className="terminal-button minimize"></div>
                    <div className="terminal-button maximize"></div>
                  </div>
                  <h1>agent@secure-terminal:~/mission_78275464</h1>
                </div>
                
                <div className="top-right-data">
                  <div>attempts: {attempts}</div>
                  <div>status: {authenticated ? "authenticated" : "verification_required"}</div>
                </div>
              </div>
              
              <Terminal 
                onSolveAttempt={handleSolveAttempt} 
                onStarlingPuzzleSolved={handleKestrelAuthenticated}
              />
              
              <AccessDenied visible={attempts > 2 && !authenticated} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;