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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authenticated) {
      const intro = [
        'MISSION ID: 78275464',
        'OPERATION RENDEZVOUS',
        'CLASSIFICATION: URGENT',
        '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
        'AUTHENTICATION REQUIRED',
        'To verify your identity as, please respond to the security question below:',
        'SECURITY QUESTION: What was the code name for the red infiltration liquid that you and S.A. Kestral deployed during Operation Guardian?'
      ];
      setMessages(intro);
    }
  }, [authenticated]);

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
    const answer = cmd.toLowerCase().trim();

    if (answer === 'negroni' || answer === 'the negroni') {
      setIsTyping(true);
      
      // simulate loading, then start "fresh terminal"
      setTimeout(() => {
        setAuthenticated(true);
        setMessages([
          'AUTHENTICATION SUCCESSFUL.',
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
      }, 1500);
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
        {messages.map((msg, idx) => (
          <div key={idx} className={`terminal-message ${getMessageType(msg)}`}>
            {msg.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}

        {showAccessButton && (
          <div className="access-button-container">
            <button className="access-button" onClick={handleAccessCommunique}>
              ACCESS CLASSIFIED DOCUMENTS
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!showAccessButton && (
        <form onSubmit={handleSubmit} className="terminal-input-area">
          <span className="prompt"> </span>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="terminal-input"
            disabled={isTyping}
            autoFocus
            spellCheck="false"
            placeholder="Enter security response..."
          />
        </form>
      )}
    </div>
  );
};

export default Terminal;
