import { useState, useEffect } from 'react';
import './App.css';
import './components/EthicalDilemmas.css';
import { content, gameColors } from './data/content';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import AmAnalysis from './components/AmAnalysis';
import BusinessConcept from './components/BusinessConcept';
import Terminal from './components/Terminal';
import EthicalDilemmas from './components/EthicalDilemmas';
import SpiritualBarometer from './components/SpiritualBarometer';

function App() {
  const [alignment, setAlignment] = useState(50);
  const [currentSection, setCurrentSection] = useState('hero');

  const handleAlignmentChange = (value: number) => {
    setAlignment(prev => {
      const newValue = Math.max(0, Math.min(100, prev + value));
      return newValue;
    });
  };

  useEffect(() => {
    // Apply game-inspired colors to the document
    document.documentElement.style.setProperty('--color-background', gameColors.background);
    document.documentElement.style.setProperty('--color-primary', gameColors.primary);
    document.documentElement.style.setProperty('--color-secondary', gameColors.secondary);
    document.documentElement.style.setProperty('--color-accent', gameColors.accent);
    document.documentElement.style.setProperty('--color-text', gameColors.text);
    document.documentElement.style.setProperty('--color-text-secondary', gameColors.textSecondary);
  }, []);

  return (
    <div className="app">
      <SpiritualBarometer value={alignment} />
      
      <Navigation 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection} 
      />
      
      <main>
        <section id="hero" className={currentSection === 'hero' ? 'active' : ''}>
          <Hero 
            content={content.hero} 
            onSectionChange={setCurrentSection}
          />
          <Terminal 
            content={content.interactiveElements.terminal} 
            onSectionChange={setCurrentSection}
          />
        </section>
        
        <section id="analysis" className={currentSection === 'analysis' ? 'active' : ''}>
          <AmAnalysis content={content.amAnalysis} />
        </section>
        
        <section id="concept" className={currentSection === 'concept' ? 'active' : ''}>
          <BusinessConcept content={content.businessConcept} />
        </section>
        
        <section id="dilemmas" className={currentSection === 'dilemmas' ? 'active' : ''}>
          <EthicalDilemmas 
            dilemmas={content.interactiveElements.dilemmas} 
            onAlignmentChange={handleAlignmentChange}
          />
        </section>
      </main>
      
      <footer>
        <p>Aligned Mastercomputing © {new Date().getFullYear()}</p>
        <p>Inspired by Harlan Ellison's "I Have No Mouth, and I Must Scream"</p>
      </footer>
    </div>
  );
}

export default App;
