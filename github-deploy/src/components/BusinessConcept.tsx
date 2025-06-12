import { FC } from 'react';

interface BusinessConceptProps {
  content: {
    title: string;
    subtitle: string;
    vision: {
      title: string;
      description: string;
      contrast: {
        am: string;
        aligned: string;
      };
    };
    principles: Array<{
      id: string;
      title: string;
      description: string;
      question: string;
      icon: string;
    }>;
    businessAreas: Array<{
      id: string;
      title: string;
      description: string;
      examples: string[];
      icon: string;
    }>;
    organization: {
      title: string;
      description: string;
      components: Array<{
        title: string;
        description: string;
        members: string;
      }>;
    };
    businessModel: {
      title: string;
      description: string;
      models: Array<{
        title: string;
        description: string;
        examples: string[];
      }>;
    };
    implementation: {
      title: string;
      description: string;
      phases: Array<{
        title: string;
        activities: string[];
        timeline: string;
      }>;
    };
    conclusion: {
      title: string;
      paragraphs: string[];
    };
  };
}

const BusinessConcept: FC<BusinessConceptProps> = ({ content }) => {
  return (
    <div className="business-concept">
      <div className="section-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
      </div>
      
      <div className="vision-section">
        <h3>{content.vision.title}</h3>
        <p>{content.vision.description}</p>
        
        <div className="vision-contrast">
          <div className="vision-am">
            <h4>AM's Vision</h4>
            <p>{content.vision.contrast.am}</p>
          </div>
          <div className="vision-aligned">
            <h4>Our Vision</h4>
            <p>{content.vision.contrast.aligned}</p>
          </div>
        </div>
      </div>
      
      <div className="principles-section">
        <h3>Guiding Principles</h3>
        <div className="principles-wheel">
          {content.principles.map((principle) => (
            <div key={principle.id} className="principle-segment">
              <div className="principle-icon">{principle.icon}</div>
              <h4>{principle.title}</h4>
              <p>{principle.description}</p>
              <div className="principle-question">
                <strong>Key Question:</strong> {principle.question}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="business-areas-section">
        <h3>Business Areas</h3>
        <div className="business-areas-map">
          {content.businessAreas.map((area) => (
            <div key={area.id} className="business-area-card">
              <div className="business-area-icon">{area.icon}</div>
              <h4>{area.title}</h4>
              <p>{area.description}</p>
              <ul className="business-area-examples">
                {area.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="organization-section">
        <h3>{content.organization.title}</h3>
        <p>{content.organization.description}</p>
        
        <div className="organization-structure">
          {content.organization.components.map((component, index) => (
            <div key={index} className="organization-component">
              <h4>{component.title}</h4>
              <p>{component.description}</p>
              <div className="organization-members">
                <strong>Members:</strong> {component.members}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="business-model-section">
        <h3>{content.businessModel.title}</h3>
        <p>{content.businessModel.description}</p>
        
        <div className="business-models">
          {content.businessModel.models.map((model, index) => (
            <div key={index} className="business-model-card">
              <h4>{model.title}</h4>
              <p>{model.description}</p>
              <ul className="business-model-examples">
                {model.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="implementation-section">
        <h3>{content.implementation.title}</h3>
        <p>{content.implementation.description}</p>
        
        <div className="implementation-timeline">
          {content.implementation.phases.map((phase, index) => (
            <div key={index} className="implementation-phase">
              <h4>{phase.title}</h4>
              <div className="phase-timeline">{phase.timeline}</div>
              <ul className="phase-activities">
                {phase.activities.map((activity, actIndex) => (
                  <li key={actIndex}>{activity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="conclusion-section">
        <h3>{content.conclusion.title}</h3>
        {content.conclusion.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default BusinessConcept;
