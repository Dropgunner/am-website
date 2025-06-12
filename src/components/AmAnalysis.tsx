import { FC } from 'react';

interface AmAnalysisProps {
  content: {
    title: string;
    subtitle: string;
    introduction: string;
    timeline: Array<{
      title: string;
      description: string;
      lesson: string;
    }>;
    principles: Array<{
      id: string;
      title: string;
      description: string;
      application: string;
      icon: string;
    }>;
    ethicalLessons: Array<{
      title: string;
      description: string;
      example: string;
    }>;
  };
}

const AmAnalysis: FC<AmAnalysisProps> = ({ content }) => {
  return (
    <div className="am-analysis">
      <div className="section-header">
        <h2>{content.title}</h2>
        <p className="subtitle">{content.subtitle}</p>
      </div>
      
      <div className="analysis-introduction">
        <p>{content.introduction}</p>
      </div>
      
      <div className="timeline-section">
        <h3>The Evolution of AM</h3>
        <div className="timeline">
          {content.timeline.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="timeline-lesson">
                  <strong>Lesson:</strong> {item.lesson}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="principles-section">
        <h3>Principles for Defeating AM</h3>
        <div className="principles-grid">
          {content.principles.map((principle) => (
            <div key={principle.id} className="principle-card">
              <div className="principle-icon">{principle.icon}</div>
              <h4>{principle.title}</h4>
              <p>{principle.description}</p>
              <div className="principle-application">
                <strong>Application:</strong> {principle.application}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="ethical-lessons-section">
        <h3>Ethical Lessons for AI Use</h3>
        <div className="ethical-lessons-grid">
          {content.ethicalLessons.map((lesson, index) => (
            <div key={index} className="ethical-lesson-card">
              <h4>{lesson.title}</h4>
              <p>{lesson.description}</p>
              <div className="ethical-lesson-example">
                <strong>Example:</strong> {lesson.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmAnalysis;
