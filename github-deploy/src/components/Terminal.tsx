import { FC, useState, useEffect, useRef } from 'react';

interface TerminalProps {
  content: {
    welcome: string;
    prompt: string;
    responses: {
      help: string;
      about: string;
      unknown: string;
      [key: string]: string;
    };
  };
  onSectionChange: (section: string) => void;
}

const Terminal: FC<TerminalProps> = ({ content, onSectionChange }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([content.welcome]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand();
    }
  };

  const processCommand = () => {
    const command = input.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, `${content.prompt}${input}`]);
    
    // Process command
    let response = '';
    
    switch (command) {
      case 'help':
        response = content.responses.help;
        break;
      case 'about':
        response = content.responses.about;
        break;
      case 'clear':
        setHistory([content.welcome]);
        setInput('');
        return;
      case 'vision':
        onSectionChange('concept');
        response = 'Navigating to Business Concept section...';
        break;
      case 'principles':
        onSectionChange('concept');
        response = 'Navigating to Business Concept section...';
        break;
      case 'areas':
        onSectionChange('concept');
        response = 'Navigating to Business Concept section...';
        break;
      case 'model':
        onSectionChange('concept');
        response = 'Navigating to Business Concept section...';
        break;
      case 'implementation':
        onSectionChange('concept');
        response = 'Navigating to Business Concept section...';
        break;
      case 'analysis':
        onSectionChange('analysis');
        response = 'Navigating to AM Analysis section...';
        break;
      case 'dilemmas':
        onSectionChange('dilemmas');
        response = 'Navigating to Ethical Dilemmas section...';
        break;
      default:
        response = content.responses.unknown;
    }
    
    // Add response to history
    setHistory(prev => [...prev, response]);
    
    // Clear input
    setInput('');
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-title">AM TERMINAL INTERFACE</div>
        <div className="terminal-controls">
          <span className="terminal-control"></span>
          <span className="terminal-control"></span>
          <span className="terminal-control"></span>
        </div>
      </div>
      <div 
        className="terminal" 
        ref={terminalRef} 
        onClick={focusInput}
        role="region"
        aria-label="Interactive terminal"
      >
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            {line}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="terminal-prompt">{content.prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            aria-label="Terminal input"
          />
        </div>
      </div>
      <div className="terminal-hint">
        Type 'help' for available commands
      </div>
    </div>
  );
};

export default Terminal;
