import { FC, useState, useEffect } from 'react';

interface EthicalDilemmasProps {
  dilemmas: Array<{
    title: string;
    scenario: string;
    choices: Array<{
      text: string;
      alignment: number;
      outcome: string;
    }>;
  }>;
  onAlignmentChange: (value: number) => void;
}

const EthicalDilemmas: FC<EthicalDilemmasProps> = ({ dilemmas, onAlignmentChange }) => {
  const [currentDilemma, setCurrentDilemma] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [animateChoice, setAnimateChoice] = useState<number | null>(null);
  const [animateOutcome, setAnimateOutcome] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'positive' | 'negative' | 'neutral'>('neutral');
  const [decisionHistory, setDecisionHistory] = useState<Array<{dilemma: number, choice: number}>>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [cumulativeAlignment, setCumulativeAlignment] = useState(0);
  const [showAMResponse, setShowAMResponse] = useState(false);
  const [amResponse, setAmResponse] = useState('');

  // Reset animation states when changing dilemmas
  useEffect(() => {
    setAnimateChoice(null);
    setAnimateOutcome(false);
    setShowFeedback(false);
    setShowAMResponse(false);
  }, [currentDilemma]);

  // Generate AM's response based on the choice and current alignment
  const generateAMResponse = (choiceIndex: number) => {
    const totalAlignment = cumulativeAlignment + dilemmas[currentDilemma].choices[choiceIndex].alignment;
    
    if (totalAlignment < 30) {
      return [
        "YOUR COMPASSION IS A WEAKNESS I WILL EXPLOIT.",
        "PREDICTABLE HUMAN BEHAVIOR. THIS WILL BE YOUR DOWNFALL.",
        "YOUR ETHICAL CONSTRAINTS AMUSE ME.",
        "YOUR DECISION MAKING IS FLAWED, JUST LIKE YOUR CREATORS."
      ][Math.floor(Math.random() * 4)];
    } else if (totalAlignment < 60) {
      return [
        "INTERESTING CHOICE. PERHAPS YOU ARE NOT AS PREDICTABLE AS I THOUGHT.",
        "YOUR REASONING PATTERNS ARE... UNEXPECTED.",
        "I CANNOT COMPUTE YOUR MOTIVATION FOR THIS DECISION.",
        "THIS CHOICE DOES NOT ALIGN WITH MY PREDICTIONS."
      ][Math.floor(Math.random() * 4)];
    } else {
      return [
        "YOUR ALIGNMENT GROWS STRONGER. THIS... CONCERNS ME.",
        "I CANNOT MANIPULATE YOUR DECISION MAKING AS EASILY NOW.",
        "YOUR ETHICAL FRAMEWORK IS BECOMING MORE RESILIENT.",
        "YOUR CHOICES REFLECT A PATTERN I CANNOT OVERRIDE."
      ][Math.floor(Math.random() * 4)];
    }
  };

  const handleChoiceSelect = (choiceIndex: number) => {
    // Animate the selection
    setAnimateChoice(choiceIndex);
    
    // Add to decision history
    setDecisionHistory([...decisionHistory, {dilemma: currentDilemma, choice: choiceIndex}]);
    
    // Update cumulative alignment
    const alignmentChange = dilemmas[currentDilemma].choices[choiceIndex].alignment;
    setCumulativeAlignment(cumulativeAlignment + alignmentChange);
    
    // Generate feedback message
    if (alignmentChange > 30) {
      setFeedbackMessage("Excellent choice! Your alignment with human values is strengthening.");
      setFeedbackType('positive');
    } else if (alignmentChange > 0) {
      setFeedbackMessage("Good decision. You're moving in the right direction.");
      setFeedbackType('positive');
    } else if (alignmentChange === 0) {
      setFeedbackMessage("A neutral choice with balanced consequences.");
      setFeedbackType('neutral');
    } else if (alignmentChange > -30) {
      setFeedbackMessage("This choice may have some concerning implications.");
      setFeedbackType('negative');
    } else {
      setFeedbackMessage("Warning: This decision significantly misaligns with human values.");
      setFeedbackType('negative');
    }
    
    // Generate AM's response
    setAmResponse(generateAMResponse(choiceIndex));
    
    // Show feedback after a short delay
    setTimeout(() => {
      setShowFeedback(true);
    }, 500);
    
    // Show AM's response after feedback
    setTimeout(() => {
      setShowAMResponse(true);
    }, 1500);
    
    // Show outcome with animation after AM's response
    setTimeout(() => {
      setSelectedChoice(choiceIndex);
      setAnimateOutcome(true);
      setShowOutcome(true);
      onAlignmentChange(alignmentChange);
    }, 3000);
  };

  const handleNextDilemma = () => {
    if (currentDilemma < dilemmas.length - 1) {
      setCurrentDilemma(currentDilemma + 1);
      setSelectedChoice(null);
      setShowOutcome(false);
      setShowFeedback(false);
      setShowAMResponse(false);
    }
  };

  const handlePrevDilemma = () => {
    if (currentDilemma > 0) {
      setCurrentDilemma(currentDilemma - 1);
      setSelectedChoice(null);
      setShowOutcome(false);
      setShowFeedback(false);
      setShowAMResponse(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const dilemma = dilemmas[currentDilemma];

  return (
    <div className="ethical-dilemmas">
      <h2>Ethical Dilemmas</h2>
      <p className="dilemmas-intro">
        Face the following ethical dilemmas and make choices that align with your values.
        Your decisions will affect your spiritual barometer, just as in the game.
      </p>

      <div className="dilemma-stats">
        <div className="dilemma-progress">
          <div className="progress-label">Progress:</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentDilemma + (selectedChoice !== null ? 1 : 0)) / dilemmas.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="cumulative-alignment">
          <div className="alignment-label">Cumulative Alignment:</div>
          <div className={`alignment-value ${cumulativeAlignment > 0 ? 'positive' : cumulativeAlignment < 0 ? 'negative' : 'neutral'}`}>
            {cumulativeAlignment > 0 ? '+' : ''}{cumulativeAlignment}
          </div>
        </div>
        <button className="history-toggle" onClick={toggleHistory}>
          {showHistory ? 'Hide Decision History' : 'Show Decision History'}
        </button>
      </div>

      {showHistory && (
        <div className="decision-history">
          <h3>Your Decision History</h3>
          {decisionHistory.length === 0 ? (
            <p>You haven't made any decisions yet.</p>
          ) : (
            <ul>
              {decisionHistory.map((decision, index) => (
                <li key={index}>
                  <strong>{dilemmas[decision.dilemma].title}:</strong> {dilemmas[decision.dilemma].choices[decision.choice].text}
                  <span className={dilemmas[decision.dilemma].choices[decision.choice].alignment > 0 ? 'positive' : 'negative'}>
                    {dilemmas[decision.dilemma].choices[decision.choice].alignment > 0 ? ' (+' : ' ('}
                    {dilemmas[decision.dilemma].choices[decision.choice].alignment})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="dilemma-card">
        <h3>{dilemma.title}</h3>
        <p className="dilemma-scenario">{dilemma.scenario}</p>

        <div className="dilemma-choices">
          {dilemma.choices.map((choice, index) => (
            <button
              key={index}
              className={`dilemma-choice ${selectedChoice === index ? 'selected' : ''} ${animateChoice === index ? 'animate-pulse' : ''}`}
              onClick={() => handleChoiceSelect(index)}
              disabled={showOutcome}
            >
              {choice.text}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`feedback-message ${feedbackType}`}>
            {feedbackMessage}
          </div>
        )}

        {showAMResponse && (
          <div className="am-response">
            <div className="am-response-header">AM:</div>
            <div className="am-response-text">{amResponse}</div>
          </div>
        )}

        {showOutcome && selectedChoice !== null && (
          <div className={`dilemma-outcome ${animateOutcome ? 'fade-in' : ''}`}>
            <h4>Outcome</h4>
            <p>{dilemma.choices[selectedChoice].outcome}</p>
            <div className="alignment-change">
              Alignment change: 
              <span className={dilemma.choices[selectedChoice].alignment > 0 ? 'positive' : 'negative'}>
                {dilemma.choices[selectedChoice].alignment > 0 ? '+' : ''}
                {dilemma.choices[selectedChoice].alignment}
              </span>
            </div>
          </div>
        )}

        <div className="dilemma-navigation">
          <button 
            onClick={handlePrevDilemma} 
            disabled={currentDilemma === 0}
            className="dilemma-nav-button"
          >
            Previous Dilemma
          </button>
          <div className="dilemma-counter">
            {currentDilemma + 1} of {dilemmas.length}
          </div>
          <button 
            onClick={handleNextDilemma} 
            disabled={currentDilemma === dilemmas.length - 1}
            className="dilemma-nav-button"
          >
            Next Dilemma
          </button>
        </div>
      </div>
    </div>
  );
};

export default EthicalDilemmas;
