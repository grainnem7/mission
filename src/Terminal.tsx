// File: src/components/Terminal.tsx
import React, { useState, useEffect, useRef } from 'react';

import './Terminal.css';
import Typewriter from './Typewriter';

interface TerminalProps {
  onSolveAttempt: (solution: string) => boolean;
}

interface Message {
  text: string;
  type: 'system' | 'user' | 'error' | 'success';
}

const Terminal: React.FC<TerminalProps> = ({ onSolveAttempt }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial system messages
  useEffect(() => {
    const initialMessages: Message[] = [
      { text: '> SYSTEM INITIALIZED', type: 'system' },
      { text: '> SECURITY PROTOCOL ACTIVE', type: 'system' },
      { text: '> AUTHENTICATION REQUIRED', type: 'system' },
      { text: '> PLEASE SOLVE THE FOLLOWING TO GAIN ACCESS:', type: 'system' },
      { text: '> "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?"', type: 'system' }
    ];
    
    // Simulate typing effect for initial messages
    let delay = 0;
    initialMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (index === initialMessages.length - 1) {
          setIsTyping(false);
        }
      }, delay);
      delay += 800; // Time between messages
    });
    
    setIsTyping(true);
  }, []);
  
  // Auto scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    // Add user input to messages
    const userMessage: Message = { text: `> ${input}`, type: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    // Process command
    processCommand(input);
    
    // Clear input
    setInput('');
  };
  
  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase();
    
    // Check if it's a solution attempt
    const isSolved = onSolveAttempt(cmd);
    if (isSolved) {
      setMessages(prev => [...prev, { 
        text: '> ACCESS GRANTED. DECRYPTION IN PROGRESS...', 
        type: 'success' 
      }]);
      return;
    }
    
    // Process other commands
    if (lowerCmd === 'help') {
      setMessages(prev => [...prev, { 
        text: '> AVAILABLE COMMANDS: HELP, CLEAR, HINT, SOLVE [your answer]', 
        type: 'system' 
      }]);
    } else if (lowerCmd === 'clear') {
      setMessages([]);
    } else if (lowerCmd === 'hint') {
      setMessages(prev => [...prev, { 
        text: '> HINT: Consider invisible forces in nature.', 
        type: 'system' 
      }]);
    } else if (lowerCmd.startsWith('solve')) {
      // This is handled above with onSolveAttempt
      setMessages(prev => [...prev, { 
        text: '> ACCESS DENIED. INCORRECT SOLUTION.', 
        type: 'error' 
      }]);
    } else {
      setMessages(prev => [...prev, { 
        text: `> UNRECOGNIZED COMMAND: "${cmd}"`, 
        type: 'error' 
      }]);
    }
  };
  
  return (
    <div className="terminal">
      <div className="terminal-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`terminal-message ${msg.type}`}>
            <Typewriter text={msg.text} delay={30} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="terminal-input-area">
        <span className="prompt">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          disabled={isTyping}
          autoFocus
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default Terminal;