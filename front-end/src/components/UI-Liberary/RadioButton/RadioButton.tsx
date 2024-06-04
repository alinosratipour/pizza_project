import React from 'react';
import './RadioButtons.scss';


interface Option {
    id: string | number;
    label: string;
    [key: string]: any; // To allow additional properties
  }
  
  interface RadioButtonsProps {
    options: Option[];
    name: string;
    onChange: (selectedOption: Option) => void;
    selectedOptionId?: string | number;
    customClassName?: string;
  }
  
const RadioButtons: React.FC<RadioButtonsProps> = ({
  options,
  name,
  onChange,
  selectedOptionId,
  customClassName,
}) => {
  const handleOptionChange = (option: Option) => {
    onChange(option);
  };

  return (
    <div className={`Radio-Container ${customClassName || ''}`}>
      {options.map((option) => (
        <label key={option.id} className="Radio-Label">
          <input
            type="radio"
            name={name}
            value={option.id}
            onChange={() => handleOptionChange(option)}
            checked={option.id === selectedOptionId}
            className="Radio-Custom"
          />
          <span className="Radio-LabelText">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
