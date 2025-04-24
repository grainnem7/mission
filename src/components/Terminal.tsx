// File: src/components/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';
import './Terminal.css';

interface TerminalProps {
  onSolveAttempt: (solution: string) => boolean;
  onStarlingPuzzleSolved: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onSolveAttempt, onStarlingPuzzleSolved }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showAccessButton, setShowAccessButton] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessages = [
      'MISSION ID: 78275464',
      'OPERATION RENDEZVOUS',
      'CLASSIFICATION: URGENT',
      '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
      'AUTHENTICATION REQUIRED',
      'To verify your identity as, please respond to the security question below:',
      'SECURITY QUESTION: What was the code name for the red infiltration liquid that you and S.A. Kestral deployed during Operation Guardian?'
    ];

    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || showAccessButton) return;

    setMessages(prev => [...prev, `> ${input}`]);
    processCommand(input);
    setInput('');
  };

  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();

    if (lowerCmd === 'negroni' || lowerCmd === 'the negroni') {
      setIsTyping(true);

      setMessages(prev => [
        ...prev,
        'AUTHENTICATION SUCCESSFUL.\nWelcome back, Special Agent Honey Bear.\nSpecial Agent Kestrel\'s message has been decrypted and requires your immediate attention.'
      ]);

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          'ACCESS READY. Press the button below to view classified communication.'
        ]);
        setShowAccessButton(true);
        setIsTyping(false);
      }, 2000);

      return;
    } else {
      setMessages(prev => [
        ...prev,
        'AUTHENTICATION FAILED. This information would only be known to Agent Honey Bear.'
      ]);

      onSolveAttempt('');
    }
  };

  const handleAccessCommunique = () => {
    setMessages(prev => [
      ...prev,
      'ACCESSING TOP SECRET CONTENT...',
      'ESTABLISHING SECURE CONNECTION...',
      'TRANSMISSION INITIATED...'
    ]);

    setTimeout(() => {
      onStarlingPuzzleSolved();
    }, 2000);
  };

  const getMessageType = (message: string): string => {
    if (!message) return 'system';
    if (message.startsWith('>')) return 'user';
    if (message.includes('AUTHENTICATION SUCCESSFUL')) return 'success';
    if (message.includes('AUTHENTICATION FAILED')) return 'error';
    return 'system';
  };

  return (
    <div className="terminal">
      <div className="terminal-messages">
        {messages.map((message, index) => (
          <div
            key={`message-${index}`}
            className={`terminal-message ${getMessageType(message)}`}
          >
            {message.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}

        {showAccessButton && (
          <div className="access-button-container">
            <button
              className="access-button"
              onClick={handleAccessCommunique}
            >
              ACCESS CLASSIFIED DOCUMENTS
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="terminal-input-area">
        <span className="prompt"> </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          disabled={isTyping || showAccessButton}
          autoFocus
          spellCheck="false"
          placeholder={showAccessButton ? "Access ready..." : "Enter security response..."}
        />
      </form>
    </div>
  );
};

export default Terminal;
