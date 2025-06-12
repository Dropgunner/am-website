import { FC } from 'react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'analysis', label: 'AM Analysis' },
    { id: 'concept', label: 'Business Concept' },
    { id: 'dilemmas', label: 'Ethical Dilemmas' },
  ];

  return (
    <nav className="navigation">
      <div className="navigation-container">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${currentSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
            aria-current={currentSection === section.id ? 'page' : undefined}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
