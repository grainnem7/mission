// File: src/components/SecretContent.tsx
import React, { useState, useEffect, useRef } from 'react';
import './SecretContent.css';

const SecretContent: React.FC = () => {
  const [decrypted, setDecrypted] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [decryptionProgress, setDecryptionProgress] = useState<number>(0);
  const [decryptionText, setDecryptionText] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const kestrelMessage = `Special Agent Honey Bear,

I know this message breaks the protocol you set — but I believe the situation calls for urgent interception.

I recieved your latest transmission this afternoon. I must say, it was quite the surprise to learn you are coordinating missions so soon after operation Wien. Your skills are commendable.

You've set new coordinates for a southern rendezvous six months and one week from the day we first crossed paths. But recall - we are already to be deployed on a critical operation that very day. A high-priority assignment. Northbound. 

I believe this detail may have slipped through your otherwise impeccable intelligence.

Concerning Operation Rendezvous, I suggest immediate recalibration of one or both flight plans to avoid catastrophic overlap.

Awaiting further communication on this matter urgently.

Yours,
Agent Kestrel
24th April 2025`;

  // Pre-render the full message (but invisible) to establish the correct size immediately
  const fullMessageLines = kestrelMessage.split('\n');
  
  // Linux-style decryption animation
  useEffect(() => {
    if (!decrypted) {
      // Simulate Linux terminal decryption process
      const decryptionSequence = [
        '$ sudo cryptctl -a --level=maximum',
        'Initializing cryptographic subsystem...',
        'Loading AES-256 encryption modules...',
        '[■□□□□□□□□□] 10% Decrypting metadata',
        'Verifying integrity hash: fc8d32a1eb8e73e5ef4a5a1c491b0ff7',
        '[■■□□□□□□□□] 20% Decrypting file structure',
        'Hash verification successful.',
        '[■■■□□□□□□□] 30% Extracting encrypted payload',
        'Memory allocated for decryption: 256MB',
        '[■■■■□□□□□□] 40% Calculating cipher parameters',
        'Applying decryption key: ********-****-****-****-************',
        '[■■■■■□□□□□] 50% Decrypting content blocks',
        'Decrypting block 1/5: COMPLETE',
        'Decrypting block 2/5: COMPLETE',
        '[■■■■■■□□□□] 60% Assembling message components',
        'Decrypting block 3/5: COMPLETE',
        '[■■■■■■■□□□] 70% Validating content integrity',
        'Decrypting block 4/5: COMPLETE',
        '[■■■■■■■■□□] 80% Parsing message headers',
        'Decrypting block 5/5: COMPLETE',
        '[■■■■■■■■■□] 90% Finalizing decryption',
        'Integrity check: PASSED',
        'Origin verification: PASSED',
        'Timestamp verification: PASSED',
        '[■■■■■■■■■■] 100% Decryption complete',
        'Displaying message from Agent Kestrel...'
      ];
      
      let currentIndex = 0;
      
      const decryptionInterval = setInterval(() => {
        if (currentIndex < decryptionSequence.length) {
          const newText = decryptionSequence[currentIndex];
          setDecryptionText(prev => [...prev, newText]);
          
          // Extract progress percentage
          if (newText.includes('%')) {
            const percentage = parseInt(newText.match(/(\d+)%/)?.[1] || '0');
            setDecryptionProgress(percentage);
          }
          
          currentIndex++;
          
          // Auto-scroll as new text appears
          if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        } else {
          clearInterval(decryptionInterval);
          
          // Add a pause before transitioning to the document
          setTimeout(() => {
            setDecrypted(true);
          }, 2000); // 2 second pause before showing document
        }
      }, 250); // Terminal output speed
      
      return () => clearInterval(decryptionInterval);
    }
  }, []);
  
  // Improved typewriter effect
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
  
  // Get the appropriate CSS class for a terminal line
  const getLineClass = (line: string): string => {
    if (line.startsWith('$')) return 'command';
    if (line.includes('PASSED')) return 'success';
    if (line.includes('ERROR') || line.includes('FAILED')) return 'error';
    if (line.includes('%')) return 'progress';
    return 'output';
  };
  
  // Simple effect to simulate "matrix rain" in the background
  const renderMatrixRain = () => {
    return (
      <div className="matrix-rain">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={`matrix-column-${index}`} 
            className="matrix-column"
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 10}s`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, charIndex) => (
              <span key={`matrix-char-${index}-${charIndex}`}>
                {String.fromCharCode(Math.floor(Math.random() * 93) + 33)}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="secret-content">
      {!decrypted ? (
        <div className="decrypting" ref={containerRef}>
          <div className="linux-terminal">
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="terminal-button close"></div>
                <div className="terminal-button minimize"></div>
                <div className="terminal-button maximize"></div>
              </div>
              <div className="terminal-title">agent@secure-terminal:~/mission_78275464/decrypt</div>
            </div>
            
            <div className="decryption-terminal-content">
              {decryptionText.map((line, index) => (
                <div key={`line-${index}`} className={`terminal-line ${getLineClass(line)}`}>
                  {line}
                </div>
              ))}
              
              {/* Terminal cursor */}
              <div className="cursor-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-cursor"></span>
              </div>
            </div>
            
            {/* Progress bar */}
            {decryptionProgress > 0 && (
              <div className="terminal-progress">
                <div className="progress-bar" style={{ width: `${decryptionProgress}%` }}></div>
                <div className="progress-text">{decryptionProgress}% complete</div>
              </div>
            )}
            
            {renderMatrixRain()}
          </div>
        </div>
      ) : (
        <div className="message-content" ref={containerRef}>
          <div className="typewriter-paper">
            {/* Hidden full message to set the size */}
            <div className="full-message" aria-hidden="true">
              {fullMessageLines.map((line, index) => (
                <div key={`full-line-${index}`} className="typewriter-line">
                  {line || ' '}
                </div>
              ))}
            </div>
            
            {/* Visible typewriter effect */}
            <div className="typing-overlay">
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
        </div>
      )}
    </div>
  );
};

export default SecretContent;