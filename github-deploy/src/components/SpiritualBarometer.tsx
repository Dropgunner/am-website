import { FC } from 'react';

interface SpiritualBarometerProps {
  value: number;
}

const SpiritualBarometer: FC<SpiritualBarometerProps> = ({ value }) => {
  // Determine color based on value
  const getColor = () => {
    if (value < 30) return 'var(--color-primary)'; // AM red
    if (value > 70) return 'var(--color-secondary)'; // Aligned blue
    return 'var(--color-accent)'; // Warning/neutral yellow
  };

  // Determine label based on value
  const getLabel = () => {
    if (value < 30) return 'Misaligned';
    if (value < 50) return 'Partially Aligned';
    if (value < 70) return 'Mostly Aligned';
    return 'Fully Aligned';
  };

  return (
    <div className="spiritual-barometer" aria-label={`Spiritual barometer: ${value}% aligned`}>
      <div className="barometer-label">Alignment</div>
      <div className="barometer-container">
        <div 
          className="barometer-fill" 
          style={{ 
            width: `${value}%`, 
            backgroundColor: getColor() 
          }}
        />
      </div>
      <div className="barometer-value">{getLabel()} ({value}%)</div>
    </div>
  );
};

export default SpiritualBarometer;
