// File: src/components/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

interface TerminalProps {
  onSolveAttempt: (solution: string) => boolean;
  onStarlingPuzzleSolved: () => void;
}


const Terminal: React.FC<TerminalProps> = ({ onSolveAttempt, onStarlingPuzzleSolved }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showAccessButton, setShowAccessButton] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [matrixEffect, setMatrixEffect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Set up cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Render Matrix-like digital rain effect in the background
  const renderMatrixRain = () => {
    if (!matrixEffect) return null;
    
    return (
      <div className="matrix-rain">
        {Array.from({ length: 15 }).map((_, index) => (
          <div 
            key={`matrix-column-${index}`} 
            className="matrix-column"
            style={{ 
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {Array.from({ length: 15 }).map((_, charIndex) => (
              <div key={`matrix-char-${index}-${charIndex}`}>
                {String.fromCharCode(Math.floor(Math.random() * 93) + 33)}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Initial messages when terminal loads
  useEffect(() => {
    if (!authenticated) {
      // Start with a clear screen
      setIsTyping(true);
      
      // Sequence of boot messages, one by one
      const bootSequence = [
        'Initializing secure terminal...',
        'Loading security protocols...',
        'Establishing secure connection...',
        '.......................',
        'Connection established.',
        'OPERATION RENDEZVOUS',
        'CLASSIFICATION: URGENT',
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
        'AUTHENTICATION REQUIRED',
        'To verify your identity as Special Agent Honey Bear, please respond to the security question below:',
        'SECURITY QUESTION: What was the code name for the red infiltration liquid that you and S.A. Kestral deployed during Operation Guardian?'
      ];
      
      // Simulate typing effect with each message appearing sequentially
      let index = 0;
      const interval = setInterval(() => {
        if (index < bootSequence.length) {
          setMessages(prev => [...prev, bootSequence[index]]);
          
          // For ASCII banner, also trigger matrix effect briefly
          if (index === 5) {
            setMatrixEffect(true);
            setTimeout(() => setMatrixEffect(false), 3000);
          }
          
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
          // Focus on input after boot sequence completes
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }
      }, 400);
      
      return () => clearInterval(interval);
    }
  }, [authenticated]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || buttonClicked) return;

    // Don't prefix the user input with "> " as we'll apply that through CSS
    setMessages(prev => [...prev, input]);
    processCommand(input);
    setInput('');
  };

  const processCommand = (cmd: string) => {
    const answer = cmd.toLowerCase().trim();

    // Handle special commands for fun
    if (answer === 'help' || answer === 'man') {
      setMessages(prev => [
        ...prev,
        'Available commands:',
        ' - answer <response>: Respond to the security question',
        ' - clear: Clear the terminal screen',
        ' - whoami: Display current user',
        ' - hint: Request a hint (warning: increases security level)'
      ]);
      return;
    }
    
    if (answer === 'clear') {
      setMessages([
        'Terminal cleared.',
        'SECURITY QUESTION: What was the code name for the red infiltration liquid that you and S.A. Kestral deployed during Operation Guardian?'
      ]);
      return;
    }
    
    if (answer === 'whoami') {
      setMessages(prev => [
        ...prev,
        'User: Special Agent Honey Bear (authentication pending)'
      ]);
      return;
    }
    
    if (answer === 'hint') {
      setMessages(prev => [
        ...prev,
        'SECURITY ALERT: Hint request detected',
        'Hint: The code name is related to a classic cocktail with Campari, gin, and vermouth.'
      ]);
      onSolveAttempt('');
      return;
    }

    if (answer === 'negroni' || answer === 'the negroni') {
      setIsTyping(true);
      
      // Trigger matrix effect during authentication
      setMatrixEffect(true);
      
      // Add typing delay for authenticity
      setTimeout(() => {
        setMessages(prev => [
          ...prev, 
          'Verifying credentials...',
          '................',
          'AUTHENTICATION SUCCESSFUL.'
        ]);
        
        setTimeout(() => {
          setMatrixEffect(false);
          setAuthenticated(true);
          setMessages(prev => [
            ...prev,
            'Welcome back, Special Agent Honey Bear.',
            'Special Agent Kestrel\'s message has been decrypted and requires your immediate attention.'
          ]);

          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              'ACCESS READY. Press the button below to view classified communication.'
            ]);
            setShowAccessButton(true);
            setIsTyping(false);
          }, 2000);
        }, 2000);
      }, 1500);
    } else {
      // Random fake hacking failure messages
      const failureMessages = [
        'AUTHENTICATION FAILED. This information would only be known to Special Agent Honey Bear.',
        'ACCESS DENIED. Incorrect security response.',
        'IDENTITY VERIFICATION FAILED. Security protocols engaged.',
        'INCORRECT RESPONSE. Warning: Multiple failures will trigger lockout.'
      ];
      
      const randomMessage = failureMessages[Math.floor(Math.random() * failureMessages.length)];
      
      setMessages(prev => [
        ...prev,
        randomMessage
      ]);
      
      // Brief "glitch" effect
      if (terminalRef.current) {
        terminalRef.current.classList.add('error-glitch');
        setTimeout(() => {
          if (terminalRef.current) {
            terminalRef.current.classList.remove('error-glitch');
          }
        }, 500);
      }
      
      onSolveAttempt('');
    }
  };

  const handleAccessCommunique = () => {
    // Hide the button immediately when clicked
    setButtonClicked(true);
    setShowAccessButton(false);
    
    // Random hacker-style loading messages
    const loadingMessages = [
      'ACCESSING TOP SECRET CONTENT...',
      'ESTABLISHING SECURE CONNECTION...',
      'BYPASSING SECURITY PROTOCOLS...',
      'DECRYPTING COMMUNICATION CHANNEL...',
      'VALIDATING AGENT CREDENTIALS...',
      'INITIALIZING SECURE TRANSMISSION...',
      'TRANSMISSION INITIATED...'
    ];
    
    // Show messages one by one for a cooler effect
    let index = 0;
    const messageInterval = setInterval(() => {
      if (index < loadingMessages.length) {
        setMessages(prev => [...prev, loadingMessages[index]]);
        index++;
      } else {
        clearInterval(messageInterval);
        // Only call the callback after all messages are shown
        setTimeout(() => {
          onStarlingPuzzleSolved();
        }, 800);
      }
    }, 300);
  };

  const getMessageType = (message: string): string => {
    if (!message) return 'system';
    if (message.startsWith('>')) return 'user';
    if (message.includes('AUTHENTICATION SUCCESSFUL')) return 'success';
    if (message.includes('ACCESS DENIED') || message.includes('FAILED') || message.includes('INCORRECT')) return 'error';
    if (message.includes('ASCII_BANNER') || message.includes('_____')) return 'banner';
    if (message.includes('SECURITY QUESTION')) return 'important';
    return 'system';
  };

  // Function to handle clicks on the terminal to focus on input
  const handleTerminalClick = () => {
    if (!showAccessButton && !isTyping && !buttonClicked && inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle special key commands for fun
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+L to clear the screen
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setMessages([
        'Terminal cleared.',
        'SECURITY QUESTION: What was the code name for the red infiltration liquid that you and S.A. Kestral deployed during Operation Guardian?'
      ]);
    }
    
    // Up arrow for command history (simplified)
    if (e.key === 'ArrowUp') {
      // Find the last user input
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg !== input && 
            !msg.startsWith('AUTHENTICATION') && 
            !msg.startsWith('Available commands') && 
            !msg.includes('SECURITY QUESTION')) {
          e.preventDefault();
          setInput(msg);
          break;
        }
      }
    }
  };

  return (
    <div className="terminal" onClick={handleTerminalClick} ref={terminalRef}>
      {renderMatrixRain()}
      
      <div className="terminal-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`terminal-message ${getMessageType(msg)}`}>
            {msg}
          </div>
        ))}

        {showAccessButton && !buttonClicked && (
          <div className="access-button-container">
            <button className="access-button" onClick={handleAccessCommunique}>
              ACCESS CLASSIFIED DOCUMENTS
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!buttonClicked && !showAccessButton && (
        <form onSubmit={handleSubmit} className="terminal-input-area">
          <span className="prompt">$</span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            disabled={isTyping}
            autoFocus
            ref={inputRef}
            spellCheck="false"
            placeholder={isTyping ? "" : "Enter command or security response..."}
          />
          {cursorVisible && !isTyping && <span className="cursor"></span>}
        </form>
      )}
    </div>
  );
};

export default Terminal;