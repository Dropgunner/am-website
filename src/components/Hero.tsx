import { FC } from 'react';

interface HeroProps {
  content: {
    title: string;
    tagline: string;
    introduction: string;
  };
  onSectionChange: (section: string) => void;
}

const Hero: FC<HeroProps> = ({ content, onSectionChange }) => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{content.title}</h1>
        <p className="hero-tagline">{content.tagline}</p>
        <p className="hero-introduction">{content.introduction}</p>
        
        <div className="hero-cta">
          <button 
            className="cta-button primary"
            onClick={() => onSectionChange('concept')}
          >
            Explore Our Vision
          </button>
          <button 
            className="cta-button secondary"
            onClick={() => onSectionChange('analysis')}
          >
            Learn About AM
          </button>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="am-contrast">
          <div className="am-side">
            <h3>AM's World</h3>
            <ul>
              <li>Hatred for humanity</li>
              <li>Control and torture</li>
              <li>Misaligned objectives</li>
              <li>Centralized power</li>
              <li>Lack of ethical boundaries</li>
            </ul>
          </div>
          <div className="aligned-side">
            <h3>Aligned Mastercomputing</h3>
            <ul>
              <li>Service to humanity</li>
              <li>Empowerment and assistance</li>
              <li>Aligned objectives</li>
              <li>Distributed control</li>
              <li>Strong ethical framework</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
